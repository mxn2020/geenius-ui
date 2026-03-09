import { forwardRef, memo, useState, useCallback, useEffect, type ReactNode } from 'react'
import { cx } from '../lib/cx'

export interface AvatarProps {
    children?: ReactNode
    src?: string
    alt?: string
    fallback?: ReactNode
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
    className?: string
}

export const Avatar = memo(
    forwardRef<HTMLDivElement, AvatarProps>(
        ({ children, src, alt, fallback, size = 'md', className }, ref) => (
            <div ref={ref} className={cx('gui-avatar', `gui-avatar--${size}`, className)}>
                {children ?? (src ? (
                    <img className="gui-avatar__image" src={src} alt={alt || ''} />
                ) : (
                    <span className="gui-avatar__fallback">{fallback}</span>
                ))}
            </div>
        ),
    ),
)
Avatar.displayName = 'Avatar'

// AvatarImage
export interface AvatarImageProps {
    src?: string; alt?: string; className?: string
    onLoadingStatusChange?: (status: 'idle' | 'loading' | 'loaded' | 'error') => void
}

export const AvatarImage = memo(
    forwardRef<HTMLImageElement, AvatarImageProps>(
        ({ src, alt, className, onLoadingStatusChange }, ref) => {
            const [status, setStatus] = useState<'idle' | 'loading' | 'loaded' | 'error'>('idle')
            const onLoad = useCallback(() => { setStatus('loaded'); onLoadingStatusChange?.('loaded') }, [onLoadingStatusChange])
            const onError = useCallback(() => { setStatus('error'); onLoadingStatusChange?.('error') }, [onLoadingStatusChange])
            if (!src) return null
            return <img ref={ref} src={src} alt={alt} className={cx('gui-avatar__image', className)} onLoad={onLoad} onError={onError} style={{ display: status === 'loaded' ? 'block' : 'none' }} />
        },
    ),
)
AvatarImage.displayName = 'AvatarImage'

// AvatarFallback
export interface AvatarFallbackProps { children: ReactNode; className?: string; delayMs?: number }

export const AvatarFallback = memo(
    forwardRef<HTMLDivElement, AvatarFallbackProps>(
        ({ children, className, delayMs = 0 }, ref) => {
            const [show, setShow] = useState(delayMs === 0)
            useEffect(() => { if (delayMs <= 0) return; const t = setTimeout(() => setShow(true), delayMs); return () => clearTimeout(t) }, [delayMs])
            if (!show) return null
            return <div ref={ref} className={cx('gui-avatar__fallback', className)}>{children}</div>
        },
    ),
)
AvatarFallback.displayName = 'AvatarFallback'

// getAvatarInitials
export const getAvatarInitials = (name: string): string =>
    name.split(' ').slice(0, 2).map(w => w.charAt(0).toUpperCase()).join('')

// CompoundAvatar
export interface CompoundAvatarProps {
    src?: string; alt?: string; name?: string; fallback?: ReactNode
    className?: string; size?: AvatarProps['size']; showFallback?: boolean
}

export const CompoundAvatar = memo(
    forwardRef<HTMLDivElement, CompoundAvatarProps>(
        ({ src, alt, name, fallback, className, size = 'md', showFallback = true }, ref) => {
            const [imgStatus, setImgStatus] = useState<'idle' | 'loading' | 'loaded' | 'error'>('idle')
            const shouldFallback = showFallback && (!src || imgStatus === 'error')
            const initials = name ? getAvatarInitials(name) : ''
            const displayAlt = alt || name || 'Avatar'
            return (
                <Avatar ref={ref} className={className} size={size}>
                    {src && <AvatarImage src={src} alt={displayAlt} onLoadingStatusChange={setImgStatus} />}
                    {shouldFallback && <AvatarFallback>{fallback || initials || displayAlt.charAt(0).toUpperCase()}</AvatarFallback>}
                </Avatar>
            )
        },
    ),
)
CompoundAvatar.displayName = 'CompoundAvatar'

