import { forwardRef, memo } from 'react'
import type { InputHTMLAttributes, ElementRef } from 'react'
import { cx } from '../lib/cx'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: boolean
    inputSize?: 'sm' | 'md' | 'lg'
}

export const Input = memo(
    forwardRef<ElementRef<'input'>, InputProps>(
        ({ className, error, inputSize = 'md', ...props }, ref) => (
            <input
                ref={ref}
                className={cx(
                    'gui-input',
                    inputSize !== 'md' && `gui-input--${inputSize}`,
                    error && 'gui-input--error',
                    className,
                )}
                {...props}
            />
        ),
    ),
)
Input.displayName = 'Input'
