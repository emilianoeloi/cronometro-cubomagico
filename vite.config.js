import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // classic runtime: components already `import React` and rely on React.createElement (React 15, no new JSX transform)
  plugins: [react({ jsxRuntime: 'classic' })],
  build: {
    outDir: 'build',
  },
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['src/__tests__/**/*-test.jsx'],
  },
});
