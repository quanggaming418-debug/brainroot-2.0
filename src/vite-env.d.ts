/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Bật Ô ăn quan xanh V2 trong production ('true'). Mặc định tắt; ở dev mặc định bật. */
  readonly VITE_ENABLE_OQV2?: string;
  /** BR-T042: 'off' (mặc định) | 'demo' | 'full'. FULL cần OQV2_PUBLICATION_APPROVAL (biến build, không có tiền tố VITE_). */
  readonly VITE_OQV2_MODE?: string;
}

declare module 'virtual:oqv2-deck' {
  import type { InternalDeckFile } from './features/oanquan-v2/content/internalDeck';
  const value: { readonly mode: 'off' | 'demo' | 'full' | 'dev'; readonly deck: InternalDeckFile | null };
  export default value;
}
