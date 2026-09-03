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
    'function eM(e,t){var r=ey;',
    'function eM(e,t){console.error("[embedded-rsc-source-error] "+encodeURIComponent(null!=t&&"string"==typeof t.message?t.message.slice(0,2e3):"non-error throw"));var r=ey;'
  ],
  [
    'finally{ey=r}if(null!=n&&',
    'finally{ey=r}(globalThis.__wheelmatesRscErrors||(globalThis.__wheelmatesRscErrors=[])).push([n,null!=t&&"string"==typeof t.message?encodeURIComponent(t.message.slice(0,2e3)):"non-error%20throw"]);if(null!=n&&'
  ],
  [
    'let a=to(r);a.digest||',
    'let a=to(r);console.error("[next-prerender-td-error] "+encodeURIComponent(a.message.slice(0,2e3)));a.digest||'
  ],
  [
    'let l=to(i);if(l.digest||',
    'let l=to(i);console.error("[next-prerender-tf-error] "+encodeURIComponent(l.message.slice(0,2e3)));if(l.digest||'
  ],
  [
    'let d=to(s);if(d.digest?',
    'let d=to(s);console.error("[next-prerender-th-error] "+encodeURIComponent(d.message.slice(0,2e3)));if(d.digest?'
  ],
  [
    'e&&tt(d),!(t&&',
    'console.error("[rsc-error-catalog] "+JSON.stringify(globalThis.__wheelmatesRscErrors||[])),console.error("[next-prerender-recovered-error] "+encodeURIComponent(null!=s&&"string"==typeof s.message?s.message.slice(0,2e3):"non-error throw")),e&&tt(d),!(t&&'
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

const turboTarget = path.join(
  process.cwd(),
  'node_modules',
  'next',
  'dist',
  'compiled',
  'next-server',
  'app-page-turbo.runtime.prod.js'
);
const turboSource = fs.readFileSync(turboTarget, 'utf8');
const turboNeedle = 'function eM(e,t){var r=ey;';
const turboReplacement = 'function eM(e,t){console.error("[turbo-rsc-source-error] "+encodeURIComponent(null!=t&&"string"==typeof t.message?t.message.slice(0,2e3):"non-error throw"));var r=ey;';
if (!turboSource.includes(turboReplacement)) {
  if (!turboSource.includes(turboNeedle)) {
    throw new Error('Unable to find turbo RSC diagnostic target.');
  }
  fs.writeFileSync(turboTarget, turboSource.replace(turboNeedle, turboReplacement), 'utf8');
}

for (const experimentalRuntime of [
  'app-page-experimental.runtime.prod.js',
  'app-page-turbo-experimental.runtime.prod.js'
]) {
  const experimentalTarget = path.join(
    process.cwd(),
    'node_modules',
    'next',
    'dist',
    'compiled',
    'next-server',
    experimentalRuntime
  );
  const experimentalSource = fs.readFileSync(experimentalTarget, 'utf8');
  const experimentalNeedle = 'function eW(e,t){var r=ex;';
  const experimentalReplacement = 'function eW(e,t){console.error("[experimental-rsc-source-error] "+encodeURIComponent(null!=t&&"string"==typeof t.message?t.message.slice(0,2e3):"non-error throw"));var r=ex;';
  if (!experimentalSource.includes(experimentalReplacement)) {
    if (!experimentalSource.includes(experimentalNeedle)) {
      throw new Error(`Unable to find experimental RSC diagnostic target in ${experimentalRuntime}.`);
    }
    fs.writeFileSync(
      experimentalTarget,
      experimentalSource.replace(experimentalNeedle, experimentalReplacement),
      'utf8'
    );
  }
}

for (const reactPackage of [
  'react-server-dom-webpack',
  'react-server-dom-turbopack'
]) {
  const reactDirectory = path.join(
    process.cwd(),
    'node_modules',
    'next',
    'dist',
    'compiled',
    reactPackage,
    'cjs'
  );
  const reactServerFiles = fs.readdirSync(reactDirectory).filter((file) =>
    /^react-server-dom-(?:webpack|turbopack)-server\.(?:browser|edge|node(?:\.unbundled)?)\.production\.js$/.test(file)
  );

  for (const reactServerFile of reactServerFiles) {
    const reactTarget = path.join(reactDirectory, reactServerFile);
    const reactSource = fs.readFileSync(reactTarget, 'utf8');
    const needle = 'function logRecoverableError(request, error) {';
    const replacement = `${needle}\n  console.error('[react-rsc-source-error] ' + encodeURIComponent(error && typeof error.message === 'string' ? error.message.slice(0, 2000) : 'non-error throw'));`;
    if (!reactSource.includes(replacement)) {
      if (!reactSource.includes(needle)) {
        throw new Error(`Unable to find React server diagnostic target in ${reactServerFile}.`);
      }
      fs.writeFileSync(reactTarget, reactSource.replace(needle, replacement), 'utf8');
    }
  }
}

