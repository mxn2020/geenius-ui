import { memo, type ReactNode } from 'react'
import { cx } from '../lib/cx'

export interface LoadingProps { children?: ReactNode; className?: string }

export const Loading = memo(({ children, className }: LoadingProps) => (
    <div className={cx('gui-loading', className)}>
        <LoadingSpinner />
        {children}
    </div>
))
Loading.displayName = 'Loading'

export const LoadingSpinner = memo(({ className }: { className?: string }) => (
    <span className={cx('gui-spinner', className)}>
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
            <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path style={{ opacity: 0.75 }} fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
    </span>
))
LoadingSpinner.displayName = 'LoadingSpinner'
