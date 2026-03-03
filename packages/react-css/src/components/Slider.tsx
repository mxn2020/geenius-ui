import { forwardRef, memo } from 'react'
import { cx } from '../lib/cx'

export interface SliderProps { value?: number; min?: number; max?: number; step?: number; onChange?: (value: number) => void; className?: string; disabled?: boolean }

export const Slider = memo(
    forwardRef<HTMLInputElement, SliderProps>(
        ({ value = 0, min = 0, max = 100, step = 1, onChange, className, disabled }, ref) => (
            <div className={cx('gui-slider-container', className)}>
                <input ref={ref} type="range" className="gui-slider" value={value} min={min} max={max} step={step} disabled={disabled}
                    onChange={e => onChange?.(Number(e.target.value))} />
            </div>
        ),
    ),
)
Slider.displayName = 'Slider'
