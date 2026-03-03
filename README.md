# @geenius-ui

Shared UI component library for **React** and **Solid** — by Geenius.

> 47 React components + 44 Solid components — Tailwind CSS + CVA variants.

## Packages

| Package | Description | Install |
|---|---|---|
| `@geenius-ui/react` | React components | `pnpm add @geenius-ui/react` |
| `@geenius-ui/solid` | Solid components | `pnpm add @geenius-ui/solid` |
| `@geenius-ui/shared` | Shared types & constants | *(auto-installed)* |

## Quick Start

### React Project

```bash
pnpm add @geenius-ui/react
```

```tsx
import { Button, Card, Input, Dialog, cn } from '@geenius-ui/react'

function App() {
  return (
    <Card>
      <Input placeholder="Email" />
      <Button variant="primary" size="md">Submit</Button>
    </Card>
  )
}
```

### Solid Project

```bash
pnpm add @geenius-ui/solid
```

```tsx
import { Button, Card, Input } from '@geenius-ui/solid'

function App() {
  return (
    <Card>
      <Input placeholder="Email" />
      <Button variant="primary" size="md">Submit</Button>
    </Card>
  )
}
```

### Shared Types Only

`@geenius-ui/shared` is auto-installed as a dependency of both `@geenius-ui/react` and `@geenius-ui/solid`, so you can import directly:

```ts
import type { ButtonVariant, ComponentSize, BadgeVariant } from '@geenius-ui/shared'
```

## Setup in Your Project

### 1. Tailwind Config

Add the library source to your Tailwind content paths:

```ts
// tailwind.config.ts
export default {
  content: [
    './src/**/*.{ts,tsx}',
    './node_modules/@geenius-ui/*/src/**/*.{ts,tsx}',
  ],
}
```

### 2. TypeScript Config (React)

No special config needed — works out of the box with any React project:

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "moduleResolution": "bundler"
  }
}
```

### 3. TypeScript Config (Solid)

```json
{
  "compilerOptions": {
    "jsx": "preserve",
    "jsxImportSource": "solid-js",
    "moduleResolution": "bundler"
  }
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

### Animation
`AnimateIn` `AnimatePresence`

### Date
`Calendar` `DatePicker` `DateTimePicker` `CalendarInput`

### State
`EmptyState`

### TanStack Integrations (React only)
`LinkButton` `DataTable` `TablePagination` `fuzzyFilter`

## Utilities

```tsx
import { cn } from '@geenius-ui/react'  // or '@geenius-ui/solid'

<div className={cn('bg-red-500', isActive && 'bg-blue-500')} />
```

## Optional Peer Dependencies

Install only what you use:

```bash
# TanStack integrations (React only)
pnpm add @tanstack/react-router @tanstack/react-table @tanstack/match-sorter-utils

# Icons
pnpm add lucide-react  # or lucide-solid
```

## Development

```bash
pnpm build          # Build all packages
pnpm clean          # Clean all dist/
pnpm publish:all    # Publish all packages to npm
```

## License

MIT
