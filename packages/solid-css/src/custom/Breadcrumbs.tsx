
import { type Component, For, Show } from 'solid-js'
import { cx } from '../lib/cx'

const MAP_PATH_NAMES: Record<string, string> = {
    admin: 'Admin', member: 'Benutzer', system: 'System', members: 'Benutzer',
    users: 'Benutzer', approvals: 'Freigaben', inventory: 'Inventar', products: 'Produkte',
    add: 'Hinzufügen', orders: 'Bestellungen', dashboard: 'Dashboard',
    memberships: 'Abonnements', rules: 'Regeln', payments: 'Zahlungen', news: 'News', logs: 'Logs',
}

export const Breadcrumbs: Component<{ pathname?: string; class?: string; homeHref?: string }> = (p) => {
    const path = () => p.pathname ?? (typeof window !== 'undefined' ? window.location.pathname : '/')
    const segments = () => path().split('/').filter(Boolean)

    const items = () => segments().map((segment, index) => {
        const isLast = index === segments().length - 1
        const href = `/${segments().slice(0, index + 1).join('/')}`
        const rawLabel = segment.replace(/-/g, ' ')
        const label = MAP_PATH_NAMES[segment] || rawLabel.charAt(0).toUpperCase() + rawLabel.slice(1)
        return { label, href, isLast }
    })

    return (
        <Show when={segments().length > 0}>
            <nav aria-label="Breadcrumb" class={cx('gui-breadcrumb', p.class)}>
                <a href={p.homeHref ?? '/'} class="gui-breadcrumb__item">🏠</a>
                <For each={items()}>
                    {(item) => (
                        <span class="gui-breadcrumb__segment">
                            <span class="gui-breadcrumb__separator">/</span>
                            <Show when={!item.isLast} fallback={<span class="gui-breadcrumb__item gui-breadcrumb__item--current">{item.label}</span>}>
                                <a href={item.href} class="gui-breadcrumb__item">{item.label}</a>
                            </Show>
                        </span>
                    )}
                </For>
            </nav>
        </Show>
    )
}
