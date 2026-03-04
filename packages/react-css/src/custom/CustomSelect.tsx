import { useState, useRef, useEffect, memo, type ReactNode } from 'react'
import { cx } from '../lib/cx'

export const CustomSelect = memo(function CustomSelect({
    value, onChange, options, label, placeholder, error,
}: {
    value: string
    onChange: (value: string) => void
    options: string[]
    label: string
    placeholder: string
    error?: string
}) {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handler = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) setIsOpen(false)
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [])

    return (
        <div className="gui-custom-select">
            <label className="gui-label gui-label--required">{label}</label>
            <div ref={dropdownRef} className="gui-custom-select__wrapper">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className={cx('gui-custom-select__trigger', isOpen && 'gui-custom-select__trigger--open')}
                >
                    <span className={cx(!value && 'gui-datepicker__placeholder')}>
                        {value || placeholder}
                    </span>
                    <svg className={cx('gui-custom-select__chevron', isOpen && 'gui-custom-select__chevron--open')} width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                {isOpen && (
                    <div className="gui-custom-select__dropdown">
                        {options.map(option => (
                            <button
                                key={option}
                                type="button"
                                onClick={() => { onChange(option); setIsOpen(false) }}
                                className={cx('gui-dropdown-item', value === option && 'gui-dropdown-item--selected')}
                            >
                                <span className={cx('gui-custom-select__dot', value === option && 'gui-custom-select__dot--active')} />
                                {option}
                                {value === option && (
                                    <svg className="gui-custom-select__check" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                            </button>
                        ))}
                    </div>
                )}
            </div>
            {error && <p className="gui-calendar-input__error">{error}</p>}
        </div>
    )
})
