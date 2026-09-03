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
    'return n||""}function e$(e,t){',
    'return null!=t&&"string"==typeof t.message?"[rsc-original] "+t.message:n||""}function e$(e,t){'
  ],
  [
    'e&&tt(d),!(t&&',
    'console.error("[next-prerender-recovered-error] "+(null!=s&&"string"==typeof s.message?s.message:"non-error throw")),e&&tt(d),!(t&&'
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

