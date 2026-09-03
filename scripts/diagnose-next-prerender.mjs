import fs from 'node:fs';
import path from 'node:path';

const target = path.join(
  process.cwd(),
  'node_modules',
  'next',
  'dist',
  'compiled',
  'next-server',
  'app-page.runtime.prod.js'
);
const source = fs.readFileSync(target, 'utf8');
const patches = [
  ['let a=to(r);a.digest||', 'let a=to(r);console.error("[next-prerender-original-error]",a);a.digest||'],
  ['let l=to(i);if(l.digest||', 'let l=to(i);console.error("[next-prerender-original-error]",l);if(l.digest||'],
  ['let d=to(s);if(d.digest?', 'let d=to(s);console.error("[next-prerender-original-error]",d);if(d.digest?']
];

let patched = source;
for (const [needle, replacement] of patches) {
  if (!patched.includes(replacement)) {
    if (!patched.includes(needle)) {
      throw new Error(`Unable to find Next.js diagnostic target: ${needle}`);
    }
    patched = patched.replace(needle, replacement);
  }
}

if (patched !== source) fs.writeFileSync(target, patched, 'utf8');

for (const reactServerFile of [
  'react-server-dom-webpack-server.node.production.js',
  'react-server-dom-webpack-server.node.unbundled.production.js'
]) {
  const reactTarget = path.join(
    process.cwd(),
    'node_modules',
    'next',
    'dist',
    'compiled',
    'react-server-dom-webpack',
    'cjs',
    reactServerFile
  );
  const reactSource = fs.readFileSync(reactTarget, 'utf8');
  const needle = 'function logRecoverableError(request, error) {';
  const replacement = `${needle}\n  console.error('[react-server-original-error]', error);`;
  if (!reactSource.includes(replacement)) {
    if (!reactSource.includes(needle)) {
      throw new Error(`Unable to find React server diagnostic target in ${reactServerFile}.`);
    }
    fs.writeFileSync(reactTarget, reactSource.replace(needle, replacement), 'utf8');
  }
}
