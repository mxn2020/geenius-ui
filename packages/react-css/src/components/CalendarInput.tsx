import { memo, useState, useRef, useEffect, useCallback } from 'react'
import { cx } from '../lib/cx'
import { Calendar } from './Calendar'

export interface CalendarInputProps {
    value?: Date | null
    onChange?: (date: Date | null) => void
    placeholder?: string
    className?: string
    label?: string
    error?: string
    minDate?: Date
    maxDate?: Date
}

function formatDate(date: Date) {
    return date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })
}

export const CalendarInput = memo(function CalendarInput({ value, onChange, placeholder = 'MM/DD/YYYY', className, label, error, minDate, maxDate }: CalendarInputProps) {
    const [open, setOpen] = useState(false)
    const [inputValue, setInputValue] = useState(value ? formatDate(value) : '')
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (value) setInputValue(formatDate(value))
    }, [value])

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [])

    const handleSelect = useCallback((date: Date) => {
        onChange?.(date)
        setInputValue(formatDate(date))
        setOpen(false)
    }, [onChange])

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
        const parsed = new Date(e.target.value)
        if (!isNaN(parsed.getTime())) {
            onChange?.(parsed)
        }
    }, [onChange])

    return (
        <div ref={ref} className={cx('gui-calendar-input', className)}>
            {label && <label className="gui-label">{label}</label>}
            <div className="gui-calendar-input__wrapper">
                <input
                    type="text"
                    className={cx('gui-input', error && 'gui-input--error')}
                    value={inputValue}
                    onChange={handleInputChange}
                    onFocus={() => setOpen(true)}
                    placeholder={placeholder}
                />
                <button type="button" className="gui-calendar-input__icon" onClick={() => setOpen(!open)} aria-label="Open calendar">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
                </button>
            </div>
            {error && <p className="gui-calendar-input__error">{error}</p>}
            {open && (
                <div className="gui-datepicker__dropdown">
                    <Calendar selected={value} onSelect={handleSelect} minDate={minDate} maxDate={maxDate} />
                </div>
            )}
        </div>
    )
})
