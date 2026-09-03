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
  ['let d=to(s);if(d.digest?', 'let d=to(s);console.error("[next-prerender-original-error]",d);if(d.digest?'],
  ['e&&tt(d),!(t&&', 'console.error("[next-prerender-recovered-error]",s),e&&tt(d),!(t&&']
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

for (const reactPackage of [
  'react-server-dom-webpack',
  'react-server-dom-webpack-experimental'
]) {
  const cjsDirectory = path.join(
    process.cwd(),
    'node_modules',
    'next',
    'dist',
    'compiled',
    reactPackage,
    'cjs'
  );
  const reactServerFiles = fs.readdirSync(cjsDirectory).filter((file) =>
    /^react-server-dom-webpack-server\..*production\.js$/.test(file)
  );

  for (const reactServerFile of reactServerFiles) {
    const reactTarget = path.join(cjsDirectory, reactServerFile);
    const reactSource = fs.readFileSync(reactTarget, 'utf8');
    const needle = 'var errorDigest = requestStorage.run(void 0, request.onError, error);';
    const diagnostic = "errorDigest = '[react-server-source]' + (error && error.stack ? error.stack : error && error.message ? error.message : String(error));";
    if (!reactSource.includes(diagnostic) && reactSource.includes(needle)) {
      fs.writeFileSync(reactTarget, reactSource.replace(needle, `${needle}\n    ${diagnostic}`), 'utf8');
    }
  }
}
