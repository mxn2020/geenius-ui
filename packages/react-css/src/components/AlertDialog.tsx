import { forwardRef, memo, useState, useCallback, useEffect, type ReactNode } from 'react'
import { cx } from '../lib/cx'

export interface AlertDialogProps {
    children: ReactNode
    open?: boolean
    defaultOpen?: boolean
    onOpenChange?: (open: boolean) => void
}

export const AlertDialog = memo(function AlertDialog({ children, open: controlledOpen, defaultOpen = false, onOpenChange }: AlertDialogProps) {
    const [internalOpen, setInternalOpen] = useState(defaultOpen)
    const isControlled = controlledOpen !== undefined
    const open = isControlled ? controlledOpen : internalOpen

    const handleOpenChange = useCallback((newOpen: boolean) => {
        if (!isControlled) setInternalOpen(newOpen)
        onOpenChange?.(newOpen)
    }, [isControlled, onOpenChange])

    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden'
            const onEscape = (e: KeyboardEvent) => { if (e.key === 'Escape') handleOpenChange(false) }
            document.addEventListener('keydown', onEscape)
            return () => { document.removeEventListener('keydown', onEscape); document.body.style.overflow = 'unset' }
        }
    }, [open, handleOpenChange])

    return (
        <>
            {typeof children === 'function' ? (children as any)({ open, onOpenChange: handleOpenChange }) : (
                open && (
                    <>
                        <div className="gui-overlay" onClick={() => handleOpenChange(false)} />
                        <div className={cx('gui-dialog')} role="alertdialog" aria-modal="true">
                            {children}
                        </div>
                    </>
                )
            )}
        </>
    )
})

export const AlertDialogTrigger = memo(forwardRef<HTMLButtonElement, { children: ReactNode; className?: string; onClick?: () => void }>(
    ({ children, className, onClick }, ref) => (
        <button ref={ref} type="button" className={cx(className)} onClick={onClick}>{children}</button>
    )
))
AlertDialogTrigger.displayName = 'AlertDialogTrigger'

export const AlertDialogContent = memo(forwardRef<HTMLDivElement, { children: ReactNode; className?: string }>(
    ({ children, className }, ref) => (
        <div ref={ref} className={cx('gui-dialog', className)} role="alertdialog" aria-modal="true">{children}</div>
    )
))
AlertDialogContent.displayName = 'AlertDialogContent'

export const AlertDialogHeader = memo(forwardRef<HTMLDivElement, { children: ReactNode; className?: string }>(
    ({ children, className }, ref) => <div ref={ref} className={cx('gui-dialog__header', className)}>{children}</div>
))
AlertDialogHeader.displayName = 'AlertDialogHeader'

export const AlertDialogTitle = memo(forwardRef<HTMLHeadingElement, { children: ReactNode; className?: string }>(
    ({ children, className }, ref) => <h2 ref={ref} className={cx('gui-dialog__title', className)}>{children}</h2>
))
AlertDialogTitle.displayName = 'AlertDialogTitle'

export const AlertDialogDescription = memo(forwardRef<HTMLParagraphElement, { children: ReactNode; className?: string }>(
    ({ children, className }, ref) => <p ref={ref} className={cx('gui-dialog__description', className)}>{children}</p>
))
AlertDialogDescription.displayName = 'AlertDialogDescription'

export const AlertDialogFooter = memo(forwardRef<HTMLDivElement, { children: ReactNode; className?: string }>(
    ({ children, className }, ref) => <div ref={ref} className={cx('gui-dialog__footer', className)}>{children}</div>
))
AlertDialogFooter.displayName = 'AlertDialogFooter'

export const AlertDialogAction = memo(forwardRef<HTMLButtonElement, { children: ReactNode; className?: string; onClick?: () => void }>(
    ({ children, className, onClick }, ref) => (
        <button ref={ref} type="button" className={cx('gui-btn gui-btn--primary gui-btn--md', className)} onClick={onClick}>{children}</button>
    )
))
AlertDialogAction.displayName = 'AlertDialogAction'

export const AlertDialogCancel = memo(forwardRef<HTMLButtonElement, { children: ReactNode; className?: string; onClick?: () => void }>(
    ({ children, className, onClick }, ref) => (
        <button ref={ref} type="button" className={cx('gui-btn gui-btn--secondary gui-btn--md', className)} onClick={onClick}>{children}</button>
    )
))
AlertDialogCancel.displayName = 'AlertDialogCancel'
