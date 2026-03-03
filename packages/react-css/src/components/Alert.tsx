import { forwardRef, memo, type ReactNode } from 'react'
import { cx } from '../lib/cx'

export interface AlertProps {
    children: ReactNode
    variant?: 'default' | 'success' | 'warning' | 'error' | 'destructive'
    icon?: ReactNode
    title?: string
    className?: string
}

export const Alert = memo(
    forwardRef<HTMLDivElement, AlertProps>(
        ({ children, variant = 'default', icon, title, className }, ref) => (
            <div ref={ref} className={cx('gui-alert', `gui-alert--${variant}`, className)} role="alert">
                {icon && <span className="gui-alert__icon">{icon}</span>}
                <div className="gui-alert__content">
                    {title && <div className="gui-alert__title">{title}</div>}
                    <div className="gui-alert__description">{children}</div>
                </div>
            </div>
        ),
    ),
)
Alert.displayName = 'Alert'

export interface AlertDialogProps {
    open?: boolean
    onClose?: () => void
    title?: string
    description?: string
    children?: ReactNode
    confirmText?: string
    cancelText?: string
    onConfirm?: () => void
    className?: string
}

export const AlertDialog = memo(
    forwardRef<HTMLDivElement, AlertDialogProps>(
        ({ open, onClose, title, description, children, confirmText = 'Confirm', cancelText = 'Cancel', onConfirm, className }, ref) => {
            if (!open) return null
            return (
                <>
                    <div className="gui-overlay" onClick={onClose} />
                    <div ref={ref} className={cx('gui-dialog', className)} role="alertdialog">
                        <div className="gui-dialog__header">
                            {title && <h2 className="gui-dialog__title">{title}</h2>}
                            {description && <p className="gui-dialog__description">{description}</p>}
                        </div>
                        {children}
                        <div className="gui-dialog__footer">
                            <button type="button" className="gui-btn gui-btn--secondary gui-btn--md" onClick={onClose}>{cancelText}</button>
                            <button type="button" className="gui-btn gui-btn--primary gui-btn--md" onClick={onConfirm}>{confirmText}</button>
                        </div>
                    </div>
                </>
            )
        },
    ),
)
AlertDialog.displayName = 'AlertDialog'
