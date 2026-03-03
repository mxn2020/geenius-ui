import { forwardRef, memo } from 'react'
import type { LabelHTMLAttributes, ElementRef } from 'react'
import { cx } from '../lib/cx'

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
    required?: boolean
}

export const Label = memo(
    forwardRef<ElementRef<'label'>, LabelProps>(
        ({ className, required, ...props }, ref) => (
            <label
                ref={ref}
                className={cx('gui-label', required && 'gui-label--required', className)}
                {...props}
            />
        ),
    ),
)
Label.displayName = 'Label'
