import { memo, type ReactNode } from 'react'
import { cx } from '../lib/cx'

export interface AnimateInProps {
    children: ReactNode
    className?: string
    delay?: number
}

/**
 * Simple animation wrapper — fades in on mount using CSS animation
 */
export const AnimateIn = memo(function AnimateIn({ children, className, delay = 0 }: AnimateInProps) {
    const style = delay > 0 ? { animationDelay: `${delay}ms` } : undefined
    return (
        <div className={cx('gui-animate-in', className)} style={style}>
            {children}
        </div>
    )
})
