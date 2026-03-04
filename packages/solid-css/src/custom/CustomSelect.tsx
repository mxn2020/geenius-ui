
import { createSignal, onCleanup, onMount, type Component, For, Show } from 'solid-js'
import { cx } from '../lib/cx'

export const CustomSelect: Component<{
    value: string
    onChange: (value: string) => void
    options: string[]
    label: string
    placeholder: string
    error?: string
}> = (p) => {
    const [isOpen, setIsOpen] = createSignal(false)
    let dropdownRef: HTMLDivElement | undefined

    onMount(() => {
        const handler = (event: MouseEvent) => {
            if (dropdownRef && !dropdownRef.contains(event.target as Node)) setIsOpen(false)
        }
        document.addEventListener('mousedown', handler)
        onCleanup(() => document.removeEventListener('mousedown', handler))
    })

    return (
        <div class="gui-custom-select">
            <label class="gui-label gui-label--required">{p.label}</label>
            <div ref={dropdownRef} class="gui-custom-select__wrapper">
                <button type="button" onClick={() => setIsOpen(!isOpen())}
                    class={cx('gui-custom-select__trigger', isOpen() && 'gui-custom-select__trigger--open')}>
                    <span class={cx(!p.value && 'gui-datepicker__placeholder')}>{p.value || p.placeholder}</span>
                    <svg class={cx('gui-custom-select__chevron', isOpen() && 'gui-custom-select__chevron--open')} width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                <Show when={isOpen()}>
                    <div class="gui-custom-select__dropdown">
                        <For each={p.options}>
                            {(option) => (
                                <button type="button"
                                    onClick={() => { p.onChange(option); setIsOpen(false) }}
                                    class={cx('gui-dropdown-item', p.value === option && 'gui-dropdown-item--selected')}>
                                    <span class={cx('gui-custom-select__dot', p.value === option && 'gui-custom-select__dot--active')} />
                                    {option}
                                    <Show when={p.value === option}>
                                        <svg class="gui-custom-select__check" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </Show>
                                </button>
                            )}
                        </For>
                    </div>
                </Show>
            </div>
            <Show when={p.error}><p class="gui-calendar-input__error">{p.error}</p></Show>
        </div>
    )
}
