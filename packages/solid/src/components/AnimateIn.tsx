

import { type ParentComponent, type JSX } from 'solid-js'
import { cn } from '../lib/utils'

interface AnimateInProps {
    children: JSX.Element
    class?: string
    delay?: number
}

/**
 * Simple animation wrapper that fades in content
 * Used to provide smooth transitions when content loads
 */
export const AnimateIn: ParentComponent<AnimateInProps> = (props) => {
    const style = () => props.delay && props.delay > 0 ? { 'animation-delay': `${props.delay}ms` } : undefined

    return (
        <div class={cn('animate-in fade-in duration-200', props.class)} style={style()}>
            {props.children}
        </div>
    )
}
