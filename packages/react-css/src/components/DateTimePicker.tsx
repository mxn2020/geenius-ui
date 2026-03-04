import { memo, useState, useRef, useEffect, useCallback } from 'react'
import { cx } from '../lib/cx'
import { Calendar } from './Calendar'

export interface DateTimePickerProps {
    value?: Date | null
    onChange?: (date: Date | null) => void
    placeholder?: string
    className?: string
    minDate?: Date
    maxDate?: Date
}

export const DateTimePicker = memo(function DateTimePicker({ value, onChange, placeholder = 'Select date & time', className, minDate, maxDate }: DateTimePickerProps) {
    const [open, setOpen] = useState(false)
    const [hours, setHours] = useState(value?.getHours() ?? 12)
    const [minutes, setMinutes] = useState(value?.getMinutes() ?? 0)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [])

    const handleDateSelect = useCallback((date: Date) => {
        const d = new Date(date)
        d.setHours(hours, minutes)
        onChange?.(d)
    }, [hours, minutes, onChange])

    const handleTimeChange = useCallback((h: number, m: number) => {
        setHours(h)
        setMinutes(m)
        if (value) {
            const d = new Date(value)
            d.setHours(h, m)
            onChange?.(d)
        }
    }, [value, onChange])

    const displayValue = value
        ? value.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) + ` ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
        : ''

    return (
        <div ref={ref} className={cx('gui-datepicker', className)}>
            <button type="button" className="gui-datepicker__trigger" onClick={() => setOpen(!open)}>
                <span className={cx(!value && 'gui-datepicker__placeholder')}>
                    {displayValue || placeholder}
                </span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
            </button>
            {open && (
                <div className="gui-datepicker__dropdown">
                    <Calendar selected={value} onSelect={handleDateSelect} minDate={minDate} maxDate={maxDate} />
                    <div className="gui-datepicker__time">
                        <label className="gui-label">Time</label>
                        <div className="gui-datepicker__time-inputs">
                            <input type="number" className="gui-input" min={0} max={23} value={hours} onChange={e => handleTimeChange(Number(e.target.value), minutes)} style={{ width: '4rem' }} />
                            <span>:</span>
                            <input type="number" className="gui-input" min={0} max={59} value={minutes} onChange={e => handleTimeChange(hours, Number(e.target.value))} style={{ width: '4rem' }} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
})
