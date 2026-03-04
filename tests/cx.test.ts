import { describe, it, expect } from 'vitest'
import { cx } from '../packages/react-css/src/lib/cx'

describe('cx() utility', () => {
    it('joins class names', () => {
        expect(cx('foo', 'bar')).toBe('foo bar')
    })

    it('handles empty strings', () => {
        expect(cx('', 'bar')).toBe('bar')
    })

    it('handles undefined and null', () => {
        expect(cx('foo', undefined, null, 'bar')).toBe('foo bar')
    })

    it('handles false/true conditionals', () => {
        expect(cx('foo', false && 'bar', true && 'baz')).toBe('foo baz')
    })

    it('handles objects', () => {
        expect(cx({ foo: true, bar: false, baz: true })).toBe('foo baz')
    })

    it('handles arrays', () => {
        expect(cx(['foo', 'bar'])).toBe('foo bar')
    })

    it('returns empty string with no arguments', () => {
        expect(cx()).toBe('')
    })

    it('handles mixed types', () => {
        expect(cx('base', { active: true, disabled: false }, ['extra', null])).toBe('base active extra')
    })
})
