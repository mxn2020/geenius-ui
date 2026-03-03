

// Reusable animation wrapper for enter/exit transitions

import {
  ReactNode,
  useRef,
  useEffect,
  useState,
  memo,
  CSSProperties,
} from 'react'
import { cn } from '../lib/utils'

type AnimationType =
  | 'fade'
  | 'slide-left'
  | 'slide-right'
  | 'slide-up'
  | 'slide-down'
  | 'scale'
  | 'expand-x'
  | 'expand-y'

interface AnimatePresenceProps {
  children: ReactNode
  show: boolean
  animation?: AnimationType
  duration?: number
  delay?: number
  className?: string
  /** Keep in DOM when hidden (uses visibility) */
  keepMounted?: boolean
  /** Callback when exit animation completes */
  onExitComplete?: () => void
}

const animationStyles: Record<AnimationType, { enter: string; exit: string }> =
  {
    fade: {
      enter: 'opacity-100',
      exit: 'opacity-0',
    },
    'slide-left': {
      enter: 'opacity-100 translate-x-0',
      exit: 'opacity-0 -translate-x-4',
    },
    'slide-right': {
      enter: 'opacity-100 translate-x-0',
      exit: 'opacity-0 translate-x-4',
    },
    'slide-up': {
      enter: 'opacity-100 translate-y-0',
      exit: 'opacity-0 -translate-y-4',
    },
    'slide-down': {
      enter: 'opacity-100 translate-y-0',
      exit: 'opacity-0 translate-y-4',
    },
    scale: {
      enter: 'opacity-100 scale-100',
      exit: 'opacity-0 scale-95',
    },
    'expand-x': {
      enter: 'opacity-100 scale-x-100',
      exit: 'opacity-0 scale-x-0',
    },
    'expand-y': {
      enter: 'opacity-100 scale-y-100',
      exit: 'opacity-0 scale-y-0',
    },
  }

/**
 * AnimatePresence - Animate elements entering/exiting the DOM
 *
 * @example
 * ```tsx
 * <AnimatePresence show={isOpen} animation="slide-right">
 *   <Menu />
 * </AnimatePresence>
 * ```
 */
export const AnimatePresence = memo(function AnimatePresence({
  children,
  show,
  animation = 'fade',
  duration = 200,
  delay = 0,
  className,
  keepMounted = false,
  onExitComplete,
}: AnimatePresenceProps) {
  const [shouldRender, setShouldRender] = useState(show)
  const [isAnimating, setIsAnimating] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    // Clear any pending timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    if (show) {
      // Show immediately, then animate in
      setShouldRender(true)
      // Small delay to ensure DOM is ready before animation
      requestAnimationFrame(() => {
        setIsAnimating(true)
      })
    } else {
      // Start exit animation
      setIsAnimating(false)
      // Wait for animation to complete before unmounting
      timeoutRef.current = setTimeout(() => {
        if (!keepMounted) {
          setShouldRender(false)
        }
        onExitComplete?.()
      }, duration + delay)
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [show, duration, delay, keepMounted, onExitComplete])

  if (!shouldRender && !keepMounted) {
    return null
  }

  const styles = animationStyles[animation]
  const isVisible = show && isAnimating

  const style: CSSProperties = {
    transitionDuration: `${duration}ms`,
    transitionDelay: delay > 0 ? `${delay}ms` : undefined,
    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    ...(keepMounted && !shouldRender ? { visibility: 'hidden' } : {}),
  }

  return (
    <div
      className={cn(
        'transition-all',
        isVisible ? styles.enter : styles.exit,
        animation.startsWith('expand') && 'origin-left',
        className,
      )}
      style={style}
    >
      {children}
    </div>
  )
})

/**
 * AnimateGroup - Animate multiple children with staggered delays
 */
interface AnimateGroupProps {
  children: ReactNode[]
  show: boolean
  animation?: AnimationType
  duration?: number
  stagger?: number
  className?: string
}

export const AnimateGroup = memo(function AnimateGroup({
  children,
  show,
  animation = 'fade',
  duration = 200,
  stagger = 50,
  className,
}: AnimateGroupProps) {
  return (
    <div className={className}>
      {children.map((child, index) => (
        <AnimatePresence
          key={index}
          show={show}
          animation={animation}
          duration={duration}
          delay={index * stagger}
        >
          {child}
        </AnimatePresence>
      ))}
    </div>
  )
})
