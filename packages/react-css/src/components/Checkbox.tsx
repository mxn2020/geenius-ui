import { forwardRef, memo, type InputHTMLAttributes } from 'react'
import { cx } from '../lib/cx'

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    label?: string
}

export const Checkbox = memo(
    forwardRef<HTMLInputElement, CheckboxProps>(
        ({ label, className, id, ...props }, ref) => {
            const checkboxId = id || `gui-checkbox-${Math.random().toString(36).slice(2)}`
            return (
                <div className={cx('gui-checkbox-wrapper', className)}>
                    <input ref={ref} type="checkbox" id={checkboxId} className="gui-checkbox" {...props} />
                    {label && <label htmlFor={checkboxId} className="gui-checkbox-label">{label}</label>}
                </div>
            )
        },
    ),
)
Checkbox.displayName = 'Checkbox'
