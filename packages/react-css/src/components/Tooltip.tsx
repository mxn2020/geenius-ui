import { memo, useState, useRef, type ReactNode } from 'react'
import { cx } from '../lib/cx'

export interface TooltipProps { content: string; children: ReactNode; className?: string }

export const Tooltip = memo(({ content, children, className }: TooltipProps) => {
    const [visible, setVisible] = useState(false)
    const ref = useRef<HTMLDivElement>(null)
    return (
        <div
            className={cx('gui-tooltip-trigger', className)}
            ref={ref}
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
        >
            {children}
            <div className={cx('gui-tooltip', visible && 'gui-tooltip--visible')} style={{ bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: '0.5rem' }}>
                {content}
            </div>
        </div>
    )
})
Tooltip.displayName = 'Tooltip'
