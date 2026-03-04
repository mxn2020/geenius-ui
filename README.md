# @geenius-ui

[![CI](https://github.com/mxn2020/geenius-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/mxn2020/geenius-ui/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/@geenius-ui/react-css)](https://www.npmjs.com/package/@geenius-ui/react-css)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

Shared UI component library for **React** and **Solid** — by Geenius.

> 47 React + 44 Solid components × 2 styling variants = **full coverage**.

## Packages

| Package | Styling | Install |
|---|---|---|
| `@geenius-ui/react` | Tailwind CSS | `pnpm add @geenius-ui/react` |
| `@geenius-ui/react-css` | Vanilla CSS | `pnpm add @geenius-ui/react-css` |
| `@geenius-ui/solid` | Tailwind CSS | `pnpm add @geenius-ui/solid` |
| `@geenius-ui/solid-css` | Vanilla CSS | `pnpm add @geenius-ui/solid-css` |
| `@geenius-ui/shared` | — | *(auto-installed)* |

## Quick Start

### React + Tailwind

```bash
pnpm add @geenius-ui/react
```

```tsx
import { Button, Card, Input } from '@geenius-ui/react'
```

Add to your Tailwind config:
```ts
content: ['./node_modules/@geenius-ui/*/src/**/*.{ts,tsx}']
```

### React + Vanilla CSS

```bash
pnpm add @geenius-ui/react-css
```

```tsx
import '@geenius-ui/react-css/styles'  // import once in app entry
import { Button, Card, Input, cx } from '@geenius-ui/react-css'
```

### Solid + Tailwind

```bash
pnpm add @geenius-ui/solid
```

```tsx
import { Button, Card, Input } from '@geenius-ui/solid'
```

### Solid + Vanilla CSS

```bash
pnpm add @geenius-ui/solid-css
```

```tsx
import '@geenius-ui/solid-css/styles'
import { Button, Card, Input, cx } from '@geenius-ui/solid-css'
```

## Theming (Vanilla CSS)

Customize with CSS custom properties:

```css
:root {
  --gui-primary: #6366f1;
  --gui-radius: 0.5rem;
  --gui-font: 'Inter', sans-serif;
}

/* Dark mode */
.dark {
  --gui-primary: #818cf8;
  --gui-surface: #1e293b;
}
```

## Components

### Form
`Button` `Input` `Textarea` `Checkbox` `Switch` `RadioGroup` `Label` `Select` `Slider` `Toggle` `ToggleGroup`

### Display
`Badge` `Chip` `Loading` `LoadingSpinner` `Tooltip` `CostDisplay` `Avatar` `Skeleton` `Progress`

### Layout
`Card` `Section` `Table` `List` `ViewSwitcher` `Separator` `Breadcrumb` `ScrollArea` `Resizable`

### Interactive
`Modal` `Tabs` `Dialog` `Sheet` `DropdownMenu` `Collapsible` `Alert` `AlertDialog` `Popover`

### State
`EmptyState`

### TanStack Integrations (React Tailwind only)
`LinkButton` `DataTable` `TablePagination` `fuzzyFilter`

## Development

```bash
pnpm build              # Build all packages
pnpm clean              # Clean all dist/
pnpm version:patch      # Bump all versions (0.1.0 → 0.1.1)
pnpm release            # Push + tag → triggers CI/CD
```

## License

MIT
