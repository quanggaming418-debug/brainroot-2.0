// BR-T041 — cấu hình lint tối thiểu, chỉ bắt lỗi thật (không ép phong cách, không refactor hàng loạt).
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

export default tseslint.config(
  { ignores: ['dist/**', 'dist-full/**', 'node_modules/**', 'reference/**', 'tools/**', 'brainroot-assets*/**', 'internal-data/**', 'scripts/capture.ts'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: { globals: { ...globals.browser } },
    plugins: { 'react-hooks': reactHooks },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  { files: ['**/*.{js,mjs,cjs}', 'scripts/**', 'vite.config.ts'], languageOptions: { globals: { ...globals.node } } },
  { files: ['tests/**'], languageOptions: { globals: { ...globals.node } } },
);
