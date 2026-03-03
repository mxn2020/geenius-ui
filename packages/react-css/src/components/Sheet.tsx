import { forwardRef, memo, useEffect, type ReactNode } from 'react'
import { cx } from '../lib/cx'

export interface SheetProps {
    open?: boolean
    onClose?: () => void
    side?: 'left' | 'right' | 'top' | 'bottom'
    children?: ReactNode
    className?: string
}

export const Sheet = memo(
    forwardRef<HTMLDivElement, SheetProps>(
        ({ open, onClose, side = 'right', children, className }, ref) => {
            useEffect(() => {
                if (!open) return
                const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose?.() }
                document.addEventListener('keydown', onKey)
                return () => document.removeEventListener('keydown', onKey)
            }, [open, onClose])

            if (!open) return null
            return (
                <>
                    <div className="gui-overlay" onClick={onClose} />
                    <div ref={ref} className={cx('gui-sheet', `gui-sheet--${side}`, className)}>
                        <button type="button" className="gui-dialog__close" onClick={onClose} aria-label="Close">✕</button>
                        <div className="gui-sheet__content">{children}</div>
                    </div>
                </>
            )
        },
    ),
)
Sheet.displayName = 'Sheet'
