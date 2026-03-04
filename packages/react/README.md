# @geenius-ui/react

[![CI](https://github.com/mxn2020/geenius-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/mxn2020/geenius-ui/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/@geenius-ui/react)](https://www.npmjs.com/package/@geenius-ui/react)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](../../LICENSE)

React UI component library with **Tailwind CSS** — by Geenius.

## Installation

```bash
pnpm add @geenius-ui/react
```

Add to your Tailwind config:
```ts
content: ['./node_modules/@geenius-ui/*/src/**/*.{ts,tsx}']
```

## Usage

```tsx
import { Button, Card, Input, Badge } from '@geenius-ui/react'

function App() {
  return (
    <Card>
      <Input placeholder="Enter text" />
      <Button variant="primary">Submit</Button>
    </Card>
  )
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
`AnimateIn` `AnimatePresence` `AnimateGroup`

## License

MIT
