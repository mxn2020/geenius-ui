# @geenius-ui/react-css

[![CI](https://github.com/mxn2020/geenius-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/mxn2020/geenius-ui/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/@geenius-ui/react-css)](https://www.npmjs.com/package/@geenius-ui/react-css)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](../../LICENSE)

React UI component library with **Vanilla CSS** — by Geenius. Zero Tailwind dependency.

## Installation

```bash
pnpm add @geenius-ui/react-css
```

## Usage

```tsx
import '@geenius-ui/react-css/styles'  // import once in app entry
import { Button, Card, Input, cx } from '@geenius-ui/react-css'

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
`AnimateIn` `AnimatePresence` `AnimateGroup`

## License

MIT
