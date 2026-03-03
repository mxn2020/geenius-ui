import { forwardRef, memo, type ReactNode } from 'react'
import { cx } from '../lib/cx'
import type { BadgeVariant } from '../lib/types'

export interface BadgeProps {
    children: ReactNode
    variant?: BadgeVariant
    size?: 'sm' | 'md' | 'lg'
    className?: string
}

export const Badge = memo(
    forwardRef<HTMLSpanElement, BadgeProps>(
        ({ children, variant = 'default', size = 'md', className }, ref) => (
            <span ref={ref} className={cx('gui-badge', `gui-badge--${variant}`, size !== 'md' && `gui-badge--${size}`, className)}>
                {children}
            </span>
        ),
    ),
)
Badge.displayName = 'Badge'
