

import { createSignal, onCleanup, onMount, type Component, type JSX, For, Show } from 'solid-js'
import { cn } from '../lib/utils'

export const CustomSelect: Component<{
    value: string
    onChange: (value: string) => void
    options: string[]
    label: string
    placeholder: string
    error?: string
}> = (props) => {
    const [isOpen, setIsOpen] = createSignal(false)
    let dropdownRef: HTMLDivElement | undefined

    onMount(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef && !dropdownRef.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        onCleanup(() => document.removeEventListener('mousedown', handleClickOutside))
    })

    return (
        <div class="flex flex-col gap-2">
            <label class="text-text-main text-sm font-semibold tracking-wide">
                {props.label} <span class="text-primary">*</span>
            </label>
            <div ref={dropdownRef} class="relative">
                {/* Trigger Button */}
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen())}
                    class={cn(
                        'w-full h-14 pl-12 pr-10 rounded-xl border text-left flex items-center transition-all duration-200',
                        isOpen()
                            ? 'border-primary ring-2 ring-primary/20 bg-[var(--surface)]'
                            : 'border-[var(--border)] bg-[var(--surface)] hover:border-primary/50',
                    )}
                >
                    <span class="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                    </span>
                    <span class={props.value ? 'text-text-main' : 'text-text-muted/70'}>
                        {props.value || props.placeholder}
                    </span>
                    <span class={cn('absolute right-4 top-1/2 -translate-y-1/2 text-text-muted transition-transform duration-200', isOpen() && 'rotate-180')}>
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </span>
                </button>

                {/* Dropdown Options */}
                <Show when={isOpen()}>
                    <div class="absolute z-50 w-full mt-2 py-2 bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow-xl overflow-hidden max-h-60 overflow-y-auto">
                        <For each={props.options}>
                            {(option) => (
                                <button
                                    type="button"
                                    onClick={() => {
                                        props.onChange(option)
                                        setIsOpen(false)
                                    }}
                                    class={cn(
                                        'w-full px-4 py-3 text-left flex items-center gap-3 transition-colors',
                                        props.value === option
                                            ? 'bg-primary/10 text-primary font-medium'
                                            : 'hover:bg-[var(--bg-muted)] text-text-main',
                                    )}
                                >
                                    <span class={cn('w-2 h-2 rounded-full', props.value === option ? 'bg-primary' : 'bg-text-muted/30')} />
                                    {option}
                                    <Show when={props.value === option}>
                                        <svg class="w-4 h-4 ml-auto text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </Show>
                                </button>
                            )}
                        </For>
                    </div>
                </Show>
            </div>
            <Show when={props.error}>
                <p class="text-xs text-warning" role="status" aria-live="polite">{props.error}</p>
            </Show>
        </div>
    )
}
