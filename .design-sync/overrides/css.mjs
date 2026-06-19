// Override: lift external @import url(https://…) rules from _ds_bundle.css into
// styles.css so Google Fonts (and any other remote CSS) loads from the top-level
// entry file rather than a nested import. The package-shape build never populates
// remoteStyleImports (that path is storybook-only), so without this the remote
// @import stays buried in _ds_bundle.css — some render environments follow the
// chain fine, others (strict CSP) block it. Lifting it to styles.css is both
// more robust and correct per the DS contract (styles.css is the entry point).
//
// Also strips the lifted @imports from _ds_bundle.css to avoid duplicates.
// Everything else (extractFonts, copyTokens, rewriteBundleFontFaces) is unchanged.

import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, realpathSync, writeFileSync } from 'node:fs';
import { basename, dirname, isAbsolute, join, relative, resolve } from 'node:path';

// inline ls (readdirSync + sort) — avoids importing common.mjs whose path is unknown here
const ls = (d, o) => readdirSync(d, o).sort((a, b) => (a.name ?? a).localeCompare(b.name ?? b));

export function extractFonts(cssPath, srcDir, { fontsOut, roots }) {
  const realOf = (p) => { try { return realpathSync(p); } catch { return null; } };
  const rootsReal = (Array.isArray(roots) ? roots : [roots]).map((r) => realOf(resolve(r)) ?? resolve(r));
  const insideRoots = (p) => rootsReal.some((root) => {
    const rel = relative(root, p);
    return rel !== '' && !rel.startsWith('..') && !isAbsolute(rel);
  });
  if (!existsSync(cssPath)) return [];
  const css = readFileSync(cssPath, 'utf8');
  const rules = [];
  for (const m of css.matchAll(/@font-face\s*\{([^}]+)\}/g)) {
    const body = m[1];
    const fam = body.match(/font-family\s*:\s*['"]?([^;'"\n]+)['"]?/)?.[1]?.trim();
    const urls = [...body.matchAll(/url\(\s*['"]?([^'")]+?\.(?:woff2?|ttf|otf))['"]?\s*\)/gi)].map((u) => u[1]);
    if (!fam || !urls.length) continue;
    let rewritten = body;
    for (const u of urls) {
      if (/^(https?:|data:)/.test(u)) continue;
      const src = resolve(srcDir, u.replace(/^\.\//, ''));
      const real = realOf(src);
      if (!real || !insideRoots(real)) continue;
      const name = basename(src);
      mkdirSync(fontsOut, { recursive: true });
      cpSync(real, join(fontsOut, name));
      rewritten = rewritten.split(u).join(`./${name}`);
    }
    rules.push(`@font-face{${rewritten}}`);
  }
  return rules;
}

export function copyTokens({ tokensPkg, tokensGlob, nodeModules, out }) {
  const tokenFiles = [];
  if (!tokensPkg) return tokenFiles;
  const tdir = join(nodeModules, tokensPkg);
  const tjson = JSON.parse(readFileSync(join(tdir, 'package.json'), 'utf8'));
  if (tokensGlob) {
    const parts = tokensGlob.split('/');
    const pat = parts.pop();
    const rx = new RegExp('^' + pat.replace(/\./g, '\\.').replace(/\*/g, '.*') + '$');
    const deep = parts.includes('**');
    const base = join(tdir, ...parts.filter((p) => p !== '**'));
    (function collect(d, rel = '') {
      if (!existsSync(d)) return;
      for (const e of ls(d, { withFileTypes: true })) {
        const r = rel ? `${rel}/${e.name}` : e.name;
        if (e.isDirectory() && deep) collect(join(d, e.name), r);
        else if (e.isFile() && rx.test(e.name)) {
          mkdirSync(dirname(join(out, 'tokens', r)), { recursive: true });
          cpSync(join(d, e.name), join(out, 'tokens', r));
          tokenFiles.push(r);
        }
      }
    })(base);
  } else {
    for (const sub of ['dist/css', 'css', 'dist', '.']) {
      const d = join(tdir, sub);
      if (!existsSync(d)) continue;
      for (const f of ls(d)) {
        if (f.endsWith('.css')) {
          cpSync(join(d, f), join(out, 'tokens', f));
          tokenFiles.push(f);
        }
      }
      if (tokenFiles.length) break;
    }
  }
  console.error(`  tokens: ${tokenFiles.length} files from ${tokensPkg}@${tjson.version}`);
  return tokenFiles;
}

export function rewriteBundleFontFaces({ out, bundleCss }) {
  const p = bundleCss ?? join(out, '_ds_bundle.css');
  let css;
  try { css = readFileSync(p, 'utf8'); } catch { return; }
  if (!/@font-face/i.test(css)) return;
  let dropped = 0, rewrote = 0;
  const next = css.replace(/@font-face\s*\{[^}]*\}/gi, (block) => {
    let b = block;
    for (const m of block.matchAll(/url\(\s*['"]?([^'")]+)['"]?\s*\)/gi)) {
      const u = m[1];
      if (/^(?:https?:|data:|\.\/fonts\/)/.test(u)) continue;
      const name = basename(u.split(/[?#]/)[0]);
      if (existsSync(join(out, 'fonts', name))) { b = b.split(u).join(`./fonts/${name}`); rewrote++; }
    }
    if (/url\(\s*['"]?(?!https?:|data:|\.\/fonts\/)/i.test(b)) { dropped++; return '/* @ds-font-face-dropped: unresolvable src */'; }
    return b;
  });
  if (rewrote || dropped) {
    writeFileSync(p, next);
    console.error(`  _ds_bundle.css fonts: ${rewrote} url(s) rewritten to fonts/${dropped ? `, ${dropped} dead @font-face block(s) dropped` : ''}`);
  }
}

export function writeStylesCss({ out, tokenFiles, bundleCss, fontRules, remoteImports }) {
  const bundlePath = bundleCss ?? join(out, '_ds_bundle.css');
  let hasBundleCss = false;
  // Lift external @import url(…) lines from _ds_bundle.css into styles.css.
  // Strips them from the bundle to avoid duplicate loads.
  const liftedRemotes = [];
  try {
    let css = readFileSync(bundlePath, 'utf8');
    hasBundleCss = css.trim().length > 0 && !css.startsWith('/* @ds-css-runtime');
    // Match both @import"url" and @import url("url") with https:// or //
    const remoteRx = /@import\s*(?:url\(\s*)?['"]?((?:https?:)?\/\/[^'"\s)]+)['"]?\s*\)?;?\n?/g;
    const stripped = css.replace(remoteRx, (_, url) => {
      const norm = url.startsWith('//') ? `https:${url}` : url;
      if (!liftedRemotes.includes(norm)) liftedRemotes.push(norm);
      return '';
    });
    if (liftedRemotes.length) {
      writeFileSync(bundlePath, stripped);
      console.error(`  _ds_bundle.css: lifted ${liftedRemotes.length} remote @import(s) to styles.css`);
    }
  } catch { /* absent */ }

  const allRemotes = [...liftedRemotes, ...(remoteImports ?? []).filter((u) => !liftedRemotes.includes(u))];
  const styleImports = [
    ...tokenFiles.map((f) => `@import "./tokens/${f}";`),
    ...(fontRules.length ? ['@import "./fonts/fonts.css";'] : []),
    ...allRemotes.map((u) => `@import url("${u}");`),
    ...(hasBundleCss ? ['@import "./_ds_bundle.css";'] : []),
  ];
  if (styleImports.length) {
    writeFileSync(join(out, 'styles.css'), styleImports.join('\n') + '\n');
    console.error(`  styles.css: ${styleImports.length} @import(s)${hasBundleCss ? ' (incl. _ds_bundle.css — component styles ship to designs via this closure)' : ''}`);
    return;
  }
  writeFileSync(
    join(out, 'styles.css'),
    '/* @ds-styles: runtime — this design system injects its styles at runtime (CSS-in-JS); no static stylesheet to import. */\n',
  );
  console.error('[CSS_RUNTIME] no static CSS found (tokens/component/fonts/remote all empty) — wrote a self-styling styles.css. Expected for CSS-in-JS DSes; if this DS does ship a stylesheet, set cfg.cssEntry to it. If cfg.cssEntry is ALREADY set and renders verify, this line refers only to the scrape — do not chase it.');
}
