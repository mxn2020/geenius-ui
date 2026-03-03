import { forwardRef, memo, useEffect, type ReactNode } from 'react'
import { cx } from '../lib/cx'

export interface ModalProps {
    open?: boolean
    onClose?: () => void
    title?: string
    children?: ReactNode
    className?: string
}

export const Modal = memo(
    forwardRef<HTMLDivElement, ModalProps>(
        ({ open, onClose, title, children, className }, ref) => {
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
                    <div ref={ref} className={cx('gui-dialog', className)} role="dialog">
                        <button type="button" className="gui-dialog__close" onClick={onClose} aria-label="Close">✕</button>
                        {title && <div className="gui-dialog__header"><h2 className="gui-dialog__title">{title}</h2></div>}
                        {children}
                    </div>
                </>
            )
        },
    ),
)
Modal.displayName = 'Modal'
