import { memo, useState, type ReactNode } from 'react'
import { cx } from '../lib/cx'

export interface CollapsibleProps {
    trigger: ReactNode
    children: ReactNode
    defaultOpen?: boolean
    className?: string
}

export const Collapsible = memo(({ trigger, children, defaultOpen = false, className }: CollapsibleProps) => {
    const [open, setOpen] = useState(defaultOpen)
    return (
        <div className={cx('gui-collapsible', className)}>
            <button type="button" className="gui-collapsible__trigger" onClick={() => setOpen(!open)}>
                {trigger}
                <span className={cx('gui-collapsible__icon', open && 'gui-collapsible__icon--open')}>▼</span>
            </button>
            <div className={cx('gui-collapsible__content', open ? 'gui-collapsible__content--open' : 'gui-collapsible__content--closed')}>
                {children}
            </div>
        </div>
    )
})
Collapsible.displayName = 'Collapsible'
