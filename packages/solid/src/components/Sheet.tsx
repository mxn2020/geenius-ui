

// Sliding panel component (similar to Dialog but slides from side)

import {
    createContext,
    useContext,
    createSignal,
    createEffect,
    onCleanup,
    type JSX,
    type ParentComponent,
    type Component,
} from 'solid-js'
import { Show, Portal } from 'solid-js/web'
import { cn } from '../lib/utils'

// Types
type SheetSide = 'left' | 'right' | 'top' | 'bottom'

// Context for managing sheet state
interface SheetContextValue {
    open: () => boolean
    setOpen: (open: boolean) => void
    side: () => SheetSide
}

const SheetContext = createContext<SheetContextValue>()

const useSheetContext = () => {
    const ctx = useContext(SheetContext)
    if (!ctx) throw new Error('Sheet compound components must be used within a Sheet component')
    return ctx
}

// Root Sheet component
interface SheetProps {
    children: JSX.Element
    open?: boolean
    defaultOpen?: boolean
    onOpenChange?: (open: boolean) => void
    side?: SheetSide
}

export const Sheet: ParentComponent<SheetProps> = (props) => {
    const [internalOpen, setInternalOpen] = createSignal(props.defaultOpen ?? false)

    const isControlled = () => props.open !== undefined
    const open = () => isControlled() ? props.open! : internalOpen()

    const handleOpenChange = (newOpen: boolean) => {
        if (!isControlled()) setInternalOpen(newOpen)
        props.onOpenChange?.(newOpen)
    }

    return (
        <SheetContext.Provider value={{ open, setOpen: handleOpenChange, side: () => props.side ?? 'right' }}>
            {props.children}
        </SheetContext.Provider>
    )
}

// SheetTrigger component
export const SheetTrigger: ParentComponent<{ class?: string }> = (props) => {
    const { setOpen } = useSheetContext()
    return (
        <button type="button" onClick={() => setOpen(true)} class={cn('cursor-pointer', props.class)}>
            {props.children}
        </button>
    )
}

// SheetOverlay
const SheetOverlay: Component<{ class?: string }> = (props) => {
    const { setOpen, open } = useSheetContext()
    return (
        <div
            onClick={(e) => { if (e.target === e.currentTarget) setOpen(false) }}
            class={cn(
                'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm cursor-pointer',
                'transition-opacity duration-300',
                props.class,
            )}
            data-state={open() ? 'open' : 'closed'}
        />
    )
}

// Position classes by side
const sidePositions: Record<SheetSide, string> = {
    right: 'right-0 top-0 h-full w-full max-w-md',
    left: 'left-0 top-0 h-full w-full max-w-md',
    top: 'top-0 left-0 w-full h-auto max-h-[80vh]',
    bottom: 'bottom-0 left-0 w-full h-auto max-h-[80vh]',
}

// SheetContent component
interface SheetContentProps {
    children: JSX.Element
    class?: string
    showCloseButton?: boolean
}

export const SheetContent: ParentComponent<SheetContentProps> = (props) => {
    const { open, setOpen, side } = useSheetContext()
    const [shouldRender, setShouldRender] = createSignal(false)
    const [dataState, setDataState] = createSignal<'open' | 'closed'>('closed')

    const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') setOpen(false)
    }

    createEffect(() => {
        if (open()) {
            setShouldRender(true)
            requestAnimationFrame(() => {
                requestAnimationFrame(() => setDataState('open'))
            })
            document.addEventListener('keydown', handleEscape)
            document.body.style.overflow = 'hidden'
        } else {
            setDataState('closed')
            const timer = setTimeout(() => setShouldRender(false), 300)
            document.removeEventListener('keydown', handleEscape)
            document.body.style.overflow = 'unset'
            onCleanup(() => clearTimeout(timer))
        }
    })

    onCleanup(() => {
        document.removeEventListener('keydown', handleEscape)
        document.body.style.overflow = 'unset'
    })

    return (
        <Show when={shouldRender()}>
            <Portal>
                <div class="fixed inset-0 z-50 pointer-events-none">
                    <SheetOverlay />
                    <div
                        class={cn(
                            'fixed z-50 flex flex-col gap-4 border bg-card p-6 shadow-xl pointer-events-auto',
                            'transition-all duration-300 ease-in-out',
                            sidePositions[side()],
                            side() === 'left' && 'border-r',
                            side() === 'right' && 'border-l',
                            side() === 'top' && 'border-b rounded-b-lg',
                            side() === 'bottom' && 'border-t rounded-t-lg',
                            props.class,
                        )}
                        role="dialog"
                        aria-modal="true"
                        data-state={dataState()}
                    >
                        {props.children}
                        <Show when={props.showCloseButton !== false}>
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-card transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:pointer-events-none cursor-pointer"
                            >
                                <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                                <span class="sr-only">Close</span>
                            </button>
                        </Show>
                    </div>
                </div>
            </Portal>
        </Show>
    )
}

// SheetHeader
export const SheetHeader: ParentComponent<{ class?: string }> = (props) => (
    <div class={cn('flex flex-col space-y-2', props.class)}>{props.children}</div>
)

// SheetTitle
export const SheetTitle: ParentComponent<{ class?: string }> = (props) => (
    <h2 class={cn('text-lg font-semibold leading-none tracking-tight', props.class)}>{props.children}</h2>
)

// SheetDescription
export const SheetDescription: ParentComponent<{ class?: string }> = (props) => (
    <p class={cn('text-sm text-muted-foreground', props.class)}>{props.children}</p>
)

// SheetFooter
export const SheetFooter: ParentComponent<{ class?: string }> = (props) => (
    <div class={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-auto', props.class)}>{props.children}</div>
)

// SheetClose
export const SheetClose: ParentComponent<{ class?: string }> = (props) => {
    const { setOpen } = useSheetContext()
    return (
        <button type="button" onClick={() => setOpen(false)} class={cn('cursor-pointer', props.class)}>
            {props.children}
        </button>
    )
}
