import { describe, it, expect } from 'vitest'

describe('@geenius-ui/shared', () => {
    it('exports types correctly', async () => {
        const shared = await import('../packages/shared/src/index')
        expect(shared).toBeDefined()
    })
})

describe('@geenius-ui/react-css', () => {
    it('exports Button component', async () => {
        const mod = await import('../packages/react-css/src/components/Button')
        expect(mod.Button).toBeDefined()
    })

    it('exports Card component', async () => {
        const mod = await import('../packages/react-css/src/components/Card')
        expect(mod.Card).toBeDefined()
    })

    it('exports Input component', async () => {
        const mod = await import('../packages/react-css/src/components/Input')
        expect(mod.Input).toBeDefined()
    })

    it('exports Badge component', async () => {
        const mod = await import('../packages/react-css/src/components/Badge')
        expect(mod.Badge).toBeDefined()
    })

    it('exports Loading component', async () => {
        const mod = await import('../packages/react-css/src/components/Loading')
        expect(mod.Loading).toBeDefined()
    })

    it('exports all components from index', async () => {
        const mod = await import('../packages/react-css/src/index')
        expect(mod.Button).toBeDefined()
        expect(mod.Card).toBeDefined()
        expect(mod.Input).toBeDefined()
        expect(mod.Textarea).toBeDefined()
        expect(mod.Label).toBeDefined()
        expect(mod.Badge).toBeDefined()
        expect(mod.Alert).toBeDefined()
        expect(mod.CompoundAlertDialog).toBeDefined()
        expect(mod.Loading).toBeDefined()
        expect(mod.Separator).toBeDefined()
        expect(mod.Select).toBeDefined()
        expect(mod.cx).toBeDefined()
    })

    it('exports new parity components from index', async () => {
        const mod = await import('../packages/react-css/src/index')
        expect(mod.Calendar).toBeDefined()
        expect(mod.DatePicker).toBeDefined()
        expect(mod.DateTimePicker).toBeDefined()
        expect(mod.CalendarInput).toBeDefined()
        expect(mod.AnimateIn).toBeDefined()
        expect(mod.AnimatePresence).toBeDefined()
        expect(mod.Breadcrumb).toBeDefined()
    })
})

describe('@geenius-ui/react', () => {
    it('exports Button component', async () => {
        const mod = await import('../packages/react/src/components/Button')
        expect(mod.Button).toBeDefined()
    })

    it('exports all components from index', async () => {
        const mod = await import('../packages/react/src/index')
        expect(mod.Button).toBeDefined()
        expect(mod.Card).toBeDefined()
        expect(mod.Input).toBeDefined()
    })
})

describe('@geenius-ui/solid-css', () => {
    it('exports all basic components from barrel', async () => {
        const mod = await import('../packages/solid-css/src/components/index')
        expect(mod.Button).toBeDefined()
        expect(mod.Card).toBeDefined()
        expect(mod.Input).toBeDefined()
        expect(mod.Badge).toBeDefined()
        expect(mod.Alert).toBeDefined()
    })

    it('exports interactive components', async () => {
        const mod = await import('../packages/solid-css/src/components/index')
        expect(mod.Dialog).toBeDefined()
        expect(mod.Sheet).toBeDefined()
        expect(mod.Tabs).toBeDefined()
        expect(mod.Toggle).toBeDefined()
        expect(mod.Calendar).toBeDefined()
        expect(mod.DatePicker).toBeDefined()
        expect(mod.AnimateIn).toBeDefined()
        expect(mod.AnimatePresence).toBeDefined()
    })

    it('exports cx utility', async () => {
        const { cx } = await import('../packages/solid-css/src/lib/cx')
        expect(typeof cx).toBe('function')
        expect(cx('a', 'b')).toBe('a b')
        expect(cx('a', false, 'b')).toBe('a b')
    })

    it('exports custom components', async () => {
        const mod = await import('../packages/solid-css/src/custom/index')
        expect(mod).toBeDefined()
    })

    it('exports hooks placeholder', async () => {
        const mod = await import('../packages/solid-css/src/hooks/index')
        expect(mod).toBeDefined()
    })
})

describe('@geenius-ui/solid', () => {
    it('exports animation utilities', async () => {
        const mod = await import('../packages/solid/src/lib/animation')
        expect(mod).toBeDefined()
        expect(typeof mod.createAnimatedOpen).toBe('function')
    })

    it('exports custom components', async () => {
        const mod = await import('../packages/solid/src/custom/index')
        expect(mod).toBeDefined()
    })

    it('exports hooks placeholder', async () => {
        const mod = await import('../packages/solid/src/hooks/index')
        expect(mod).toBeDefined()
    })

    it('exports helpers', async () => {
        const mod = await import('../packages/solid/src/lib/helpers')
        expect(typeof mod.clamp).toBe('function')
    })
})
