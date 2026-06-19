import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

const manualChunks = (id: string) => {
  if (!id.includes('node_modules')) return undefined;
  if (id.includes('/@mui/') || id.includes('/@emotion/')) return 'mui';
  if (id.includes('/@tanstack/react-query/') || id.includes('/axios/')) return 'query';
  if (id.includes('/react-hook-form/') || id.includes('/react-toastify/')) return 'forms';
  if (id.includes('/react/') || id.includes('/react-dom/') || id.includes('/react-router-dom/')) return 'react';
  return 'vendor';
};

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: { manualChunks },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
});
