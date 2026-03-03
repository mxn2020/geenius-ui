import { memo, type CSSProperties } from 'react'
import { cx } from '../lib/cx'

export interface SkeletonProps {
    width?: string | number
    height?: string | number
    circular?: boolean
    className?: string
    style?: CSSProperties
}

export const Skeleton = memo(
    ({ width, height, circular, className, style }: SkeletonProps) => (
        <div
            className={cx('gui-skeleton', circular && 'gui-skeleton--circular', className)}
            style={{ width, height, ...style }}
        />
    ),
)
Skeleton.displayName = 'Skeleton'
