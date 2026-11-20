import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({ base: '/brainroot-2.0/', plugins: [react()] });
