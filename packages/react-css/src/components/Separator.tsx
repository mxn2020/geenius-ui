import { memo } from 'react'
import { cx } from '../lib/cx'

export interface SeparatorProps { orientation?: 'horizontal' | 'vertical'; className?: string }

export const Separator = memo(({ orientation = 'horizontal', className }: SeparatorProps) => (
    <div className={cx('gui-separator', `gui-separator--${orientation}`, className)} role="separator" />
))
Separator.displayName = 'Separator'
