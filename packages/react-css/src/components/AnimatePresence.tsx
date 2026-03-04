import { memo, useState, useEffect, useRef, type ReactNode, type CSSProperties } from 'react'
import { cx } from '../lib/cx'

type AnimationType = 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale'

export interface AnimatePresenceProps {
    children: ReactNode
    show: boolean
    animation?: AnimationType
    duration?: number
    delay?: number
    className?: string
    keepMounted?: boolean
    onExitComplete?: () => void
}

export const AnimatePresence = memo(function AnimatePresence({
    children, show, animation = 'fade', duration = 200, delay = 0,
    className, keepMounted = false, onExitComplete,
}: AnimatePresenceProps) {
    const [shouldRender, setShouldRender] = useState(show)
    const [isAnimating, setIsAnimating] = useState(false)
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    useEffect(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)

        if (show) {
            setShouldRender(true)
            requestAnimationFrame(() => setIsAnimating(true))
        } else {
            setIsAnimating(false)
            timeoutRef.current = setTimeout(() => {
                if (!keepMounted) setShouldRender(false)
                onExitComplete?.()
            }, duration + delay)
        }

        return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current) }
    }, [show, duration, delay, keepMounted, onExitComplete])

    if (!shouldRender && !keepMounted) return null

    const style: CSSProperties = {
        transitionDuration: `${duration}ms`,
        transitionDelay: delay > 0 ? `${delay}ms` : undefined,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        ...(keepMounted && !shouldRender ? { visibility: 'hidden' } : {}),
    }

    return (
        <div
            className={cx(
                'gui-animate-presence',
                `gui-animate-presence--${animation}`,
                isAnimating && show ? 'gui-animate-presence--enter' : 'gui-animate-presence--exit',
                className,
            )}
            style={style}
        >
            {children}
        </div>
    )
})

export interface AnimateGroupProps {
    children: ReactNode[]
    show: boolean
    animation?: AnimationType
    duration?: number
    stagger?: number
    className?: string
}

export const AnimateGroup = memo(function AnimateGroup({ children, show, animation = 'fade', duration = 200, stagger = 50, className }: AnimateGroupProps) {
    return (
        <div className={className}>
            {children.map((child, index) => (
                <AnimatePresence key={index} show={show} animation={animation} duration={duration} delay={index * stagger}>
                    {child}
                </AnimatePresence>
            ))}
        </div>
    )
})
