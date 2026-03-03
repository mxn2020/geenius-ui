import { memo } from 'react'
import { cx } from '../lib/cx'

export interface ProgressProps { value: number; max?: number; className?: string }

export const Progress = memo(({ value, max = 100, className }: ProgressProps) => (
    <div className={cx('gui-progress', className)} role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max}>
        <div className="gui-progress__bar" style={{ width: `${Math.min(100, (value / max) * 100)}%` }} />
    </div>
))
Progress.displayName = 'Progress'
