import { forwardRef, memo, useCallback, type ReactNode } from 'react'
import { cx } from '../lib/cx'

interface CardProps {
    children: ReactNode
    className?: string
    padding?: 'none' | 'sm' | 'md' | 'lg'
    shadow?: 'none' | 'sm' | 'md' | 'lg'
    hover?: boolean
    onClick?: () => void
}

export const Card = memo(
    forwardRef<HTMLDivElement, CardProps>(
        ({ children, className, padding = 'none', shadow = 'sm', hover = false, onClick }, ref) => {
            const handleClick = useCallback(() => onClick?.(), [onClick])
            return (
                <div
                    ref={ref}
                    className={cx(
                        'gui-card',
                        shadow !== 'none' && `gui-card--shadow-${shadow}`,
                        (hover || !!onClick) && 'gui-card--hover',
                        padding !== 'none' && `gui-card--pad-${padding}`,
                        className,
                    )}
                    onClick={onClick ? handleClick : undefined}
                >
                    {children}
                </div>
            )
        },
    ),
)
Card.displayName = 'Card'

export const CardHeader = memo(
    forwardRef<HTMLDivElement, { children: ReactNode; className?: string }>(
        ({ children, className }, ref) => (
            <div ref={ref} className={cx('gui-card-header', className)}>{children}</div>
        ),
    ),
)
CardHeader.displayName = 'CardHeader'

export const CardTitle = memo(
    forwardRef<HTMLHeadingElement, { children: ReactNode; className?: string }>(
        ({ children, className }, ref) => (
            <h3 ref={ref} className={cx('gui-card-title', className)}>{children}</h3>
        ),
    ),
)
CardTitle.displayName = 'CardTitle'

export const CardDescription = memo(
    forwardRef<HTMLParagraphElement, { children: ReactNode; className?: string }>(
        ({ children, className }, ref) => (
            <p ref={ref} className={cx('gui-card-description', className)}>{children}</p>
        ),
    ),
)
CardDescription.displayName = 'CardDescription'

export const CardContent = memo(
    forwardRef<HTMLDivElement, { children: ReactNode; className?: string }>(
        ({ children, className }, ref) => (
            <div ref={ref} className={cx('gui-card-content', className)}>{children}</div>
        ),
    ),
)
CardContent.displayName = 'CardContent'

export const CardFooter = memo(
    forwardRef<HTMLDivElement, { children: ReactNode; className?: string }>(
        ({ children, className }, ref) => (
            <div ref={ref} className={cx('gui-card-footer', className)}>{children}</div>
        ),
    ),
)
CardFooter.displayName = 'CardFooter'
