import { forwardRef, memo, useEffect, type ReactNode } from 'react'
import { cx } from '../lib/cx'

export interface DialogProps {
    open?: boolean
    onClose?: () => void
    title?: string
    description?: string
    children?: ReactNode
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
    className?: string
}

export const Dialog = memo(
    forwardRef<HTMLDivElement, DialogProps>(
        ({ open, onClose, title, description, children, size = 'md', className }, ref) => {
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
                    <div ref={ref} className={cx('gui-dialog', size !== 'md' && `gui-dialog--${size}`, className)} role="dialog">
                        <button type="button" className="gui-dialog__close" onClick={onClose} aria-label="Close">✕</button>
                        {(title || description) && (
                            <div className="gui-dialog__header">
                                {title && <h2 className="gui-dialog__title">{title}</h2>}
                                {description && <p className="gui-dialog__description">{description}</p>}
                            </div>
                        )}
                        {children}
                    </div>
                </>
            )
        },
    ),
)
Dialog.displayName = 'Dialog'

export const DialogFooter = memo(({ children, className }: { children: ReactNode; className?: string }) => (
    <div className={cx('gui-dialog__footer', className)}>{children}</div>
))
DialogFooter.displayName = 'DialogFooter'
