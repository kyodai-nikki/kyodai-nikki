import sharp from 'sharp';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
const dir = 'public/images/home';
const files = readdirSync(dir).filter(f => /\.(png|jpe?g|webp|svg)$/i.test(f));
const results = [];
for (const f of files) {
  const m = await sharp(join(dir, f)).metadata();
  results.push({ file: f, width: m.width, height: m.height });
}
console.log(JSON.stringify(results, null, 2));
const max = Math.max(...results.map(r => r.height || 0));
console.log('max height:', max);
console.log('80% of max:', Math.round(max * 0.8));
