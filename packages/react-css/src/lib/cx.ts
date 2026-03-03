import clsx from 'clsx'
import type { ClassValue } from 'clsx'

/**
 * Utility for conditionally joining classNames together.
 * Vanilla CSS version — uses clsx only (no tailwind-merge needed).
 */
export function cx(...inputs: ClassValue[]): string {
    return clsx(inputs)
}
