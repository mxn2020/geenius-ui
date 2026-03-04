

// Reusable animation wrapper for enter/exit transitions

import {
    type JSX,
    type ParentComponent,
    createSignal,
    createEffect,
    onCleanup,
} from 'solid-js'
import { Show } from 'solid-js/web'
import { cn } from '../lib/utils'

type AnimationType =
    | 'fade'
    | 'slide-left'
    | 'slide-right'
    | 'slide-up'
    | 'slide-down'
    | 'scale'
    | 'expand-x'
    | 'expand-y'

interface AnimatePresenceProps {
    children: JSX.Element
    show: boolean
    animation?: AnimationType
    duration?: number
    delay?: number
    class?: string
    keepMounted?: boolean
    onExitComplete?: () => void
}

const animationStyles: Record<AnimationType, { enter: string; exit: string }> = {
    fade: { enter: 'opacity-100', exit: 'opacity-0' },
    'slide-left': { enter: 'opacity-100 translate-x-0', exit: 'opacity-0 -translate-x-4' },
    'slide-right': { enter: 'opacity-100 translate-x-0', exit: 'opacity-0 translate-x-4' },
    'slide-up': { enter: 'opacity-100 translate-y-0', exit: 'opacity-0 -translate-y-4' },
    'slide-down': { enter: 'opacity-100 translate-y-0', exit: 'opacity-0 translate-y-4' },
    scale: { enter: 'opacity-100 scale-100', exit: 'opacity-0 scale-95' },
    'expand-x': { enter: 'opacity-100 scale-x-100', exit: 'opacity-0 scale-x-0' },
    'expand-y': { enter: 'opacity-100 scale-y-100', exit: 'opacity-0 scale-y-0' },
}

/**
 * AnimatePresence - Animate elements entering/exiting the DOM
 *
 * @example
 * ```tsx
 * <AnimatePresence show={isOpen()} animation="slide-right">
 *   <Menu />
 * </AnimatePresence>
 * ```
 */
export const AnimatePresence: ParentComponent<AnimatePresenceProps> = (props) => {
    const [shouldRender, setShouldRender] = createSignal(props.show)
    const [isAnimating, setIsAnimating] = createSignal(false)

    createEffect(() => {
        if (props.show) {
            setShouldRender(true)
            requestAnimationFrame(() => setIsAnimating(true))
        } else {
            setIsAnimating(false)
            const duration = (props.duration ?? 200) + (props.delay ?? 0)
            const timer = setTimeout(() => {
                if (!props.keepMounted) setShouldRender(false)
                props.onExitComplete?.()
            }, duration)
            onCleanup(() => clearTimeout(timer))
        }
    })

    const styles = () => animationStyles[props.animation ?? 'fade']
    const isVisible = () => props.show && isAnimating()

    const style = (): JSX.CSSProperties => ({
        'transition-duration': `${props.duration ?? 200}ms`,
        'transition-delay': props.delay && props.delay > 0 ? `${props.delay}ms` : undefined,
        'transition-timing-function': 'cubic-bezier(0.16, 1, 0.3, 1)',
        ...(props.keepMounted && !shouldRender() ? { visibility: 'hidden' } : {}),
    })

    return (
        <Show when={shouldRender() || props.keepMounted}>
            <div
                class={cn(
                    'transition-all',
                    isVisible() ? styles().enter : styles().exit,
                    (props.animation ?? '').startsWith('expand') && 'origin-left',
                    props.class,
                )}
                style={style()}
            >
                {props.children}
            </div>
        </Show>
    )
}

/**
 * AnimateGroup - Animate multiple children with staggered delays
 */
interface AnimateGroupProps {
    children: JSX.Element[]
    show: boolean
    animation?: AnimationType
    duration?: number
    stagger?: number
    class?: string
}

export const AnimateGroup: ParentComponent<AnimateGroupProps> = (props) => {
    return (
        <div class={props.class}>
            {(props.children as JSX.Element[]).map((child, index) => (
                <AnimatePresence
                    show={props.show}
                    animation={props.animation ?? 'fade'}
                    duration={props.duration ?? 200}
                    delay={index * (props.stagger ?? 50)}
                >
                    {child}
                </AnimatePresence>
            ))}
        </div>
    )
}
