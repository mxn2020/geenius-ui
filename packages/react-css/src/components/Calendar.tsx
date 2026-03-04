import { memo, useState, useCallback, type ReactNode } from 'react'
import { cx } from '../lib/cx'

export interface CalendarProps {
    selected?: Date | null
    onSelect?: (date: Date) => void
    className?: string
    minDate?: Date
    maxDate?: Date
}

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function getDaysInMonth(year: number, month: number) {
    return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfWeek(year: number, month: number) {
    return new Date(year, month, 1).getDay()
}

function isSameDay(a: Date, b: Date) {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

export const Calendar = memo(function Calendar({ selected, onSelect, className, minDate, maxDate }: CalendarProps) {
    const today = new Date()
    const [viewYear, setViewYear] = useState(selected?.getFullYear() ?? today.getFullYear())
    const [viewMonth, setViewMonth] = useState(selected?.getMonth() ?? today.getMonth())

    const daysInMonth = getDaysInMonth(viewYear, viewMonth)
    const firstDay = getFirstDayOfWeek(viewYear, viewMonth)

    const prevMonth = useCallback(() => {
        if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1) }
        else setViewMonth(m => m - 1)
    }, [viewMonth])

    const nextMonth = useCallback(() => {
        if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1) }
        else setViewMonth(m => m + 1)
    }, [viewMonth])

    const isDisabled = (day: number) => {
        const d = new Date(viewYear, viewMonth, day)
        if (minDate && d < minDate) return true
        if (maxDate && d > maxDate) return true
        return false
    }

    const days: (number | null)[] = []
    for (let i = 0; i < firstDay; i++) days.push(null)
    for (let d = 1; d <= daysInMonth; d++) days.push(d)

    return (
        <div className={cx('gui-calendar', className)}>
            <div className="gui-calendar__header">
                <button type="button" className="gui-calendar__nav" onClick={prevMonth} aria-label="Previous month">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
                </button>
                <span className="gui-calendar__title">{MONTHS[viewMonth]} {viewYear}</span>
                <button type="button" className="gui-calendar__nav" onClick={nextMonth} aria-label="Next month">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
                </button>
            </div>
            <div className="gui-calendar__grid">
                {DAYS.map(d => <div key={d} className="gui-calendar__day-label">{d}</div>)}
                {days.map((day, i) => (
                    <div key={i} className="gui-calendar__cell">
                        {day !== null && (
                            <button
                                type="button"
                                disabled={isDisabled(day)}
                                className={cx(
                                    'gui-calendar__day',
                                    selected && isSameDay(new Date(viewYear, viewMonth, day), selected) && 'gui-calendar__day--selected',
                                    isSameDay(new Date(viewYear, viewMonth, day), today) && 'gui-calendar__day--today',
                                )}
                                onClick={() => onSelect?.(new Date(viewYear, viewMonth, day))}
                            >
                                {day}
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
})
