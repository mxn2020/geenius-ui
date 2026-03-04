import { splitProps, createSignal, createEffect, onCleanup, type JSX, type ParentComponent, type Component } from 'solid-js'
import { Show } from 'solid-js/web'
import { cx } from '../lib/cx'
import type { ButtonVariant, ButtonSize } from '../lib/types'

export interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant
    size?: ButtonSize
    loading?: boolean
    icon?: JSX.Element
}

export const Button: ParentComponent<ButtonProps> = (props) => {
    const [local, rest] = splitProps(props, ['variant', 'size', 'loading', 'disabled', 'icon', 'class', 'children', 'onClick'])
    const isDisabled = () => local.disabled || local.loading

    return (
        <button
            disabled={isDisabled()}
            class={cx('gui-btn', `gui-btn--${local.variant || 'primary'}`, `gui-btn--${local.size || 'md'}`, isDisabled() && 'gui-btn--disabled', local.class)}
            onClick={(e) => { if (!isDisabled() && typeof local.onClick === 'function') (local.onClick as any)(e) }}
            {...rest}
        >
            <Show when={local.loading}>
                <svg class="gui-spinner" style={{ "margin-left": "-0.25rem", "margin-right": "0.5rem", height: "1rem", width: "1rem" }} fill="none" viewBox="0 0 24 24">
                    <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                    <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
            </Show>
            <Show when={!local.loading && !!local.icon}>
                <span class={cx('gui-btn__icon', !!local.children && 'gui-btn__icon--with-text')}>{local.icon}</span>
            </Show>
            <Show when={!!local.children}><span class="gui-btn__text">{local.children}</span></Show>
        </button>
    )
}

export const Card: ParentComponent<{ class?: string; padding?: 'none' | 'sm' | 'md' | 'lg'; shadow?: 'none' | 'sm' | 'md' | 'lg'; hover?: boolean; onClick?: () => void }> = (props) => (
    <div class={cx('gui-card', props.shadow !== 'none' && `gui-card--shadow-${props.shadow || 'sm'}`, (props.hover || !!props.onClick) && 'gui-card--hover', props.padding !== 'none' && props.padding && `gui-card--pad-${props.padding}`, props.class)} onClick={props.onClick}>
        {props.children}
    </div>
)
export const CardHeader: ParentComponent<{ class?: string }> = (p) => <div class={cx('gui-card-header', p.class)}>{p.children}</div>
export const CardTitle: ParentComponent<{ class?: string }> = (p) => <h3 class={cx('gui-card-title', p.class)}>{p.children}</h3>
export const CardDescription: ParentComponent<{ class?: string }> = (p) => <p class={cx('gui-card-description', p.class)}>{p.children}</p>
export const CardContent: ParentComponent<{ class?: string }> = (p) => <div class={cx('gui-card-content', p.class)}>{p.children}</div>
export const CardFooter: ParentComponent<{ class?: string }> = (p) => <div class={cx('gui-card-footer', p.class)}>{p.children}</div>

export const Input: Component<JSX.InputHTMLAttributes<HTMLInputElement> & { error?: boolean; inputSize?: 'sm' | 'md' | 'lg' }> = (props) => {
    const [local, rest] = splitProps(props, ['class', 'error', 'inputSize'])
    return <input class={cx('gui-input', local.inputSize && local.inputSize !== 'md' && `gui-input--${local.inputSize}`, local.error && 'gui-input--error', local.class)} {...rest} />
}

export const Textarea: Component<JSX.TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: boolean }> = (props) => {
    const [local, rest] = splitProps(props, ['class', 'error'])
    return <textarea class={cx('gui-textarea', local.error && 'gui-textarea--error', local.class)} {...rest} />
}

export const Label: Component<JSX.LabelHTMLAttributes<HTMLLabelElement> & { required?: boolean }> = (props) => {
    const [local, rest] = splitProps(props, ['class', 'required'])
    return <label class={cx('gui-label', local.required && 'gui-label--required', local.class)} {...rest} />
}

export const Badge: ParentComponent<{ variant?: string; size?: 'sm' | 'md' | 'lg'; class?: string }> = (p) => (
    <span class={cx('gui-badge', `gui-badge--${p.variant || 'default'}`, p.size !== 'md' && p.size && `gui-badge--${p.size}`, p.class)}>{p.children}</span>
)

export const Chip: ParentComponent<{ active?: boolean; removable?: boolean; onClick?: () => void; onRemove?: () => void; class?: string }> = (p) => (
    <span class={cx('gui-chip', p.active && 'gui-chip--active', p.onClick && 'gui-chip--clickable', p.class)} onClick={p.onClick}>
        {p.children}
        <Show when={p.removable}>
            <button type="button" class="gui-chip__remove" onClick={(e) => { e.stopPropagation(); p.onRemove?.() }} aria-label="Remove">×</button>
        </Show>
    </span>
)

export const Alert: ParentComponent<{ variant?: string; icon?: JSX.Element; title?: string; class?: string }> = (p) => (
    <div class={cx('gui-alert', `gui-alert--${p.variant || 'default'}`, p.class)} role="alert">
        <Show when={p.icon}><span class="gui-alert__icon">{p.icon}</span></Show>
        <div class="gui-alert__content">
            <Show when={p.title}><div class="gui-alert__title">{p.title}</div></Show>
            <div class="gui-alert__description">{p.children}</div>
        </div>
    </div>
)

export const Avatar: Component<{ src?: string; alt?: string; fallback?: JSX.Element; size?: 'sm' | 'md' | 'lg' | 'xl'; class?: string }> = (p) => (
    <div class={cx('gui-avatar', `gui-avatar--${p.size || 'md'}`, p.class)}>
        <Show when={p.src} fallback={<span class="gui-avatar__fallback">{p.fallback}</span>}>
            <img class="gui-avatar__image" src={p.src} alt={p.alt || ''} />
        </Show>
    </div>
)

export const Skeleton: Component<{ width?: string; height?: string; circular?: boolean; class?: string }> = (p) => (
    <div class={cx('gui-skeleton', p.circular && 'gui-skeleton--circular', p.class)} style={{ width: p.width, height: p.height }} />
)

export const Progress: Component<{ value: number; max?: number; class?: string }> = (p) => (
    <div class={cx('gui-progress', p.class)} role="progressbar" aria-valuenow={p.value} aria-valuemin={0} aria-valuemax={p.max || 100}>
        <div class="gui-progress__bar" style={{ width: `${Math.min(100, (p.value / (p.max || 100)) * 100)}%` }} />
    </div>
)

export const Separator: Component<{ orientation?: 'horizontal' | 'vertical'; class?: string }> = (p) => (
    <div class={cx('gui-separator', `gui-separator--${p.orientation || 'horizontal'}`, p.class)} role="separator" />
)

export const Switch: Component<{ checked?: boolean; onChange?: (checked: boolean) => void; disabled?: boolean; class?: string }> = (p) => (
    <button type="button" role="switch" aria-checked={p.checked} disabled={p.disabled}
        class={cx('gui-switch', p.checked && 'gui-switch--checked', p.class)} onClick={() => p.onChange?.(!p.checked)}>
        <span class="gui-switch__thumb" />
    </button>
)

export const Checkbox: Component<JSX.InputHTMLAttributes<HTMLInputElement> & { label?: string }> = (props) => {
    const [local, rest] = splitProps(props, ['class', 'label', 'id'])
    const checkboxId = local.id || `gui-checkbox-${Math.random().toString(36).slice(2)}`
    return (
        <div class={cx('gui-checkbox-wrapper', local.class)}>
            <input type="checkbox" id={checkboxId} class="gui-checkbox" {...rest} />
            <Show when={local.label}><label for={checkboxId} class="gui-checkbox-label">{local.label}</label></Show>
        </div>
    )
}

export const Select: ParentComponent<JSX.SelectHTMLAttributes<HTMLSelectElement> & { error?: boolean }> = (props) => {
    const [local, rest] = splitProps(props, ['class', 'error', 'children'])
    return <select class={cx('gui-select', local.error && 'gui-select--error', local.class)} {...rest}>{local.children}</select>
}

export const LoadingSpinner: Component<{ class?: string }> = (p) => (
    <span class={cx('gui-spinner', p.class)}>
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
            <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
            <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
    </span>
)

export const Loading: ParentComponent<{ class?: string }> = (p) => (
    <div class={cx('gui-loading', p.class)}><LoadingSpinner />{p.children}</div>
)

export const Section: ParentComponent<{ title?: string; description?: string; action?: JSX.Element; class?: string }> = (p) => (
    <section class={cx('gui-section', p.class)}>
        <Show when={p.title || p.action}>
            <div class="gui-section__header">
                <div>
                    <Show when={p.title}><h2 class="gui-section__title">{p.title}</h2></Show>
                    <Show when={p.description}><p class="gui-section__description">{p.description}</p></Show>
                </div>
                {p.action}
            </div>
        </Show>
        {p.children}
    </section>
)

export const Table: ParentComponent<{ class?: string; containerClass?: string }> = (p) => (
    <div class={cx('gui-table-container', p.containerClass)}>
        <table class={cx('gui-table', p.class)}>{p.children}</table>
    </div>
)

export const EmptyState: Component<{ icon?: JSX.Element; title: string; description?: string; action?: JSX.Element; class?: string }> = (p) => (
    <div class={cx('gui-empty-state', p.class)}>
        <Show when={p.icon}><div class="gui-empty-state__icon">{p.icon}</div></Show>
        <h3 class="gui-empty-state__title">{p.title}</h3>
        <Show when={p.description}><p class="gui-empty-state__description">{p.description}</p></Show>
        {p.action}
    </div>
)

export const CostDisplay: Component<{ value: number; currency?: string; class?: string }> = (p) => (
    <span class={cx('gui-cost-display', p.class)}>
        <span class="gui-cost-display__currency">{p.currency || '$'}</span>
        <span class="gui-cost-display__value">{p.value.toFixed(2)}</span>
    </span>
)

export const ScrollArea: ParentComponent<{ class?: string; style?: JSX.CSSProperties }> = (p) => (
    <div class={cx('gui-scroll-area', p.class)} style={p.style}>{p.children}</div>
)

export const List: ParentComponent<{ class?: string }> = (p) => <ul class={cx('gui-list', p.class)}>{p.children}</ul>
export const ListItem: ParentComponent<{ class?: string; onClick?: () => void }> = (p) => (
    <li class={cx('gui-list-item', p.onClick && 'gui-list-item--clickable', p.class)} onClick={p.onClick}>{p.children}</li>
)

export const ViewSwitcher: Component<{ views: { value: string; label: JSX.Element }[]; active: string; onChange: (v: string) => void; class?: string }> = (p) => (
    <div class={cx('gui-view-switcher', p.class)}>
        {p.views.map(v => (
            <button type="button" class={cx('gui-view-switcher__btn', p.active === v.value && 'gui-view-switcher__btn--active')} onClick={() => p.onChange(v.value)}>{v.label}</button>
        ))}
    </div>
)

// Table sub-components
export const TableHeader: ParentComponent<{ class?: string }> = (p) => <thead class={cx('gui-table__header', p.class)}>{p.children}</thead>
export const TableBody: ParentComponent<{ class?: string }> = (p) => <tbody class={cx('gui-table__body', p.class)}>{p.children}</tbody>
export const TableRow: ParentComponent<{ class?: string }> = (p) => <tr class={cx('gui-table__row', p.class)}>{p.children}</tr>
export const TableHead: ParentComponent<{ class?: string }> = (p) => <th class={cx('gui-table__head', p.class)}>{p.children}</th>
export const TableCell: ParentComponent<{ class?: string }> = (p) => <td class={cx('gui-table__cell', p.class)}>{p.children}</td>

// ================================================================
// Interactive / Compound components
// ================================================================

// Dialog
export const Dialog: ParentComponent<{ open?: boolean; onClose?: () => void; class?: string }> = (p) => (
    <Show when={p.open}>
        <div class="gui-overlay" onClick={p.onClose} />
        <div class={cx('gui-dialog', p.class)} role="dialog" aria-modal="true">{p.children}</div>
    </Show>
)
export const DialogHeader: ParentComponent<{ class?: string }> = (p) => <div class={cx('gui-dialog__header', p.class)}>{p.children}</div>
export const DialogTitle: ParentComponent<{ class?: string }> = (p) => <h2 class={cx('gui-dialog__title', p.class)}>{p.children}</h2>
export const DialogDescription: ParentComponent<{ class?: string }> = (p) => <p class={cx('gui-dialog__description', p.class)}>{p.children}</p>
export const DialogFooter: ParentComponent<{ class?: string }> = (p) => <div class={cx('gui-dialog__footer', p.class)}>{p.children}</div>

// Modal (wrapper around Dialog)
export const Modal: ParentComponent<{ open?: boolean; onClose?: () => void; title?: string; class?: string }> = (p) => (
    <Dialog open={p.open} onClose={p.onClose} class={p.class}>
        <Show when={p.title}><DialogHeader><DialogTitle>{p.title}</DialogTitle></DialogHeader></Show>
        {p.children}
    </Dialog>
)

// Sheet
export const Sheet: ParentComponent<{ open?: boolean; onClose?: () => void; side?: 'left' | 'right' | 'top' | 'bottom'; class?: string }> = (p) => (
    <Show when={p.open}>
        <div class="gui-overlay" onClick={p.onClose} />
        <div class={cx('gui-sheet', `gui-sheet--${p.side || 'right'}`, p.class)} role="dialog" aria-modal="true">{p.children}</div>
    </Show>
)
export const SheetHeader: ParentComponent<{ class?: string }> = (p) => <div class={cx('gui-dialog__header', p.class)}>{p.children}</div>
export const SheetTitle: ParentComponent<{ class?: string }> = (p) => <h2 class={cx('gui-dialog__title', p.class)}>{p.children}</h2>
export const SheetDescription: ParentComponent<{ class?: string }> = (p) => <p class={cx('gui-dialog__description', p.class)}>{p.children}</p>
export const SheetFooter: ParentComponent<{ class?: string }> = (p) => <div class={cx('gui-dialog__footer', p.class)}>{p.children}</div>
export const SheetClose: ParentComponent<{ class?: string; onClick?: () => void }> = (p) => (
    <button type="button" class={cx('gui-sheet__close', p.class)} onClick={p.onClick}>{p.children || '×'}</button>
)

// Tabs
export const Tabs: Component<{ tabs: { value: string; label: JSX.Element; content: JSX.Element }[]; active: string; onChange: (v: string) => void; class?: string }> = (p) => (
    <div class={cx('gui-tabs', p.class)}>
        <div class="gui-tabs__list" role="tablist">
            {p.tabs.map(t => (
                <button type="button" role="tab" aria-selected={p.active === t.value}
                    class={cx('gui-tabs__trigger', p.active === t.value && 'gui-tabs__trigger--active')}
                    onClick={() => p.onChange(t.value)}>{t.label}</button>
            ))}
        </div>
        <div class="gui-tabs__content" role="tabpanel">
            {p.tabs.find(t => t.value === p.active)?.content}
        </div>
    </div>
)

// Collapsible
export const Collapsible: ParentComponent<{ open?: boolean; onToggle?: () => void; trigger: JSX.Element; class?: string }> = (p) => (
    <div class={cx('gui-collapsible', p.class)}>
        <button type="button" class="gui-collapsible__trigger" onClick={p.onToggle}>{p.trigger}</button>
        <Show when={p.open}>
            <div class="gui-collapsible__content">{p.children}</div>
        </Show>
    </div>
)

// DropdownMenu
export const DropdownMenu: ParentComponent<{ open?: boolean; onClose?: () => void; trigger: JSX.Element; class?: string }> = (p) => (
    <div class={cx('gui-dropdown', p.class)}>
        {p.trigger}
        <Show when={p.open}>
            <div class="gui-dropdown__menu">{p.children}</div>
        </Show>
    </div>
)
export const DropdownMenuItem: ParentComponent<{ onClick?: () => void; class?: string; disabled?: boolean }> = (p) => (
    <button type="button" class={cx('gui-dropdown-item', p.disabled && 'gui-dropdown-item--disabled', p.class)} disabled={p.disabled} onClick={p.onClick}>{p.children}</button>
)
export const DropdownMenuSeparator: Component<{ class?: string }> = (p) => <div class={cx('gui-separator gui-separator--horizontal', p.class)} />
export const DropdownMenuLabel: ParentComponent<{ class?: string }> = (p) => <div class={cx('gui-dropdown-label', p.class)}>{p.children}</div>

// Popover
export const Popover: ParentComponent<{ open?: boolean; onClose?: () => void; trigger: JSX.Element; class?: string }> = (p) => (
    <div class={cx('gui-popover-wrapper', p.class)}>
        {p.trigger}
        <Show when={p.open}>
            <div class="gui-popover">{p.children}</div>
        </Show>
    </div>
)

// Toggle
export const Toggle: Component<{ pressed?: boolean; onPressedChange?: (v: boolean) => void; disabled?: boolean; size?: 'sm' | 'md' | 'lg'; class?: string; children?: JSX.Element }> = (p) => (
    <button type="button" role="button" aria-pressed={p.pressed} disabled={p.disabled}
        class={cx('gui-toggle', p.pressed && 'gui-toggle--pressed', p.size && p.size !== 'md' && `gui-toggle--${p.size}`, p.disabled && 'gui-toggle--disabled', p.class)}
        onClick={() => !p.disabled && p.onPressedChange?.(!p.pressed)}>{p.children}</button>
)

// ToggleGroup
export const ToggleGroup: Component<{ options: { value: string; label: JSX.Element }[]; value: string | string[]; onChange: (v: string) => void; class?: string }> = (p) => (
    <div class={cx('gui-toggle-group', p.class)} role="group">
        {p.options.map(o => (
            <button type="button" aria-pressed={Array.isArray(p.value) ? p.value.includes(o.value) : p.value === o.value}
                class={cx('gui-toggle', (Array.isArray(p.value) ? p.value.includes(o.value) : p.value === o.value) && 'gui-toggle--pressed')}
                onClick={() => p.onChange(o.value)}>{o.label}</button>
        ))}
    </div>
)

// AlertDialog
export const AlertDialog: ParentComponent<{ open?: boolean; onClose?: () => void; class?: string }> = (p) => (
    <Show when={p.open}>
        <div class="gui-overlay" />
        <div class={cx('gui-dialog', p.class)} role="alertdialog" aria-modal="true">{p.children}</div>
    </Show>
)
export const AlertDialogHeader: ParentComponent<{ class?: string }> = (p) => <div class={cx('gui-dialog__header', p.class)}>{p.children}</div>
export const AlertDialogTitle: ParentComponent<{ class?: string }> = (p) => <h2 class={cx('gui-dialog__title', p.class)}>{p.children}</h2>
export const AlertDialogDescription: ParentComponent<{ class?: string }> = (p) => <p class={cx('gui-dialog__description', p.class)}>{p.children}</p>
export const AlertDialogFooter: ParentComponent<{ class?: string }> = (p) => <div class={cx('gui-dialog__footer', p.class)}>{p.children}</div>
export const AlertDialogAction: ParentComponent<{ onClick?: () => void; class?: string }> = (p) => (
    <button type="button" class={cx('gui-btn gui-btn--primary gui-btn--md', p.class)} onClick={p.onClick}>{p.children}</button>
)
export const AlertDialogCancel: ParentComponent<{ onClick?: () => void; class?: string }> = (p) => (
    <button type="button" class={cx('gui-btn gui-btn--secondary gui-btn--md', p.class)} onClick={p.onClick}>{p.children}</button>
)

// RadioGroup
export const RadioGroup: ParentComponent<{ value?: string; onChange?: (v: string) => void; class?: string }> = (p) => (
    <div class={cx('gui-radio-group', p.class)} role="radiogroup">{p.children}</div>
)
export const Radio: Component<{ value: string; label?: string; checked?: boolean; onChange?: (v: string) => void; disabled?: boolean; class?: string }> = (p) => {
    const id = `gui-radio-${Math.random().toString(36).slice(2)}`
    return (
        <div class={cx('gui-radio', p.disabled && 'gui-radio--disabled', p.class)}>
            <input type="radio" id={id} class="gui-radio__input" value={p.value} checked={p.checked} disabled={p.disabled} onChange={() => p.onChange?.(p.value)} />
            <Show when={p.label}><label for={id} class="gui-radio__label">{p.label}</label></Show>
        </div>
    )
}

// Slider
export const Slider: Component<{ value?: number; min?: number; max?: number; step?: number; onChange?: (v: number) => void; class?: string }> = (p) => (
    <input type="range" class={cx('gui-slider', p.class)} value={p.value ?? 50} min={p.min ?? 0} max={p.max ?? 100} step={p.step ?? 1}
        onInput={(e) => p.onChange?.(Number(e.currentTarget.value))} />
)

// Tooltip
export const Tooltip: ParentComponent<{ text: string; class?: string }> = (p) => (
    <span class={cx('gui-tooltip-wrapper', p.class)}>
        {p.children}
        <span class="gui-tooltip" role="tooltip">{p.text}</span>
    </span>
)

// Breadcrumb
export const Breadcrumb: Component<{ items: { label: string; href?: string }[]; class?: string }> = (p) => (
    <nav class={cx('gui-breadcrumb', p.class)} aria-label="Breadcrumb">
        {p.items.map((item, i) => (
            <span>
                {i > 0 && <span class="gui-breadcrumb__separator">/</span>}
                <span class={cx('gui-breadcrumb__item', i === p.items.length - 1 && 'gui-breadcrumb__item--current')}>
                    {item.href ? <a href={item.href}>{item.label}</a> : item.label}
                </span>
            </span>
        ))}
    </nav>
)

// Resizable
export const Resizable: ParentComponent<{ class?: string; minWidth?: number; minHeight?: number }> = (p) => (
    <div class={p.class} style={{ resize: 'both', overflow: 'auto', 'min-width': p.minWidth ? `${p.minWidth}px` : undefined, 'min-height': p.minHeight ? `${p.minHeight}px` : undefined }}>
        {p.children}
    </div>
)

// ================================================================
// Calendar / Date components
// ================================================================

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function isSameDay(a: Date, b: Date) { return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate() }

export const Calendar: Component<{ selected?: Date | null; onSelect?: (d: Date) => void; class?: string }> = (p) => {
    const today = new Date()
    const [viewYear, setViewYear] = createSignal(p.selected?.getFullYear() ?? today.getFullYear())
    const [viewMonth, setViewMonth] = createSignal(p.selected?.getMonth() ?? today.getMonth())

    const daysInMonth = () => new Date(viewYear(), viewMonth() + 1, 0).getDate()
    const firstDay = () => new Date(viewYear(), viewMonth(), 1).getDay()

    const prevMonth = () => { if (viewMonth() === 0) { setViewMonth(11); setViewYear(y => y - 1) } else setViewMonth(m => m - 1) }
    const nextMonth = () => { if (viewMonth() === 11) { setViewMonth(0); setViewYear(y => y + 1) } else setViewMonth(m => m + 1) }

    const days = () => {
        const result: (number | null)[] = []
        for (let i = 0; i < firstDay(); i++) result.push(null)
        for (let d = 1; d <= daysInMonth(); d++) result.push(d)
        return result
    }

    return (
        <div class={cx('gui-calendar', p.class)}>
            <div class="gui-calendar__header">
                <button type="button" class="gui-calendar__nav" onClick={prevMonth}>‹</button>
                <span class="gui-calendar__title">{MONTHS[viewMonth()]} {viewYear()}</span>
                <button type="button" class="gui-calendar__nav" onClick={nextMonth}>›</button>
            </div>
            <div class="gui-calendar__grid">
                {DAYS.map(d => <div class="gui-calendar__day-label">{d}</div>)}
                {days().map(day => (
                    <div class="gui-calendar__cell">
                        <Show when={day !== null}>
                            <button type="button"
                                class={cx('gui-calendar__day',
                                    p.selected && isSameDay(new Date(viewYear(), viewMonth(), day!), p.selected) && 'gui-calendar__day--selected',
                                    isSameDay(new Date(viewYear(), viewMonth(), day!), today) && 'gui-calendar__day--today',
                                )}
                                onClick={() => p.onSelect?.(new Date(viewYear(), viewMonth(), day!))}>{day}</button>
                        </Show>
                    </div>
                ))}
            </div>
        </div>
    )
}

export const DatePicker: Component<{ value?: Date | null; onChange?: (d: Date) => void; placeholder?: string; class?: string }> = (p) => {
    const [open, setOpen] = createSignal(false)
    const fmt = (d: Date) => d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    return (
        <div class={cx('gui-datepicker', p.class)}>
            <button type="button" class="gui-datepicker__trigger" onClick={() => setOpen(!open())}>
                <span class={cx(!p.value && 'gui-datepicker__placeholder')}>{p.value ? fmt(p.value) : (p.placeholder || 'Select date')}</span>
            </button>
            <Show when={open()}>
                <div class="gui-datepicker__dropdown">
                    <Calendar selected={p.value} onSelect={(d) => { p.onChange?.(d); setOpen(false) }} />
                </div>
            </Show>
        </div>
    )
}

export const DateTimePicker: Component<{ value?: Date | null; onChange?: (d: Date) => void; placeholder?: string; class?: string }> = (p) => {
    const [open, setOpen] = createSignal(false)
    const [hours, setHours] = createSignal(p.value?.getHours() ?? 12)
    const [minutes, setMinutes] = createSignal(p.value?.getMinutes() ?? 0)
    const fmt = (d: Date) => d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) + ` ${String(hours()).padStart(2, '0')}:${String(minutes()).padStart(2, '0')}`
    return (
        <div class={cx('gui-datepicker', p.class)}>
            <button type="button" class="gui-datepicker__trigger" onClick={() => setOpen(!open())}>
                <span class={cx(!p.value && 'gui-datepicker__placeholder')}>{p.value ? fmt(p.value) : (p.placeholder || 'Select date & time')}</span>
            </button>
            <Show when={open()}>
                <div class="gui-datepicker__dropdown">
                    <Calendar selected={p.value} onSelect={(d) => { d.setHours(hours(), minutes()); p.onChange?.(d) }} />
                    <div class="gui-datepicker__time">
                        <label class="gui-label">Time</label>
                        <div class="gui-datepicker__time-inputs">
                            <input type="number" class="gui-input" min="0" max="23" value={hours()} onInput={(e) => setHours(Number(e.currentTarget.value))} style={{ width: '4rem' }} />
                            <span>:</span>
                            <input type="number" class="gui-input" min="0" max="59" value={minutes()} onInput={(e) => setMinutes(Number(e.currentTarget.value))} style={{ width: '4rem' }} />
                        </div>
                    </div>
                </div>
            </Show>
        </div>
    )
}

export const CalendarInput: Component<{ value?: Date | null; onChange?: (d: Date) => void; placeholder?: string; label?: string; error?: string; class?: string }> = (p) => {
    const [open, setOpen] = createSignal(false)
    const fmt = (d: Date) => d.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })
    return (
        <div class={cx('gui-calendar-input', p.class)}>
            <Show when={p.label}><label class="gui-label">{p.label}</label></Show>
            <div class="gui-calendar-input__wrapper">
                <input type="text" class={cx('gui-input', p.error && 'gui-input--error')} value={p.value ? fmt(p.value) : ''} onFocus={() => setOpen(true)} placeholder={p.placeholder || 'MM/DD/YYYY'} readOnly />
                <button type="button" class="gui-calendar-input__icon" onClick={() => setOpen(!open())} aria-label="Open calendar">📅</button>
            </div>
            <Show when={p.error}><p class="gui-calendar-input__error">{p.error}</p></Show>
            <Show when={open()}>
                <div class="gui-datepicker__dropdown">
                    <Calendar selected={p.value} onSelect={(d) => { p.onChange?.(d); setOpen(false) }} />
                </div>
            </Show>
        </div>
    )
}

// ================================================================
// Animation components
// ================================================================

export const AnimateIn: ParentComponent<{ class?: string; delay?: number }> = (p) => (
    <div class={cx('gui-animate-in', p.class)} style={p.delay && p.delay > 0 ? { 'animation-delay': `${p.delay}ms` } : undefined}>
        {p.children}
    </div>
)

export const AnimatePresence: ParentComponent<{ show: boolean; animation?: string; duration?: number; class?: string }> = (p) => {
    const [shouldRender, setShouldRender] = createSignal(p.show)
    const [isAnimating, setIsAnimating] = createSignal(false)

    createEffect(() => {
        if (p.show) {
            setShouldRender(true)
            requestAnimationFrame(() => setIsAnimating(true))
        } else {
            setIsAnimating(false)
            const timer = setTimeout(() => setShouldRender(false), p.duration ?? 200)
            onCleanup(() => clearTimeout(timer))
        }
    })

    return (
        <Show when={shouldRender()}>
            <div
                class={cx('gui-animate-presence', `gui-animate-presence--${p.animation || 'fade'}`, isAnimating() && p.show ? 'gui-animate-presence--enter' : 'gui-animate-presence--exit', p.class)}
                style={{ 'transition-duration': `${p.duration ?? 200}ms`, 'transition-timing-function': 'cubic-bezier(0.16, 1, 0.3, 1)' }}
            >{p.children}</div>
        </Show>
    )
}

