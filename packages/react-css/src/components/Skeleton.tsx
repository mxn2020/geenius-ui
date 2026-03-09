import { memo, type CSSProperties, type ReactNode } from 'react'
import { cx } from '../lib/cx'

export interface SkeletonProps {
    width?: string | number
    height?: string | number
    circular?: boolean
    variant?: 'default' | 'text' | 'circular' | 'rectangular'
    className?: string
    style?: CSSProperties
}

export const Skeleton = memo(
    ({ width, height, circular, variant = 'default', className, style }: SkeletonProps) => (
        <div
            className={cx('gui-skeleton', (circular || variant === 'circular') && 'gui-skeleton--circular', variant === 'text' && 'gui-skeleton--text', className)}
            style={{ width, height, ...style }}
        />
    ),
)
Skeleton.displayName = 'Skeleton'

// SkeletonText
export const SkeletonText = memo(({ lines = 3, lastLineWidth = '80%', className }: { lines?: number; lastLineWidth?: string; className?: string }) => (
    <div className={cx('gui-skeleton-group', className)}>
        {Array.from({ length: lines }).map((_, i) => (
            <Skeleton key={i} variant="text" height={16} style={i === lines - 1 ? { width: lastLineWidth } : undefined} />
        ))}
    </div>
))
SkeletonText.displayName = 'SkeletonText'

// SkeletonAvatar
export const SkeletonAvatar = memo(({ size = 'md', className }: { size?: 'sm' | 'md' | 'lg' | 'xl'; className?: string }) => {
    const px = { sm: 32, md: 40, lg: 48, xl: 64 }
    return <Skeleton circular width={px[size]} height={px[size]} className={className} />
})
SkeletonAvatar.displayName = 'SkeletonAvatar'

// SkeletonCard
export const SkeletonCard = memo(({ hasImage = false, hasAvatar = false, lines = 3, className }: { hasImage?: boolean; hasAvatar?: boolean; lines?: number; className?: string }) => (
    <div className={cx('gui-skeleton-group', className)}>
        {hasImage && <Skeleton height={192} />}
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            {hasAvatar && <SkeletonAvatar />}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <Skeleton height={20} style={{ width: '75%' }} />
                <Skeleton height={16} style={{ width: '50%' }} />
            </div>
        </div>
        {lines > 0 && <SkeletonText lines={lines} />}
    </div>
))
SkeletonCard.displayName = 'SkeletonCard'

// SkeletonTable
export const SkeletonTable = memo(({ rows = 5, columns = 4, hasHeader = true, className }: { rows?: number; columns?: number; hasHeader?: boolean; className?: string }) => (
    <div className={cx('gui-skeleton-group', className)}>
        {hasHeader && (
            <div style={{ display: 'flex', gap: 16 }}>
                {Array.from({ length: columns }).map((_, i) => <Skeleton key={i} height={16} style={{ flex: 1 }} />)}
            </div>
        )}
        {Array.from({ length: rows }).map((_, r) => (
            <div key={r} style={{ display: 'flex', gap: 16 }}>
                {Array.from({ length: columns }).map((_, c) => <Skeleton key={c} height={40} style={{ flex: 1 }} />)}
            </div>
        ))}
    </div>
))
SkeletonTable.displayName = 'SkeletonTable'

// SkeletonGrid
export const SkeletonGrid = memo(({ items = 6, columns = 3, itemHeight = 200, className, children }: {
    items?: number; columns?: 1 | 2 | 3 | 4 | 6; itemHeight?: number; className?: string; children?: (i: number) => ReactNode
}) => (
    <div className={cx('gui-skeleton-grid', className)} style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {Array.from({ length: items }).map((_, i) => (
            <div key={i}>{children ? children(i) : <Skeleton height={itemHeight} />}</div>
        ))}
    </div>
))
SkeletonGrid.displayName = 'SkeletonGrid'

// SkeletonForm
export const SkeletonForm = memo(({ fields = 4, hasSubmit = true, className }: { fields?: number; hasSubmit?: boolean; className?: string }) => (
    <div className={cx('gui-skeleton-group', className)}>
        {Array.from({ length: fields }).map((_, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <Skeleton height={16} style={{ width: '25%' }} />
                <Skeleton height={40} />
            </div>
        ))}
        {hasSubmit && <Skeleton height={40} style={{ width: 128 }} />}
    </div>
))
SkeletonForm.displayName = 'SkeletonForm'

// SkeletonMetricCard
export const SkeletonMetricCard = memo(({ hasIcon = true, hasTrend = true, className }: { hasIcon?: boolean; hasTrend?: boolean; className?: string }) => (
    <div className={cx('gui-skeleton-group', className)}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flex: 1 }}>
                {hasIcon && <Skeleton height={48} style={{ width: 48, borderRadius: 8 }} />}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <Skeleton height={16} style={{ width: '66%' }} />
                    <Skeleton height={24} style={{ width: '50%' }} />
                </div>
            </div>
            {hasTrend && <Skeleton circular width={32} height={32} />}
        </div>
        <Skeleton height={12} />
    </div>
))
SkeletonMetricCard.displayName = 'SkeletonMetricCard'

// SkeletonList
export const SkeletonList = memo(({ items = 5, hasAvatar = false, hasSecondary = true, className }: {
    items?: number; hasAvatar?: boolean; hasSecondary?: boolean; className?: string
}) => (
    <div className={cx('gui-skeleton-group', className)}>
        {Array.from({ length: items }).map((_, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                {hasAvatar && <SkeletonAvatar />}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <Skeleton height={16} style={{ width: '75%' }} />
                    {hasSecondary && <Skeleton height={12} style={{ width: '50%' }} />}
                </div>
            </div>
        ))}
    </div>
))
SkeletonList.displayName = 'SkeletonList'

