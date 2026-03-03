

// Shared animation utilities for overlay components

import { useEffect, useState, useRef, useCallback } from 'react'

// ============================================================================
// Animation Constants
// ============================================================================

export const ANIMATION_DURATION = {
  fast: 150,
  normal: 200,
  slow: 300,
} as const

export const ANIMATION_EASING = {
  // Smooth deceleration - good for enter animations
  easeOut: 'cubic-bezier(0.16, 1, 0.3, 1)',
  // Smooth acceleration - good for exit animations
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  // Balanced - good for hover effects
  default: 'ease-out',
} as const

// Standard z-index hierarchy
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

/** Standard animation classes for enter/exit on overlays */
export const overlayAnimationClasses = {
  // Fade + scale from top (for dropdowns aligned to top)
  fromTop: {
    base: 'origin-top',
    enter: 'animate-in fade-in-0 zoom-in-95 slide-in-from-top-2',
    exit: 'animate-out fade-out-0 zoom-out-95 slide-out-to-top-2',
  },
  // Fade + scale from bottom
  fromBottom: {
    base: 'origin-bottom',
    enter: 'animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-2',
    exit: 'animate-out fade-out-0 zoom-out-95 slide-out-to-bottom-2',
  },
  // Fade + scale centered (for dialogs)
  center: {
    base: 'origin-center',
    enter: 'animate-in fade-in-0 zoom-in-95',
    exit: 'animate-out fade-out-0 zoom-out-95',
  },
  // Simple fade (for tooltips, subtle elements)
  fade: {
    base: '',
    enter: 'animate-in fade-in-0',
    exit: 'animate-out fade-out-0',
  },
} as const

export type OverlayAnimationType = keyof typeof overlayAnimationClasses

// ============================================================================
// useAnimatedOpen Hook
// ============================================================================

interface UseAnimatedOpenOptions {
  /** Duration of animation in ms */
  duration?: number
  /** Callback when exit animation completes */
  onExitComplete?: () => void
}

interface UseAnimatedOpenReturn {
  /** Whether the element should be rendered in DOM */
  shouldRender: boolean
  /** Current animation state for data-state attribute */
  dataState: 'open' | 'closed'
  /** Style object with animation timing */
  animationStyle: React.CSSProperties
}

/**
 * Hook to manage open/close state with proper exit animations.
 *
 * The key problem this solves: Most overlay components unmount immediately
 * when `open` becomes false, which prevents exit CSS animations from playing.
 * This hook delays unmounting until the exit animation completes.
 *
 * @example
 * ```tsx
 * function MyOverlay({ open }: { open: boolean }) {
 *   const { shouldRender, dataState, animationStyle } = useAnimatedOpen(open)
 *
 *   if (!shouldRender) return null
 *
 *   return (
 *     <div data-state={dataState} style={animationStyle} className="...">
 *       Content
 *     </div>
 *   )
 * }
 * ```
 */
export function useAnimatedOpen(
  open: boolean,
  options: UseAnimatedOpenOptions = {},
): UseAnimatedOpenReturn {
  const { duration = ANIMATION_DURATION.normal, onExitComplete } = options

  // Whether we should keep the element in the DOM
  const [shouldRender, setShouldRender] = useState(open)
  // The current animation state (drives CSS animations via data-state)
  const [dataState, setDataState] = useState<'open' | 'closed'>(
    open ? 'open' : 'closed',
  )

  const exitTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    // Clear any pending timeout
    if (exitTimeoutRef.current) {
      clearTimeout(exitTimeoutRef.current)
      exitTimeoutRef.current = null
    }

    if (open) {
      // Opening: Render immediately, then trigger enter animation
      setShouldRender(true)
      // Use double RAF to ensure the element is painted before animation starts
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setDataState('open')
        })
      })
    } else if (shouldRender) {
      // Closing: Start exit animation, delay unmount
      setDataState('closed')
      exitTimeoutRef.current = setTimeout(() => {
        setShouldRender(false)
        onExitComplete?.()
      }, duration)
    }

    return () => {
      if (exitTimeoutRef.current) {
        clearTimeout(exitTimeoutRef.current)
      }
    }
  }, [open, duration, onExitComplete, shouldRender])

  const animationStyle: React.CSSProperties = {
    animationDuration: `${duration}ms`,
    transitionDuration: `${duration}ms`,
    animationTimingFunction: ANIMATION_EASING.easeOut,
  }

  return { shouldRender, dataState, animationStyle }
}

// ============================================================================
// Helper: Get Animation Classes
// ============================================================================

/**
 * Get the appropriate animation classes based on state and animation type
 */
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

/** Standardized hover background colors */
export const hoverColors = {
  /** Default menu items, list items */
  muted: 'hover:bg-muted',
  /** Primary action items */
  primary: 'hover:bg-primary/10 hover:text-primary',
  /** Destructive/danger items */
  destructive: 'hover:bg-destructive/10 hover:text-destructive',
  /** Ghost/subtle hover */
  ghost: 'hover:bg-surface',
  /** Card/surface hover */
  surface: 'hover:bg-muted/50',
} as const

/** Standardized border radius */
export const borderRadius = {
  /** Overlays, cards, buttons, inputs */
  default: 'rounded-lg',
  /** Pills, chips, avatars */
  full: 'rounded-full',
  /** Smaller elements */
  sm: 'rounded-md',
} as const

/** Standardized transition classes */
export const transitions = {
  /** For hover effects */
  hover: 'transition-colors duration-150 ease-out',
  /** For overlay open/close */
  overlay: 'transition-all duration-200',
  /** For collapsible height changes */
  collapse: 'transition-all duration-200 ease-out',
} as const
