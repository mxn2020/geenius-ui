

import { type Component, type JSX, For, Show } from 'solid-js'
import { cn } from '../lib/utils'

const MAP_PATH_NAMES: Record<string, string> = {
    admin: 'Admin',
    member: 'Benutzer',
    system: 'System',
    members: 'Benutzer',
    users: 'Benutzer',
    approvals: 'Freigaben',
    inventory: 'Inventar',
    products: 'Produkte',
    add: 'Hinzufügen',
    orders: 'Bestellungen',
    dashboard: 'Dashboard',
    memberships: 'Abonnements',
    rules: 'Regeln',
    payments: 'Zahlungen',
    news: 'News',
    logs: 'Logs',
}

/**
 * Auto-generating breadcrumbs from the current URL pathname.
 * Framework-agnostic — reads `window.location.pathname`.
 */
export const Breadcrumbs: Component<{
    pathname?: string
    class?: string
    homeHref?: string
    homeIcon?: JSX.Element
}> = (props) => {
    const pathname = () => props.pathname ?? (typeof window !== 'undefined' ? window.location.pathname : '/')
    const segments = () => pathname().split('/').filter(Boolean)

    const items = () => segments().map((segment, index) => {
        const isLast = index === segments().length - 1
        const href = `/${segments().slice(0, index + 1).join('/')}`
        const rawLabel = segment.replace(/-/g, ' ')
        const label = MAP_PATH_NAMES[segment] || rawLabel.charAt(0).toUpperCase() + rawLabel.slice(1)
        return { label, href, isLast }
    })

    return (
        <Show when={segments().length > 0}>
            <nav aria-label="Breadcrumb" class={cn('flex items-center text-sm text-muted-foreground mb-1', props.class)}>
                <a href={props.homeHref ?? '/'} class="hover:text-foreground transition-colors flex items-center">
                    {props.homeIcon ?? (
                        <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                    )}
                </a>
                <For each={items()}>
                    {(item) => (
                        <div class="flex items-center">
                            <svg class="w-4 h-4 mx-1.5 opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="9 18 15 12 9 6" />
                            </svg>
                            <Show
                                when={!item.isLast}
                                fallback={<span class="font-medium text-foreground">{item.label}</span>}
                            >
                                <a href={item.href} class="hover:text-foreground transition-colors">{item.label}</a>
                            </Show>
                        </div>
                    )}
                </For>
            </nav>
        </Show>
    )
}
