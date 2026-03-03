import { forwardRef, memo } from 'react'
import type { TextareaHTMLAttributes, ElementRef } from 'react'
import { cx } from '../lib/cx'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    error?: boolean
}

export const Textarea = memo(
    forwardRef<ElementRef<'textarea'>, TextareaProps>(
        ({ className, error, ...props }, ref) => (
            <textarea
                ref={ref}
                className={cx('gui-textarea', error && 'gui-textarea--error', className)}
                {...props}
            />
        ),
    ),
)
Textarea.displayName = 'Textarea'
