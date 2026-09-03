import fs from 'node:fs';
import path from 'node:path';

const target = path.join(
  process.cwd(),
  'node_modules',
  'next',
  'dist',
  'server',
  'app-render',
  'create-error-handler.js'
);
const marker = "console.error('[next-prerender-original-error]', err);";
const declaration = 'const err = (0, _iserror.getProperError)(thrownValue);';
const source = fs.readFileSync(target, 'utf8');

if (!source.includes(marker)) {
  const patched = source.replaceAll(declaration, `${declaration}\n        ${marker}`);
  if (patched === source) {
    throw new Error('Unable to install the temporary Next.js prerender diagnostic.');
  }
  fs.writeFileSync(target, patched, 'utf8');
}
