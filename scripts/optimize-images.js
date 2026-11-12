import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputDir = './raw-images';
const outputDir = './src/assets/images';
const widths = [400, 800];

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

fs.readdirSync(inputDir).forEach((file) => {
  const ext = path.extname(file).toLowerCase();
  if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) return;

  const name = path.basename(file, ext);
  const inputPath = path.join(inputDir, file);

  widths.forEach((width) => {
    sharp(inputPath)
      .resize(width)
      .avif({ quality: 65 })
      .toFile(`${outputDir}/${name}-${width}.avif`);
    sharp(inputPath)
      .resize(width)
      .webp({ quality: 80 })
      .toFile(`${outputDir}/${name}-${width}.webp`);
    sharp(inputPath)
      .resize(width)
      .jpeg({ quality: 82 })
      .toFile(`${outputDir}/${name}-${width}.jpg`);
  });
});
