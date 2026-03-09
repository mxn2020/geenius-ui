/**
 * React-CSS Helpers
 *
 * Utility functions mirroring @geenius-ui/react helpers.
 */

import type { Ref, RefCallback } from 'react'

/** Merge multiple refs into one */
export function mergeRefs<T>(...refs: (Ref<T> | undefined)[]): RefCallback<T> {
    return (node: T) => {
        refs.forEach((ref) => {
            if (typeof ref === 'function') ref(node)
            else if (ref && typeof ref === 'object') (ref as React.MutableRefObject<T | null>).current = node
        })
    }
}

/** Compose event handlers — first handler can call preventDefault to skip second */
export function composeEventHandlers<E>(
    external?: (event: E) => void,
    internal?: (event: E) => void,
) {
    return (event: E) => {
        external?.(event)
        if (!(event as unknown as Event).defaultPrevented) {
            internal?.(event)
        }
    }
}

/** Clamp a number between min and max */
export function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max)
}
