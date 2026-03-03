import { memo, useState, useRef, useEffect, type ReactNode } from 'react'
import { cx } from '../lib/cx'

export interface DropdownMenuProps {
    trigger: ReactNode
    children: ReactNode
    className?: string
}

export const DropdownMenu = memo(({ trigger, children, className }: DropdownMenuProps) => {
    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!open) return
        const onClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
        }
        document.addEventListener('mousedown', onClickOutside)
        return () => document.removeEventListener('mousedown', onClickOutside)
    }, [open])

    return (
        <div className={cx('gui-popover-trigger', className)} ref={ref}>
            <div onClick={() => setOpen(!open)}>{trigger}</div>
            {open && <div className="gui-popover" onClick={() => setOpen(false)}>{children}</div>}
        </div>
    )
})
DropdownMenu.displayName = 'DropdownMenu'

export const DropdownMenuItem = memo(
    ({ children, onClick, danger, disabled, className }: {
        children: ReactNode; onClick?: () => void; danger?: boolean; disabled?: boolean; className?: string
    }) => (
        <button
            type="button"
            className={cx('gui-dropdown-item', danger && 'gui-dropdown-item--danger', className)}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    ),
)
DropdownMenuItem.displayName = 'DropdownMenuItem'

export const DropdownMenuSeparator = memo(() => <div className="gui-dropdown-separator" />)
DropdownMenuSeparator.displayName = 'DropdownMenuSeparator'

export const DropdownMenuLabel = memo(({ children }: { children: ReactNode }) => (
    <div className="gui-dropdown-label">{children}</div>
))
DropdownMenuLabel.displayName = 'DropdownMenuLabel'
