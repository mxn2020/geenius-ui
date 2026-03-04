import { describe, it, expect } from 'vitest'

/**
 * Comprehensive component export tests for @geenius-ui/react-css
 * Verifies every single exported component exists.
 * Note: React components using forwardRef are typeof 'object', not 'function'.
 */
describe('@geenius-ui/react-css — Full Export Audit', () => {
    let mod: Record<string, unknown>

    it('loads the package index', async () => {
        mod = await import('../packages/react-css/src/index') as Record<string, unknown>
        expect(mod).toBeDefined()
    })

    // Utility
    it('exports cx utility as function', () => {
        expect(mod.cx).toBeDefined()
        expect(typeof mod.cx).toBe('function')
    })

    // Form components
    const formComponents = ['Button', 'Input', 'Textarea', 'Checkbox', 'Switch', 'Label', 'Select', 'SelectItem', 'Slider']
    for (const name of formComponents) {
        it(`exports ${name}`, () => {
            expect(mod[name]).toBeDefined()
        })
    }

    // RadioGroup
    it('exports RadioGroup and Radio', () => {
        expect(mod.RadioGroup).toBeDefined()
        expect(mod.Radio).toBeDefined()
    })

    // Toggle
    it('exports Toggle and ToggleGroup', () => {
        expect(mod.Toggle).toBeDefined()
        expect(mod.ToggleGroup).toBeDefined()
    })

    // Display components
    const displayComponents = ['Badge', 'Chip', 'Loading', 'LoadingSpinner', 'Tooltip', 'Avatar', 'Skeleton', 'Progress']
    for (const name of displayComponents) {
        it(`exports ${name}`, () => {
            expect(mod[name]).toBeDefined()
        })
    }

    // Layout components
    const layoutComponents = ['Card', 'CardHeader', 'CardTitle', 'CardDescription', 'CardContent', 'CardFooter', 'Section', 'Separator']
    for (const name of layoutComponents) {
        it(`exports ${name}`, () => {
            expect(mod[name]).toBeDefined()
        })
    }

    // Table components
    const tableComponents = ['Table', 'TableHeader', 'TableBody', 'TableRow', 'TableHead', 'TableCell']
    for (const name of tableComponents) {
        it(`exports ${name}`, () => {
            expect(mod[name]).toBeDefined()
        })
    }

    // Interactive components
    const interactiveComponents = ['Modal', 'Tabs', 'Dialog', 'DialogFooter', 'Sheet', 'Collapsible', 'Alert', 'AlertComponent', 'Popover']
    for (const name of interactiveComponents) {
        it(`exports ${name}`, () => {
            expect(mod[name]).toBeDefined()
        })
    }

    // Compound AlertDialog
    it('exports CompoundAlertDialog and sub-components', () => {
        expect(mod.CompoundAlertDialog).toBeDefined()
        expect(mod.AlertDialogTrigger).toBeDefined()
        expect(mod.AlertDialogContent).toBeDefined()
        expect(mod.AlertDialogHeader).toBeDefined()
        expect(mod.AlertDialogTitle).toBeDefined()
        expect(mod.AlertDialogDescription).toBeDefined()
        expect(mod.AlertDialogFooter).toBeDefined()
        expect(mod.AlertDialogAction).toBeDefined()
        expect(mod.AlertDialogCancel).toBeDefined()
    })

    // DropdownMenu components
    const dropdownComponents = ['DropdownMenu', 'DropdownMenuItem', 'DropdownMenuSeparator', 'DropdownMenuLabel']
    for (const name of dropdownComponents) {
        it(`exports ${name}`, () => {
            expect(mod[name]).toBeDefined()
        })
    }

    // Misc components
    const miscComponents = ['List', 'ListItem', 'ScrollArea', 'Breadcrumb', 'ViewSwitcher', 'EmptyState', 'CostDisplay', 'Resizable']
    for (const name of miscComponents) {
        it(`exports ${name}`, () => {
            expect(mod[name]).toBeDefined()
        })
    }
})

/**
 * Comprehensive component export tests for @geenius-ui/react (Tailwind)
 */
describe('@geenius-ui/react — Full Export Audit', () => {
    let mod: Record<string, unknown>

    it('loads the package index', async () => {
        mod = await import('../packages/react/src/index') as Record<string, unknown>
        expect(mod).toBeDefined()
    })

    const coreComponents = ['Button', 'Card', 'Input', 'Textarea', 'Label', 'Badge', 'Loading', 'Separator']
    for (const name of coreComponents) {
        it(`exports ${name}`, () => {
            expect(mod[name]).toBeDefined()
        })
    }
})

/**
 * Type/constant export tests for @geenius-ui/shared
 */
describe('@geenius-ui/shared — Constants Export Audit', () => {
    let mod: Record<string, unknown>

    it('loads the shared package', async () => {
        mod = await import('../packages/shared/src/index') as Record<string, unknown>
        expect(mod).toBeDefined()
    })

    const constants = ['ANIMATION_DURATION', 'ANIMATION_EASING', 'Z_INDEX', 'hoverColors', 'borderRadius', 'transitions', 'overlayAnimationClasses']
    for (const name of constants) {
        it(`exports constant ${name}`, () => {
            expect(mod[name]).toBeDefined()
            expect(typeof mod[name]).toBe('object')
        })
    }
})
