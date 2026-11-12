import vituum from 'vituum';
import pug from '@vituum/vite-plugin-pug';
import path from 'path';
import fs from 'fs';

export default {
  base: '/landing-keepsake-vite/',
  plugins: [
    vituum({
      imports: {
        filenamePattern: {
          '+.css': [],
          '+.scss': [],
        },
      },
    }),
    pug({ root: './src' }),
    {
      name: 'github-pages-assets',
      closeBundle() {
        const distDir = path.resolve(import.meta.dirname, 'dist');
        const oldHtml = path.join(distDir, 'index.pug.html');
        const newHtml = path.join(distDir, 'index.html');
        if (fs.existsSync(oldHtml)) {
          fs.renameSync(oldHtml, newHtml);
        }

        const srcImages = path.resolve(import.meta.dirname, 'src/assets/images');
        const destImages = path.join(distDir, 'assets/images');
        if (fs.existsSync(srcImages)) {
          fs.cpSync(srcImages, destImages, { recursive: true });
        }
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
      '@assets': path.resolve(import.meta.dirname, 'src/assets'),
    },
  },
};
