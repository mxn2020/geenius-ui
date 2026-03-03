import { forwardRef, memo, type SelectHTMLAttributes } from 'react'
import { cx } from '../lib/cx'

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    error?: boolean
}

export const Select = memo(
    forwardRef<HTMLSelectElement, SelectProps>(
        ({ className, error, children, ...props }, ref) => (
            <select ref={ref} className={cx('gui-select', error && 'gui-select--error', className)} {...props}>
                {children}
            </select>
        ),
    ),
)
Select.displayName = 'Select'

export const SelectItem = memo(
    forwardRef<HTMLOptionElement, React.OptionHTMLAttributes<HTMLOptionElement>>(
        (props, ref) => <option ref={ref} {...props} />,
    ),
)
SelectItem.displayName = 'SelectItem'
