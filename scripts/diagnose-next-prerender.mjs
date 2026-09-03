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
  [
    'let a=to(r);a.digest||',
    'let a=to(r);console.error("[next-prerender-source-error] "+encodeURIComponent(a.message.slice(0,2e3)));a.digest||'
  ],
  [
    'let l=to(i);if(l.digest||',
    'let l=to(i);console.error("[next-prerender-source-error] "+encodeURIComponent(l.message.slice(0,2e3)));if(l.digest||'
  ],
  [
    'let d=to(s);if(d.digest?',
    'let d=to(s);console.error("[next-prerender-source-error] "+encodeURIComponent(d.message.slice(0,2e3)));if(d.digest?'
  ],
  [
    'e&&tt(d),!(t&&',
    'console.error("[next-prerender-recovered-error] "+encodeURIComponent(null!=s&&"string"==typeof s.message?s.message.slice(0,2e3):"non-error throw")),e&&tt(d),!(t&&'
  ]
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

