import { forwardRef, memo, type ReactNode } from 'react'
import { cx } from '../lib/cx'

export interface ToggleProps { pressed?: boolean; onPressedChange?: (pressed: boolean) => void; children: ReactNode; className?: string; disabled?: boolean }

export const Toggle = memo(
    forwardRef<HTMLButtonElement, ToggleProps>(
        ({ pressed = false, onPressedChange, children, className, disabled }, ref) => (
            <button ref={ref} type="button" role="switch" aria-pressed={pressed} disabled={disabled}
                className={cx('gui-toggle', pressed && 'gui-toggle--active', className)}
                onClick={() => onPressedChange?.(!pressed)}
            >{children}</button>
        ),
    ),
)
Toggle.displayName = 'Toggle'

export interface ToggleGroupProps { value?: string; onValueChange?: (value: string) => void; children: ReactNode; className?: string }

export const ToggleGroup = memo(({ className, children }: ToggleGroupProps) => (
    <div className={cx('gui-toggle-group', className)} role="group">{children}</div>
))
ToggleGroup.displayName = 'ToggleGroup'
