import { defineConfig } from 'vite';
import path from 'path';
import fs from 'fs-extra';
import { rollup } from 'rollup';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main.js'),
      name: 'MyLibrary',
      fileName: 'main',
      formats: ['es'],
      minify: true,
    },
    rollupOptions: {
      external: [],
      output: {
        entryFileNames: 'src/main.js',
        globals: {},
      },
      plugins: [resolve(), commonjs(), terser()],
    },
    outDir: 'dist', // Specify the output directory
  },
  plugins: [
    {
      name: 'bundle-imports',
      writeBundle: async () => {
        const importsPath = path.resolve(__dirname, 'dist/imports.js');

        // Check if imports.js exists and delete it before writing the new one
        if (fs.existsSync(importsPath)) {
          await fs.remove(importsPath);
        }

        const inputOptions = {
          input: path.resolve(__dirname, 'src/imports.js'),
          plugins: [resolve(), commonjs(), terser()],
        };
        const outputOptions = {
          format: 'es',
          file: importsPath,
        };

        const bundle = await rollup(inputOptions);
        await bundle.write(outputOptions);
        await bundle.close();
      },
    },
    {
      name: 'copy-files',
      closeBundle: async () => {
        const docsSourceDir = path.resolve(__dirname, 'src');
        const docsDestDir = path.resolve(__dirname, 'dist');
        const headersFileSource = path.resolve(__dirname, '_headers');
        const headersFileDest = path.resolve(__dirname, 'dist/_headers');

        if (fs.existsSync(docsSourceDir)) {
          await fs.copy(docsSourceDir, docsDestDir, { overwrite: false });
          console.log('Src folder copied to dist');
        } else {
          console.warn(
            'no src folder found. Please copy the src folder to the dist folder.'
          );
        }

        if (fs.existsSync(headersFileSource)) {
          await fs.copy(headersFileSource, headersFileDest, {
            overwrite: false,
          });
          console.log('Headers file copied to dist');
        } else {
          console.warn(
            'no headers file found. Please copy the headers file to the dist folder.'
          );
        }
      },
    },
  ],
});
