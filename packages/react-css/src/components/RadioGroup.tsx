import { forwardRef, memo, type ReactNode } from 'react'
import { cx } from '../lib/cx'

export interface RadioGroupProps { children: ReactNode; className?: string; horizontal?: boolean }

export const RadioGroup = memo(
    forwardRef<HTMLDivElement, RadioGroupProps>(
        ({ children, className, horizontal }, ref) => (
            <div ref={ref} className={cx('gui-radio-group', horizontal && 'gui-radio-group--horizontal', className)} role="radiogroup">
                {children}
            </div>
        ),
    ),
)
RadioGroup.displayName = 'RadioGroup'

export interface RadioProps { label?: string; value: string; name: string; checked?: boolean; onChange?: (value: string) => void; className?: string }

export const Radio = memo(
    forwardRef<HTMLInputElement, RadioProps>(
        ({ label, value, name, checked, onChange, className }, ref) => {
            const id = `gui-radio-${name}-${value}`
            return (
                <label className={cx('gui-radio-item', className)} htmlFor={id}>
                    <input ref={ref} type="radio" id={id} name={name} value={value} checked={checked} className="gui-radio"
                        onChange={() => onChange?.(value)} />
                    {label && <span className="gui-radio-label">{label}</span>}
                </label>
            )
        },
    ),
)
Radio.displayName = 'Radio'
