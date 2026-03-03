import { forwardRef, memo, type ReactNode, type MouseEvent } from 'react'
import { cx } from '../lib/cx'

export interface ChipProps {
    children: ReactNode
    active?: boolean
    removable?: boolean
    onClick?: () => void
    onRemove?: () => void
    className?: string
}

export const Chip = memo(
    forwardRef<HTMLSpanElement, ChipProps>(
        ({ children, active, removable, onClick, onRemove, className }, ref) => (
            <span
                ref={ref}
                className={cx('gui-chip', active && 'gui-chip--active', onClick && 'gui-chip--clickable', className)}
                onClick={onClick}
            >
                {children}
                {removable && (
                    <button
                        type="button"
                        className="gui-chip__remove"
                        onClick={(e: MouseEvent) => { e.stopPropagation(); onRemove?.() }}
                        aria-label="Remove"
                    >
                        ×
                    </button>
                )}
            </span>
        ),
    ),
)
Chip.displayName = 'Chip'
