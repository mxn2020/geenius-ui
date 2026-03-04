import { memo } from 'react'
import { cx } from '../lib/cx'

const MAP_PATH_NAMES: Record<string, string> = {
    admin: 'Admin', member: 'Benutzer', system: 'System', members: 'Benutzer',
    users: 'Benutzer', approvals: 'Freigaben', inventory: 'Inventar', products: 'Produkte',
    add: 'Hinzufügen', orders: 'Bestellungen', dashboard: 'Dashboard',
    memberships: 'Abonnements', rules: 'Regeln', payments: 'Zahlungen', news: 'News', logs: 'Logs',
}

/**
 * Auto-generating breadcrumbs from the current URL pathname.
 * Framework-agnostic — reads `window.location.pathname`.
 */
export const Breadcrumbs = memo(function Breadcrumbs({ pathname, className, homeHref = '/' }: {
    pathname?: string
    className?: string
    homeHref?: string
}) {
    const path = pathname ?? (typeof window !== 'undefined' ? window.location.pathname : '/')
    const segments = path.split('/').filter(Boolean)
    if (segments.length === 0) return null

    const items = segments.map((segment, index) => {
        const isLast = index === segments.length - 1
        const href = `/${segments.slice(0, index + 1).join('/')}`
        const rawLabel = segment.replace(/-/g, ' ')
        const label = MAP_PATH_NAMES[segment] || rawLabel.charAt(0).toUpperCase() + rawLabel.slice(1)
        return { label, href, isLast }
    })

    return (
        <nav aria-label="Breadcrumb" className={cx('gui-breadcrumb', className)}>
            <a href={homeHref} className="gui-breadcrumb__item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
                </svg>
            </a>
            {items.map((item) => (
                <span key={item.href} className="gui-breadcrumb__segment">
                    <span className="gui-breadcrumb__separator">/</span>
                    {item.isLast
                        ? <span className="gui-breadcrumb__item gui-breadcrumb__item--current">{item.label}</span>
                        : <a href={item.href} className="gui-breadcrumb__item">{item.label}</a>
                    }
                </span>
            ))}
        </nav>
    )
})
