import { memo, useState, useRef, useEffect, type ReactNode } from 'react'
import { cx } from '../lib/cx'

export interface PopoverProps { trigger: ReactNode; children: ReactNode; className?: string }

export const Popover = memo(({ trigger, children, className }: PopoverProps) => {
    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (!open) return
        const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [open])
    return (
        <div className={cx('gui-popover-trigger', className)} ref={ref}>
            <div onClick={() => setOpen(!open)}>{trigger}</div>
            {open && <div className="gui-popover" style={{ top: '100%', left: 0, marginTop: '0.25rem' }}>{children}</div>}
        </div>
    )
})
Popover.displayName = 'Popover'
