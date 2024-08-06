import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';
import path from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  base: '/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'src/main.js'),
        barba: path.resolve(__dirname, 'src/barba.js'),
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
        manualChunks(id) {
          if (id.includes(path.normalize('src/pages/'))) {
            const pageName = id.split('/').pop();
            return `pages/${pageName.replace(/\.js$/, '')}`;
          }
          if (id.includes(path.normalize('src/components/'))) {
            const componentName = id.split('/').pop();
            return `components/${componentName.replace(/\.js$/, '')}`;
          }
          return null;
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: '_headers',
          dest: '',
        },
      ],
    }),
  ],
});
