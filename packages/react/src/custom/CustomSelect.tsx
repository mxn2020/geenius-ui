

import { useState, useRef, useEffect } from 'react'

export function CustomSelect({
  value,
  onChange,
  options,
  label,
  placeholder,
  error,
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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="flex flex-col gap-2">
      <label className="text-text-main text-sm font-semibold tracking-wide">
        {label} <span className="text-primary">*</span>
      </label>
      <div ref={dropdownRef} className="relative">
        {/* Trigger Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full h-14 pl-12 pr-10 rounded-xl border text-left flex items-center transition-all duration-200 ${
            isOpen
              ? 'border-primary ring-2 ring-primary/20 bg-[var(--surface)]'
              : 'border-[var(--border)] bg-[var(--surface)] hover:border-primary/50'
          }`}
        >
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
              />
            </svg>
          </span>
          <span className={value ? 'text-text-main' : 'text-text-muted/70'}>
            {value || placeholder}
          </span>
          <span
            className={`absolute right-4 top-1/2 -translate-y-1/2 text-text-muted transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </span>
        </button>

        {/* Dropdown Options */}
        {isOpen && (
          <div className="absolute z-50 w-full mt-2 py-2 bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow-xl overflow-hidden max-h-60 overflow-y-auto">
            {options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  onChange(option)
                  setIsOpen(false)
                }}
                className={`w-full px-4 py-3 text-left flex items-center gap-3 transition-colors ${
                  value === option
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'hover:bg-[var(--bg-muted)] text-text-main'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${value === option ? 'bg-primary' : 'bg-text-muted/30'}`}
                />
                {option}
                {value === option && (
                  <svg
                    className="w-4 h-4 ml-auto text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
      {error && (
        <p className="text-xs text-warning" role="status" aria-live="polite">
          {error}
        </p>
      )}
    </div>
  )
}
