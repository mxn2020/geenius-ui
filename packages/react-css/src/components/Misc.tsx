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

// ListContainer
export const ListContainer = memo(({ children, className }: { children: ReactNode; className?: string }) => (
    <div className={cx('gui-list-container', className)}>{children}</div>
))
ListContainer.displayName = 'ListContainer'

// DataList
export interface DataListProps<T> { data: T[]; renderItem: (item: T, index: number) => ReactNode; keyExtractor?: (item: T, index: number) => string; className?: string; emptyMessage?: string }
export function DataList<T>({ data, renderItem, keyExtractor, className, emptyMessage = 'No items' }: DataListProps<T>) {
    if (data.length === 0) return <div className="gui-empty-state"><p className="gui-empty-state__description">{emptyMessage}</p></div>
    return (
        <List className={className}>
            {data.map((item, i) => <li key={keyExtractor?.(item, i) ?? i}>{renderItem(item, i)}</li>)}
        </List>
    )
}

// CompactListView
export const CompactListView = memo(({ children, className }: { children: ReactNode; className?: string }) => (
    <div className={cx('gui-compact-list', className)}>{children}</div>
))
CompactListView.displayName = 'CompactListView'

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

export interface EmptyStateProps { icon?: ReactNode; title: string; description?: string; action?: ReactNode; secondaryAction?: ReactNode; className?: string; compact?: boolean; bordered?: boolean }
export const EmptyState = memo(({ icon, title, description, action, secondaryAction, className, compact, bordered = true }: EmptyStateProps) => (
    <div className={cx('gui-empty-state', compact && 'gui-empty-state--compact', bordered && 'gui-empty-state--bordered', className)}>
        {icon && <div className="gui-empty-state__icon">{icon}</div>}
        <h3 className="gui-empty-state__title">{title}</h3>
        {description && <p className="gui-empty-state__description">{description}</p>}
        {(action || secondaryAction) && (
            <div className="gui-empty-state__actions">
                {action}
                {secondaryAction}
            </div>
        )}
    </div>
))
EmptyState.displayName = 'EmptyState'

// Specialized Empty States
export const NoSearchResults = memo((props: Omit<EmptyStateProps, 'title'> & { title?: string }) => (
    <EmptyState title="No results found" description="Try adjusting your search or using different keywords." {...props} />
))
NoSearchResults.displayName = 'NoSearchResults'

export const NoFilterResults = memo((props: Omit<EmptyStateProps, 'title'> & { title?: string }) => (
    <EmptyState title="No matches" description="No items match your current filters. Try adjusting or clearing them." {...props} />
))
NoFilterResults.displayName = 'NoFilterResults'

export interface CostDisplayProps { value: number; currency?: string; className?: string }
export const CostDisplay = memo(({ value, currency = '$', className }: CostDisplayProps) => (
    <span className={cx('gui-cost-display', className)}>
        <span className="gui-cost-display__currency">{currency}</span>
        <span className="gui-cost-display__value">{value.toFixed(2)}</span>
    </span>
))
CostDisplay.displayName = 'CostDisplay'

export const SimpleCostDisplay = memo(({ value, currency = '$', className }: CostDisplayProps) => (
    <span className={cx('gui-cost-display gui-cost-display--simple', className)}>{currency}{value.toFixed(2)}</span>
))
SimpleCostDisplay.displayName = 'SimpleCostDisplay'

export interface ResizableProps { children: ReactNode; className?: string; minWidth?: number; minHeight?: number }
export const Resizable = memo(forwardRef<HTMLDivElement, ResizableProps>(
    ({ children, className, minWidth, minHeight }, ref) => (
        <div ref={ref} className={className} style={{ resize: 'both', overflow: 'auto', minWidth, minHeight }}>{children}</div>
    ),
))
Resizable.displayName = 'Resizable'

