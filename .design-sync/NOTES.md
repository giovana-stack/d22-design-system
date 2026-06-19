# D22 Design System — Sync Notes

## Repo quirks

- **ES module output is `dist/index.js`**, not `dist/index.es.js` as `package.json` `module`/`exports` declares. The converter is pointed at `./dist/index.js` via `cfg.entry`. The `package.json` exports are wrong but harmless for sync purposes.
- **`typesDir` is not a valid config key** — removed. Types come from `./dist/index.d.ts` automatically.
- **Google Fonts** (Montserrat + Plus Jakarta Sans) load via a remote `@import` in `styles.css`. Set `cfg.runtimeFontPrefixes` to suppress `[FONT_MISSING]`. Previews require network to render with brand fonts.
- **Toggle** is a fully controlled component (`checked` + `onChange` are required). Preview uses static `checked={true/false}` + no-op `onChange={() => {}}`.
- **Button `Sizes` story** hits `[GRID_OVERFLOW]` (3 sizes side-by-side are wider than grid cells). Fixed with `cfg.overrides.Button: {"cardMode": "column"}` — each export gets full card width.
- **No docs dir** — all `.prompt.md` are synthesized from `.d.ts` props + authored previews.

## Known render warns

_(none — all previews graded clean)_

## Re-sync risks

- **Google Fonts**: if `styles.css` ever switches away from the remote `@import`, remove `runtimeFontPrefixes` and resolve the font files locally via `cfg.extraFonts`.
- **`dist/index.js` filename**: if the Vite config changes `fileName` or `formats`, the entry path may change. Re-check `dist/` after any build tooling update.
- **Authored previews** are in `.design-sync/previews/` — they're committed and re-used on every re-sync. Review them if component APIs change (Toggle's required `checked`/`onChange`, Button's lack of `style` prop, etc.).
- **`package.json` exports field** declares `./dist/index.es.js` which doesn't exist. Non-blocking for sync but will break consumers who use package `exports` resolution. Worth fixing in the source repo.
