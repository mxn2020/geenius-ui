/**
 * @geenius-ui/solid-css — Solid UI Components (Vanilla CSS)
 *
 * Import the styles in your app:
 *   import '@geenius-ui/solid-css/styles'
 */

// Utilities
export { cx } from './lib/cx'
export type { ButtonVariant, ButtonSize, BadgeVariant, BadgeSize, ComponentSize } from './lib/types'

// Re-export hooks
export * from './hooks'

// Re-export custom composed components
export * from './custom'

// Re-export all components
export {
    // Core
    Button, type ButtonProps,
    Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
    Input, Textarea, Label,
    Badge, Chip,
    Alert, Avatar, Skeleton, Progress, Separator,
    Switch, Checkbox, Select,

    // Layout
    Section, Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
    List, ListItem, ScrollArea, ViewSwitcher,
    EmptyState, CostDisplay, Resizable, Breadcrumb,

    // Interactive
    Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
    Modal,
    Sheet, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose,
    Tabs, Collapsible,
    DropdownMenu, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel,
    Popover,
    Toggle, ToggleGroup,
    AlertDialog, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription,
    AlertDialogFooter, AlertDialogAction, AlertDialogCancel,
    RadioGroup, Radio,
    Slider, Tooltip,

    // Calendar / Date
    Calendar, DatePicker, DateTimePicker, CalendarInput,

    // Animation
    AnimateIn, AnimatePresence,

    // Loading
    Loading, LoadingSpinner,
} from './components'
