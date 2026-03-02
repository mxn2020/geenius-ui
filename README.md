# geenius-ui

Shared UI component library for **React** and **Solid** — by Geenius.

> 47 React components + 44 Solid components, all Tailwind-styled with CVA variants.

## Installation

```bash
npm install geenius-ui
# or
pnpm add geenius-ui
```

### Peer Dependencies

Install the ones you need:

```bash
# For React projects
pnpm add react react-dom

# For Solid projects
pnpm add solid-js

# Optional: TanStack integrations
pnpm add @tanstack/react-router @tanstack/react-table @tanstack/match-sorter-utils

# Optional: Icons
pnpm add lucide-react  # or lucide-solid
```

## Usage

### React

```tsx
import { Button, Card, Input, Dialog } from 'geenius-ui/react'

function App() {
  return (
    <Card>
      <Input placeholder="Email" />
      <Button variant="primary" size="md">Submit</Button>
    </Card>
  )
}
```

### Solid

```tsx
import { Button, Card, Input } from 'geenius-ui/solid'

function App() {
  return (
    <Card>
      <Input placeholder="Email" />
      <Button variant="primary" size="md">Submit</Button>
    </Card>
  )
}
```

### Shared Types

```ts
import type { ButtonVariant, ComponentSize } from 'geenius-ui/shared'
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
import { cn } from 'geenius-ui/react'

// Merge Tailwind classes with proper precedence
<div className={cn('bg-red-500', isActive && 'bg-blue-500')} />
```

## Styling

This library uses **Tailwind CSS** + **CVA** (class-variance-authority). Make sure your project's Tailwind config includes the library's source files:

```ts
// tailwind.config.ts
export default {
  content: [
    './src/**/*.{ts,tsx}',
    './node_modules/geenius-ui/src/**/*.{ts,tsx}',
  ],
}
```

## Development

```bash
pnpm build          # Build all (React + Solid + Shared)
pnpm type-check     # Type-check both frameworks
pnpm clean          # Remove dist/
```

## License

MIT
