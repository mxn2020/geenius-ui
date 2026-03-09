
// Shared animation utilities for overlay components (Solid version)

import { createSignal, createEffect, onCleanup } from 'solid-js'
import type { JSX } from 'solid-js'

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
// Overlay Animation Classes
// ============================================================================

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

// ============================================================================
// createAnimatedOpen — Solid equivalent of React's useAnimatedOpen
// ============================================================================

interface CreateAnimatedOpenOptions {
    duration?: number
    onExitComplete?: () => void
}

interface AnimatedOpenReturn {
    shouldRender: () => boolean
    dataState: () => 'open' | 'closed'
    animationStyle: () => JSX.CSSProperties
}

/**
 * Solid primitive to manage open/close state with proper exit animations.
 *
 * @example
 * ```tsx
 * function MyOverlay(props: { open: boolean }) {
 *   const { shouldRender, dataState, animationStyle } = createAnimatedOpen(() => props.open)
 *
 *   return (
 *     <Show when={shouldRender()}>
 *       <div data-state={dataState()} style={animationStyle()}>Content</div>
 *     </Show>
 *   )
 * }
 * ```
 */
export function createAnimatedOpen(
    open: () => boolean,
    options: CreateAnimatedOpenOptions = {},
): AnimatedOpenReturn {
    const duration = options.duration ?? ANIMATION_DURATION.normal

    const [shouldRender, setShouldRender] = createSignal(open())
    const [dataState, setDataState] = createSignal<'open' | 'closed'>(open() ? 'open' : 'closed')

    createEffect(() => {
        if (open()) {
            setShouldRender(true)
            requestAnimationFrame(() => {
                requestAnimationFrame(() => setDataState('open'))
            })
        } else if (shouldRender()) {
            setDataState('closed')
            const timer = setTimeout(() => {
                setShouldRender(false)
                options.onExitComplete?.()
            }, duration)
            onCleanup(() => clearTimeout(timer))
        }
    })

    const animationStyle = (): JSX.CSSProperties => ({
        'animation-duration': `${duration}ms`,
        'transition-duration': `${duration}ms`,
        'transition-property': 'opacity, transform',
        'animation-timing-function': ANIMATION_EASING.easeOut,
    })

    return { shouldRender, dataState, animationStyle }
}

// ============================================================================
// Helper: Get Animation Classes
// ============================================================================

export function getOverlayAnimationClasses(
    dataState: 'open' | 'closed',
    animationType: OverlayAnimationType = 'fromTop',
): string {
    const animation = overlayAnimationClasses[animationType]
    const stateClasses = dataState === 'open' ? animation.enter : animation.exit
    return `${animation.base} ${stateClasses}`
}

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
