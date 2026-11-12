import vituum from 'vituum';
import pug from '@vituum/vite-plugin-pug';
import path from 'path';
import fs from 'fs';

export default {
  base: './',
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
      name: 'dev-index-redirect',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/' || req.url === '/index.html') {
            req.url = '/index.pug.html';
          }
          next();
        });
      },
      closeBundle() {
        const oldPath = path.resolve(import.meta.dirname, 'dist/index.pug.html');
        const newPath = path.resolve(import.meta.dirname, 'dist/index.html');
        if (fs.existsSync(oldPath)) {
          fs.renameSync(oldPath, newPath);
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
