# @geenius-ui/solid-css

[![CI](https://github.com/mxn2020/geenius-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/mxn2020/geenius-ui/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/@geenius-ui/solid-css)](https://www.npmjs.com/package/@geenius-ui/solid-css)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](../../LICENSE)

Solid UI component library with **Vanilla CSS** — by Geenius. Zero Tailwind dependency.

## Installation

```bash
pnpm add @geenius-ui/solid-css
```

## Usage

```tsx
import '@geenius-ui/solid-css/styles'  // import once in app entry
import { Button, Card, Input, cx } from '@geenius-ui/solid-css'

function App() {
  return (
    <Card>
      <Input placeholder="Enter text" />
      <Button variant="primary">Submit</Button>
    </Card>
  )
}
```

## Theming

Customize with CSS custom properties:

```css
:root {
  --gui-primary: #6366f1;
  --gui-radius: 0.5rem;
  --gui-font: 'Inter', sans-serif;
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

### Date
`Calendar` `DatePicker` `DateTimePicker` `CalendarInput`

### Animation
`AnimateIn` `AnimatePresence`

## License

MIT
