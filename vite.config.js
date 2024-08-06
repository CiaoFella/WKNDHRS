import { defineConfig } from 'vite';
import path from 'path';
import fs from 'fs';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// Helper function to get all .js files from a directory
function getPageEntries(dir) {
  const entries = {};
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isFile() && file.endsWith('.js')) {
      const nameWithoutExtension = file.slice(0, -3); // Remove .js extension
      entries[`pages/${nameWithoutExtension}`] = fullPath;
    }
  });
  return entries;
}

const pagesDir = path.resolve(__dirname, 'src/pages');
const pageEntries = getPageEntries(pagesDir);

export default defineConfig({
  base: '/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'src/main.js'),
        barba: path.resolve(__dirname, 'src/barba.js'),
        ...pageEntries, // Dynamically include all pages
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'; // This will create a separate vendor.js for all node_modules
          }
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
          dest: '.',
        },
      ],
    }),
  ],
});
