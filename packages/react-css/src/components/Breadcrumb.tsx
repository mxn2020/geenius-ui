import { memo, type ReactNode } from 'react'
import { cx } from '../lib/cx'

export interface BreadcrumbProps {
    items: { label: string; href?: string }[]
    className?: string
}

export const Breadcrumb = memo(({ items, className }: BreadcrumbProps) => (
    <nav className={cx('gui-breadcrumb', className)} aria-label="Breadcrumb">
        {items.map((item, i) => (
            <span key={i}>
                {i > 0 && <span className="gui-breadcrumb__separator">/</span>}
                <span className={cx('gui-breadcrumb__item', i === items.length - 1 && 'gui-breadcrumb__item--current')}>
                    {item.href ? <a href={item.href}>{item.label}</a> : item.label}
                </span>
            </span>
        ))}
    </nav>
))
Breadcrumb.displayName = 'Breadcrumb'
