/**
 * Shared types and constants — geenius-ui
 *
 * Framework-agnostic types used by both React and Solid components.
 */

// ============================================================================
// Component Variant Types
// ============================================================================

export type ComponentVariant =
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'destructive'

export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export type ButtonVariant =
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'error'
    | 'danger'
    | 'destructive'
    | 'ghost'
    | 'outline'
    | 'link'

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'icon' | 'default'

export type BadgeVariant =
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'destructive'
    | 'info'
    | 'outline'
    | 'error'

export type BadgeSize = 'sm' | 'md' | 'lg'

export type InputSize = 'sm' | 'md' | 'lg'

export type PriorityLevel = 'low' | 'medium' | 'high' | 'urgent'

export type VariantClasses<T extends string> = Record<T, string>

export type DataAlignment = 'left' | 'center' | 'right'

// ============================================================================
// Animation Constants
// ============================================================================

export const ANIMATION_DURATION = {
    fast: 150,
    normal: 200,
    slow: 300,
} as const

export const ANIMATION_EASING = {
    easeOut: 'cubic-bezier(0.16, 1, 0.3, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    default: 'ease-out',
} as const

export const Z_INDEX = {
    dropdown: 50,
    sticky: 100,
    overlay: 200,
    modal: 300,
    popover: 400,
    tooltip: 500,
    priority: 9999,
} as const

// ============================================================================
// Styling Constants
// ============================================================================

export const hoverColors = {
    muted: 'hover:bg-muted',
    primary: 'hover:bg-primary/10 hover:text-primary',
    destructive: 'hover:bg-destructive/10 hover:text-destructive',
    ghost: 'hover:bg-surface',
    surface: 'hover:bg-muted/50',
} as const

export const borderRadius = {
    default: 'rounded-lg',
    full: 'rounded-full',
    sm: 'rounded-md',
} as const

export const transitions = {
    hover: 'transition-colors duration-150 ease-out',
    overlay: 'transition-all duration-200',
    collapse: 'transition-all duration-200 ease-out',
} as const

export const overlayAnimationClasses = {
    fromTop: {
        base: 'origin-top',
        enter: 'animate-in fade-in-0 zoom-in-95 slide-in-from-top-2',
        exit: 'animate-out fade-out-0 zoom-out-95 slide-out-to-top-2',
    },
    fromBottom: {
        base: 'origin-bottom',
        enter: 'animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-2',
        exit: 'animate-out fade-out-0 zoom-out-95 slide-out-to-bottom-2',
    },
    center: {
        base: 'origin-center',
        enter: 'animate-in fade-in-0 zoom-in-95',
        exit: 'animate-out fade-out-0 zoom-out-95',
    },
    fade: {
        base: '',
        enter: 'animate-in fade-in-0',
        exit: 'animate-out fade-out-0',
    },
} as const

export type OverlayAnimationType = keyof typeof overlayAnimationClasses
