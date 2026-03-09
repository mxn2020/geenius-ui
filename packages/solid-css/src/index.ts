/**
 * @geenius-ui/solid-css — Solid UI Components (Vanilla CSS)
 *
 * Import the styles in your app:
 *   import '@geenius-ui/solid-css/styles'
 */

// Utilities
export { cx } from './lib/cx'
export type { ButtonVariant, ButtonSize, BadgeVariant, BadgeSize, ComponentSize, PriorityLevel } from './lib/types'

// Re-export hooks
export * from './hooks'

// Re-export custom composed components
export * from './custom'

// Re-export helpers
export * from './lib/helpers'

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
    AnimateIn, AnimatePresence, AnimateGroup,

    // Loading
    Loading, LoadingSpinner,

    // Badge variants
    StatusBadge, PriorityBadge, TaskStatusBadge,

    // Skeleton variants
    SkeletonText, SkeletonAvatar, SkeletonCard, SkeletonTable,
    SkeletonGrid, SkeletonForm, SkeletonMetricCard, SkeletonList,

    // Avatar compound
    AvatarImage, AvatarFallback, CompoundAvatar, getAvatarInitials,

    // Section compound
    SectionHeader, SectionTitle, SectionDescription, SectionContent, CompoundSection,

    // List compound
    ListContainer, CompactListView, DataList,

    // EmptyState presets
    NoSearchResults, NoFilterResults,

    // CostDisplay
    SimpleCostDisplay,
} from './components'
