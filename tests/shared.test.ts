import { describe, it, expect } from 'vitest'
import {
    ANIMATION_DURATION,
    ANIMATION_EASING,
    Z_INDEX,
    hoverColors,
    borderRadius,
    transitions,
    overlayAnimationClasses,
} from '../packages/shared/src/index'

describe('@geenius-ui/shared — Constants', () => {
    describe('ANIMATION_DURATION', () => {
        it('has fast, normal, slow durations', () => {
            expect(ANIMATION_DURATION.fast).toBe(150)
            expect(ANIMATION_DURATION.normal).toBe(200)
            expect(ANIMATION_DURATION.slow).toBe(300)
        })

        it('durations are ordered correctly', () => {
            expect(ANIMATION_DURATION.fast).toBeLessThan(ANIMATION_DURATION.normal)
            expect(ANIMATION_DURATION.normal).toBeLessThan(ANIMATION_DURATION.slow)
        })
    })

    describe('ANIMATION_EASING', () => {
        it('has easeOut, easeIn, default curves', () => {
            expect(ANIMATION_EASING.easeOut).toContain('cubic-bezier')
            expect(ANIMATION_EASING.easeIn).toContain('cubic-bezier')
            expect(ANIMATION_EASING.default).toBe('ease-out')
        })
    })

    describe('Z_INDEX', () => {
        it('has all z-index levels', () => {
            expect(Z_INDEX.dropdown).toBe(50)
            expect(Z_INDEX.sticky).toBe(100)
            expect(Z_INDEX.overlay).toBe(200)
            expect(Z_INDEX.modal).toBe(300)
            expect(Z_INDEX.popover).toBe(400)
            expect(Z_INDEX.tooltip).toBe(500)
            expect(Z_INDEX.priority).toBe(9999)
        })

        it('z-index levels are properly stacked', () => {
            expect(Z_INDEX.dropdown).toBeLessThan(Z_INDEX.sticky)
            expect(Z_INDEX.sticky).toBeLessThan(Z_INDEX.overlay)
            expect(Z_INDEX.overlay).toBeLessThan(Z_INDEX.modal)
            expect(Z_INDEX.modal).toBeLessThan(Z_INDEX.popover)
            expect(Z_INDEX.popover).toBeLessThan(Z_INDEX.tooltip)
            expect(Z_INDEX.tooltip).toBeLessThan(Z_INDEX.priority)
        })
    })

    describe('hoverColors', () => {
        it('has all hover color tokens', () => {
            expect(hoverColors.muted).toBeDefined()
            expect(hoverColors.primary).toBeDefined()
            expect(hoverColors.destructive).toBeDefined()
            expect(hoverColors.ghost).toBeDefined()
            expect(hoverColors.surface).toBeDefined()
        })
    })

    describe('borderRadius', () => {
        it('has default, full, sm variants', () => {
            expect(borderRadius.default).toBeDefined()
            expect(borderRadius.full).toBeDefined()
            expect(borderRadius.sm).toBeDefined()
        })
    })

    describe('transitions', () => {
        it('has hover, overlay, collapse', () => {
            expect(transitions.hover).toContain('transition')
            expect(transitions.overlay).toContain('transition')
            expect(transitions.collapse).toContain('transition')
        })
    })

    describe('overlayAnimationClasses', () => {
        it('has all animation directions', () => {
            expect(overlayAnimationClasses.fromTop).toBeDefined()
            expect(overlayAnimationClasses.fromBottom).toBeDefined()
            expect(overlayAnimationClasses.center).toBeDefined()
            expect(overlayAnimationClasses.fade).toBeDefined()
        })

        it('each direction has base, enter, exit', () => {
            for (const dir of ['fromTop', 'fromBottom', 'center', 'fade'] as const) {
                const anim = overlayAnimationClasses[dir]
                expect(anim).toHaveProperty('base')
                expect(anim).toHaveProperty('enter')
                expect(anim).toHaveProperty('exit')
            }
        })
    })
})
