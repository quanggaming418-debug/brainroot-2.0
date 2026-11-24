import { useSyncExternalStore } from 'react';

/**
 * Âm thanh gameplay nhẹ, tổng hợp 100% bằng Web Audio (không dùng file/âm thanh bên thứ ba,
 * không có vấn đề bản quyền). Mặc định bật; có nút bật/tắt, lưu lựa chọn trên máy này.
 * AudioContext chỉ được tạo sau thao tác của người chơi (chính sách trình duyệt).
 */
export type Sfx =
  | 'ui' | 'select' | 'pickup' | 'drop' | 'sowEnd' | 'capture' | 'harvest' | 'keep'
  | 'correct' | 'wrong' | 'turn' | 'win' | 'tick';

const KEY = 'oq2-sound';
let on = true;
try { on = window.localStorage.getItem(KEY) !== 'off'; } catch { /* không có localStorage */ }

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
const listeners = new Set<() => void>();
let dropStep = 0;

function ensure(): AudioContext | null {
  if (!on) return null;
  try {
    if (!ctx) {
      const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = 0.32;
      master.connect(ctx.destination);
    }
    if (ctx.state === 'suspended') void ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

interface Tone { f: number; t?: number; d: number; type?: OscillatorType; v?: number; slideTo?: number }

function tones(list: Tone[]) {
  const c = ensure();
  if (!c || !master) return;
  const now = c.currentTime;
  for (const n of list) {
    const o = c.createOscillator();
    const g = c.createGain();
    const t0 = now + (n.t ?? 0);
    o.type = n.type ?? 'sine';
    o.frequency.setValueAtTime(n.f, t0);
    if (n.slideTo) o.frequency.exponentialRampToValueAtTime(n.slideTo, t0 + n.d);
    const v = n.v ?? 0.5;
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(v, t0 + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + n.d);
    o.connect(g); g.connect(master);
    o.start(t0); o.stop(t0 + n.d + 0.05);
  }
}

// Âm giai điệu ngũ cung (pentatonic) cho dễ nghe, nhẹ nhàng
const P = [392, 440, 523.25, 587.33, 659.25, 783.99, 880];

export function play(name: Sfx) {
  if (!on) return;
  switch (name) {
    case 'ui': tones([{ f: 660, d: 0.07, v: 0.25, type: 'triangle' }]); break;
    case 'select': tones([{ f: 523.25, d: 0.1, v: 0.3, type: 'triangle' }, { f: 783.99, t: 0.06, d: 0.12, v: 0.25, type: 'triangle' }]); break;
    case 'pickup': tones([{ f: 330, slideTo: 520, d: 0.16, v: 0.35, type: 'triangle' }]); dropStep = 0; break;
    case 'drop': {
      const f = P[dropStep % P.length];
      dropStep += 1;
      tones([{ f, d: 0.11, v: 0.28, type: 'sine' }, { f: f * 2, d: 0.05, v: 0.08, type: 'sine' }]);
      break;
    }
    case 'sowEnd': tones([{ f: 294, d: 0.2, v: 0.3, type: 'sine' }, { f: 220, t: 0.1, d: 0.28, v: 0.25, type: 'sine' }]); break;
    case 'capture': tones([{ f: 392, d: 0.14, v: 0.3, type: 'triangle' }, { f: 523.25, t: 0.1, d: 0.14, v: 0.3, type: 'triangle' }, { f: 659.25, t: 0.2, d: 0.22, v: 0.3, type: 'triangle' }]); break;
    case 'harvest': tones([{ f: 659.25, d: 0.18, v: 0.3 }, { f: 783.99, t: 0.08, d: 0.18, v: 0.3 }, { f: 987.77, t: 0.16, d: 0.3, v: 0.3 }, { f: 1318.5, t: 0.24, d: 0.4, v: 0.18 }]); break;
    case 'keep': tones([{ f: 311, d: 0.22, v: 0.25, type: 'sine' }, { f: 262, t: 0.14, d: 0.32, v: 0.22, type: 'sine' }]); break;
    case 'correct': tones([{ f: 523.25, d: 0.14, v: 0.32 }, { f: 659.25, t: 0.1, d: 0.14, v: 0.32 }, { f: 783.99, t: 0.2, d: 0.3, v: 0.32 }]); break;
    case 'wrong': tones([{ f: 247, d: 0.2, v: 0.26, type: 'triangle' }, { f: 196, t: 0.14, d: 0.3, v: 0.24, type: 'triangle' }]); break;
    case 'turn': tones([{ f: 587.33, d: 0.1, v: 0.2, type: 'triangle' }, { f: 880, t: 0.08, d: 0.14, v: 0.18, type: 'triangle' }]); break;
    case 'win': tones([523.25, 659.25, 783.99, 1046.5, 783.99, 1046.5].map((f, i) => ({ f, t: i * 0.13, d: i === 5 ? 0.6 : 0.2, v: 0.3, type: 'triangle' as OscillatorType }))); break;
    case 'tick': tones([{ f: 880, d: 0.05, v: 0.15, type: 'square' }]); break;
  }
}

export function setSoundOn(v: boolean) {
  on = v;
  try { window.localStorage.setItem(KEY, v ? 'on' : 'off'); } catch { /* bỏ qua */ }
  listeners.forEach((l) => l());
  if (v) play('ui');
}

/** Trạng thái bật/tắt (React). */
export function useSound(): [boolean, (v: boolean) => void] {
  const v = useSyncExternalStore(
    (cb) => { listeners.add(cb); return () => { listeners.delete(cb); }; },
    () => on,
    () => true,
  );
  return [v, setSoundOn];
}

/** Nút bật/tắt dùng chung. */
export function soundLabel(v: boolean) { return v ? 'Âm thanh: bật' : 'Âm thanh: tắt'; }
