import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import mdx from '@mdx-js/rollup';
import RemarkGfm from 'remark-gfm';

export default defineConfig({
  plugins: [
    {
      ...mdx({
        providerImportSource: '@mdx-js/react',
        remarkPlugins: [RemarkGfm]
      })
    },
    react()
  ],
  resolve: {
    alias: {
      '@docs': '/docs'
    }
  },
  optimizeDeps: {
    include: [
      '@mdx-js/react',
      'typewriter-effect'
    ]
  },
  server: {
    port: 3000
  },
});
