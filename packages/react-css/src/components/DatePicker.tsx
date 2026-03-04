import { memo, useState, useRef, useEffect, useCallback } from 'react'
import { cx } from '../lib/cx'
import { Calendar, type CalendarProps } from './Calendar'

export interface DatePickerProps extends Omit<CalendarProps, 'className'> {
    value?: Date | null
    onChange?: (date: Date | null) => void
    placeholder?: string
    className?: string
    format?: (date: Date) => string
}

function defaultFormat(date: Date) {
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

export const DatePicker = memo(function DatePicker({ value, onChange, placeholder = 'Select date', className, format = defaultFormat, minDate, maxDate }: DatePickerProps) {
    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [])

    const handleSelect = useCallback((date: Date) => {
        onChange?.(date)
        setOpen(false)
    }, [onChange])

    return (
        <div ref={ref} className={cx('gui-datepicker', className)}>
            <button type="button" className="gui-datepicker__trigger" onClick={() => setOpen(!open)}>
                <span className={cx(!value && 'gui-datepicker__placeholder')}>
                    {value ? format(value) : placeholder}
                </span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
            </button>
            {open && (
                <div className="gui-datepicker__dropdown">
                    <Calendar selected={value} onSelect={handleSelect} minDate={minDate} maxDate={maxDate} />
                </div>
            )}
        </div>
    )
})
