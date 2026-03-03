import { forwardRef, memo, type ReactNode } from 'react'
import { cx } from '../lib/cx'

export interface ListProps { children: ReactNode; className?: string }
export const List = memo(forwardRef<HTMLUListElement, ListProps>(
    ({ children, className }, ref) => <ul ref={ref} className={cx('gui-list', className)}>{children}</ul>
))
List.displayName = 'List'

export interface ListItemProps { children: ReactNode; className?: string; onClick?: () => void }
export const ListItem = memo(forwardRef<HTMLLIElement, ListItemProps>(
    ({ children, className, onClick }, ref) => (
        <li ref={ref} className={cx('gui-list-item', onClick && 'gui-list-item--clickable', className)} onClick={onClick}>{children}</li>
    ),
))
ListItem.displayName = 'ListItem'

export const ScrollArea = memo(forwardRef<HTMLDivElement, { children: ReactNode; className?: string; style?: React.CSSProperties }>(
    ({ children, className, style }, ref) => <div ref={ref} className={cx('gui-scroll-area', className)} style={style}>{children}</div>
))
ScrollArea.displayName = 'ScrollArea'

export const Breadcrumb = memo(({ items, className }: { items: { label: string; href?: string }[]; className?: string }) => (
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

export interface ViewSwitcherProps { views: { value: string; label: ReactNode }[]; active: string; onChange: (value: string) => void; className?: string }
export const ViewSwitcher = memo(({ views, active, onChange, className }: ViewSwitcherProps) => (
    <div className={cx('gui-view-switcher', className)}>
        {views.map(v => (
            <button key={v.value} type="button" className={cx('gui-view-switcher__btn', active === v.value && 'gui-view-switcher__btn--active')}
                onClick={() => onChange(v.value)}>{v.label}</button>
        ))}
    </div>
))
ViewSwitcher.displayName = 'ViewSwitcher'

export interface EmptyStateProps { icon?: ReactNode; title: string; description?: string; action?: ReactNode; className?: string }
export const EmptyState = memo(({ icon, title, description, action, className }: EmptyStateProps) => (
    <div className={cx('gui-empty-state', className)}>
        {icon && <div className="gui-empty-state__icon">{icon}</div>}
        <h3 className="gui-empty-state__title">{title}</h3>
        {description && <p className="gui-empty-state__description">{description}</p>}
        {action}
    </div>
))
EmptyState.displayName = 'EmptyState'

export interface CostDisplayProps { value: number; currency?: string; className?: string }
export const CostDisplay = memo(({ value, currency = '$', className }: CostDisplayProps) => (
    <span className={cx('gui-cost-display', className)}>
        <span className="gui-cost-display__currency">{currency}</span>
        <span className="gui-cost-display__value">{value.toFixed(2)}</span>
    </span>
))
CostDisplay.displayName = 'CostDisplay'

export interface ResizableProps { children: ReactNode; className?: string; minWidth?: number; minHeight?: number }
export const Resizable = memo(forwardRef<HTMLDivElement, ResizableProps>(
    ({ children, className, minWidth, minHeight }, ref) => (
        <div ref={ref} className={className} style={{ resize: 'both', overflow: 'auto', minWidth, minHeight }}>{children}</div>
    ),
))
Resizable.displayName = 'Resizable'
