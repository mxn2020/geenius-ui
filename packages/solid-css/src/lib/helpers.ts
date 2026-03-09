/**
 * Solid-CSS Helpers
 *
 * Utility functions mirroring @geenius-ui/solid helpers.
 */

/** Compose event handlers — first handler can call preventDefault to skip second */
export function composeEventHandlers<E extends Event>(
    external?: (event: E) => void,
    internal?: (event: E) => void,
) {
    return (event: E) => {
        external?.(event)
        if (!event.defaultPrevented) {
            internal?.(event)
        }
    }
}

/** Clamp a number between min and max */
export function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max)
}

/** Merge multiple refs (Solid-style) */
export function mergeRefs<T>(...refs: (((el: T) => void) | undefined)[]): (el: T) => void {
    return (el: T) => {
        refs.forEach((ref) => ref?.(el))
    }
}
