
import { Link } from '@tanstack/solid-router'
import type { ComponentProps, JSX } from 'solid-js'
import { splitProps } from 'solid-js'
import { Button } from '../components/Button'

type LinkButtonProps = ComponentProps<typeof Button> & ComponentProps<typeof Link> & {
    children: JSX.Element
}

/**
 * LinkButton
 * - Wraps TanStack Solid Router's Link component with our Button styles
 * - Ensures consistent sizing/typography between links and buttons
 */
export function LinkButton(props: LinkButtonProps) {
    const [local, linkProps] = splitProps(props, ['variant', 'size', 'class', 'children'])
    return (
        <Link
            class={`gui-btn gui-btn--${local.variant || 'primary'} gui-btn--${local.size || 'md'} ${local.class || ''}`}
            {...linkProps}
        >
            {local.children}
        </Link>
    )
}

