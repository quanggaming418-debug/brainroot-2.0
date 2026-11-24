/**
 * Cờ Ô ăn quan xanh V2 (ADR-0006). Bật ở `npm run dev`, hoặc khi build với VITE_ENABLE_OQV2=true.
 * Khi tắt, Vite thay hằng số lúc build và Rollup loại bỏ cả chunk V2 (mã, asset, thẻ) khỏi dist/.
 * `VITE_ENABLE_OQV2=false` tắt cả ở dev để kiểm tra cấu hình tắt.
 * Thẻ nội bộ chỉ nạp khi `import.meta.env.DEV` (xem features/oanquan-v2/content/activeDeck.ts), không phụ thuộc cờ này.
 */
export const OQV2_ENABLED: boolean =
  import.meta.env.VITE_ENABLE_OQV2 === 'true' ||
  (import.meta.env.DEV && import.meta.env.VITE_ENABLE_OQV2 !== 'false');
