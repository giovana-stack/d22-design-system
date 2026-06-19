# D22 Seguros — Design System Conventions

## Wrapping and setup

No provider or context wrapper is required. Components are pure CSS-class-based — import the stylesheet and render.

Wrap the root of any design in a `<div className="d22-root">` to activate the box-sizing reset:

```jsx
<div className="d22-root" style={{ fontFamily: 'var(--d22-font-body)' }}>
  {/* your design here */}
</div>
```

Fonts (Syne and Plus Jakarta Sans) load via Google Fonts — they require network access. Reference them only through the token variables (`--d22-font-display`, `--d22-font-body`), never as raw family strings.

## Styling idiom — `d22-*` CSS classes + `var(--d22-*)` tokens

This is a **BEM-like class system**. Every component ships its own classes; the design agent uses `var(--d22-*)` CSS custom properties for layout glue it authors itself. There are no Tailwind classes and no CSS-in-JS props — styling flows through `className` and CSS variables only.

**Token families** (all defined in `styles.css` → `_ds_bundle.css`):

| Family | Key tokens |
|---|---|
| Brand color | `--d22-navy-deep` `--d22-navy` `--d22-teal` `--d22-teal-mid` `--d22-teal-light` `--d22-gold` |
| Surface | `--d22-surface` `--d22-surface-2` `--d22-white` |
| Text | `--d22-text` `--d22-text-2` `--d22-text-muted` |
| Semantic | `--d22-ok` `--d22-ok-bg` `--d22-warn` `--d22-warn-bg` `--d22-err` `--d22-err-bg` `--d22-info` `--d22-info-bg` |
| Border | `--d22-border` `--d22-border-2` |
| Radius | `--d22-r-xs`(4px) `--d22-r-sm`(8px) `--d22-r-md`(12px) `--d22-r-lg`(16px) `--d22-r-xl`(20px) `--d22-r-pill`(9999px) |
| Shadow | `--d22-sh-sm` `--d22-sh-md` `--d22-sh-lg` |
| Typography | `--d22-font-display` (Syne) `--d22-font-body` (Plus Jakarta Sans) |

**Do not invent new `d22-*` class names** — none will match any CSS rule. Use tokens via inline styles or a `<style>` block for layout glue.

## Where the truth lives

- **All component styles and tokens**: `styles.css` (imports `_ds_bundle.css`) — read this before styling anything.
- **Per-component API**: each `components/general/<Name>/<Name>.prompt.md` — props, variants, and realistic usage examples.
- **Type contracts**: `components/general/<Name>/<Name>.d.ts` — the `<Name>Props` interface is the authoritative API.

## Idiomatic build snippet

```jsx
import { ProductCard, Button, Alert } from 'd22-design-system';

function PolicyDashboard() {
  return (
    <div className="d22-root" style={{
      padding: '24px',
      background: 'var(--d22-surface)',
      minHeight: '100vh',
      fontFamily: 'var(--d22-font-body)',
    }}>
      <Alert
        variant="warning"
        title="Vencimento em 3 dias"
        description="Renove sua apólice para manter a cobertura."
      />
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: '16px',
        marginTop: '20px',
      }}>
        <ProductCard
          category="vida"
          title="Seguro de Vida Premium"
          policyNumber="APL-2024-0892"
          status="ativo"
          premium="R$ 127,90"
          dueDate="15/08/2024"
          onAction={() => {}}
        />
        <ProductCard
          category="auto"
          title="Auto Compreensivo Total"
          policyNumber="APL-2024-1145"
          status="pendente"
          premium="R$ 289,00"
          onAction={() => {}}
          actionLabel="Regularizar"
        />
      </div>
      <div style={{ marginTop: '24px' }}>
        <Button variant="primary" size="lg">
          Contratar novo seguro
        </Button>
      </div>
    </div>
  );
}
```
