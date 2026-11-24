/**
 * BR-T042 — Chế độ phát hành Ô ăn quan xanh V2: OFF | DEMO | FULL (+ DEV khi `npm run dev`).
 * Logic thuần, dùng bởi vite.config.ts và có unit test (tests/oanquan-v2-release-mode.test.ts).
 *
 * LƯU Ý BẢO MẬT: ở chế độ FULL, 100 thẻ + đáp án được đóng gói vào mã gửi tới trình duyệt. Người dùng
 * có thể xem/lấy chúng (DevTools, tải bundle). Cờ tính năng, minify hay đổi tên chunk KHÔNG phải biện pháp
 * bảo mật; FULL chỉ dành cho nội dung đã được phép công bố.
 */
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { validateDeckFile, type InternalDeckFile } from '../src/features/oanquan-v2/content/internalDeck.ts';

export type Oqv2Mode = 'off' | 'demo' | 'full' | 'dev';

export interface Oqv2Env {
  readonly VITE_OQV2_MODE?: string;
  /** Tương thích cũ: 'true' = DEMO, 'false' = OFF. */
  readonly VITE_ENABLE_OQV2?: string;
  /** Tham chiếu văn bản cho phép công bố (bắt buộc cho FULL). Không có tiền tố VITE_ nên không bị lộ vào mã. */
  readonly OQV2_PUBLICATION_APPROVAL?: string;
  readonly OQV2_DECK_FILE?: string;
}

export function resolveOqv2Mode(env: Oqv2Env, command: 'build' | 'serve'): Oqv2Mode {
  const raw = env.VITE_OQV2_MODE?.trim().toLowerCase();
  let explicit: 'off' | 'demo' | 'full' | null = null;
  if (raw) {
    if (raw !== 'off' && raw !== 'demo' && raw !== 'full') {
      throw new Error(`[oqv2] VITE_OQV2_MODE="${env.VITE_OQV2_MODE}" không hợp lệ. Chỉ nhận: off | demo | full.`);
    }
    explicit = raw;
  } else if (env.VITE_ENABLE_OQV2 === 'true') explicit = 'demo';
  else if (env.VITE_ENABLE_OQV2 === 'false') explicit = 'off';
  if (command === 'serve') return explicit === 'off' ? 'off' : explicit === 'demo' ? 'demo' : 'dev';
  return explicit ?? 'off';
}

export const DEFAULT_DECK_FILE = 'internal-data/cards.internal.json';

/** FULL: không âm thầm fallback. Thiếu quyền/dữ liệu/tệp lỗi → ném lỗi build rõ ràng. */
export function loadFullDeck(env: Oqv2Env, root: string): InternalDeckFile {
  const approval = env.OQV2_PUBLICATION_APPROVAL?.trim();
  if (!approval) {
    throw new Error(
      '[oqv2] Chế độ FULL bị từ chối: thiếu OQV2_PUBLICATION_APPROVAL. Chỉ được đặt khi Product Owner đã cho phép công bố 100 thẻ bằng văn bản ' +
      '(ghi mã/tham chiếu văn bản, ví dụ "PO-2026-12-01"). Không có quyền công bố thì dùng VITE_OQV2_MODE=demo hoặc off.',
    );
  }
  const file = resolve(root, env.OQV2_DECK_FILE?.trim() || DEFAULT_DECK_FILE);
  if (!existsSync(file)) {
    throw new Error(`[oqv2] Chế độ FULL: không tìm thấy bộ thẻ tại ${file}. Đặt OQV2_DECK_FILE tới tệp hợp lệ. Sẽ KHÔNG dùng thẻ DEMO thay thế.`);
  }
  let data: unknown;
  try {
    data = JSON.parse(readFileSync(file, 'utf8'));
  } catch (e) {
    throw new Error(`[oqv2] Chế độ FULL: ${file} không phải JSON hợp lệ (${(e as Error).message}).`, { cause: e });
  }
  const problems = validateDeckFile(data);
  if (problems.length) {
    throw new Error(`[oqv2] Chế độ FULL: bộ thẻ không hợp lệ (${problems.length} lỗi): ${problems.slice(0, 6).join('; ')}`);
  }
  return data as InternalDeckFile;
}

/** DEV: đọc bộ nội bộ nếu có (không bắt buộc); thiếu hoặc lỗi thì dùng thẻ DEMO. */
export function loadDevDeck(root: string): InternalDeckFile | null {
  const file = resolve(root, DEFAULT_DECK_FILE);
  if (!existsSync(file)) return null;
  try {
    const data = JSON.parse(readFileSync(file, 'utf8'));
    return validateDeckFile(data).length === 0 ? (data as InternalDeckFile) : null;
  } catch {
    return null;
  }
}
