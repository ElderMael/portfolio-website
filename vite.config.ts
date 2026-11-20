import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'build',
    emptyOutDir: true,
    target: 'es2020',
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    include: ['src/**/*.test.{ts,tsx}'],
    passWithNoTests: false,
  },
});