import { splitProps, type JSX, type ParentComponent, type Component } from 'solid-js'
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
