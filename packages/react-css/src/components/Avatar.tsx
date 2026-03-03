import { forwardRef, memo, type ReactNode } from 'react'
import { cx } from '../lib/cx'

export interface AvatarProps {
    src?: string
    alt?: string
    fallback?: ReactNode
    size?: 'sm' | 'md' | 'lg' | 'xl'
    className?: string
}

export const Avatar = memo(
    forwardRef<HTMLDivElement, AvatarProps>(
        ({ src, alt, fallback, size = 'md', className }, ref) => (
            <div ref={ref} className={cx('gui-avatar', `gui-avatar--${size}`, className)}>
                {src ? (
                    <img className="gui-avatar__image" src={src} alt={alt || ''} />
                ) : (
                    <span className="gui-avatar__fallback">{fallback}</span>
                )}
            </div>
        ),
    ),
)
Avatar.displayName = 'Avatar'
