import { forwardRef, memo, type ReactNode } from 'react'
import { cx } from '../lib/cx'

export interface SwitchProps {
    checked?: boolean
    onChange?: (checked: boolean) => void
    disabled?: boolean
    className?: string
}

export const Switch = memo(
    forwardRef<HTMLButtonElement, SwitchProps>(
        ({ checked = false, onChange, disabled, className }, ref) => (
            <button
                ref={ref}
                type="button"
                role="switch"
                aria-checked={checked}
                disabled={disabled}
                className={cx('gui-switch', checked && 'gui-switch--checked', className)}
                onClick={() => onChange?.(!checked)}
            >
                <span className="gui-switch__thumb" />
            </button>
        ),
    ),
)
Switch.displayName = 'Switch'
