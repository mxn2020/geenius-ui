// geenius-ui — TanStack Solid Table Data Table

import { createSignal, createEffect, onCleanup, For, Show, type JSX } from 'solid-js'
import { flexRender, type Table as SolidTable, type Header, type Cell } from '@tanstack/solid-table'
import { cn } from '../lib/utils'
import {
    Table,
    TableBody,
    TableCell as TCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../components/Table'

declare module '@tanstack/solid-table' {
    interface ColumnMeta<TData, TValue> {
        hidden?: boolean
        sticky?: 'left' | 'right'
        minWidth?: number
    }
}

type DataTableProps<T> = {
    table: SolidTable<T>
    emptyMessage?: JSX.Element | string
    class?: string
}

export function DataTable<T>(props: DataTableProps<T>) {
    const rows = () => props.table.getRowModel().rows
    const colSpan = () =>
        props.table.getAllLeafColumns().filter((c: { columnDef: { meta?: { hidden?: boolean } } }) => !c.columnDef.meta?.hidden).length

    let containerRef: HTMLDivElement | undefined
    const [isScrolled, setIsScrolled] = createSignal(false)

    createEffect(() => {
        if (!containerRef) return
        const handleScroll = () => setIsScrolled(containerRef!.scrollLeft > 0)
        containerRef.addEventListener('scroll', handleScroll)
        onCleanup(() => containerRef!.removeEventListener('scroll', handleScroll))
    })

    const emptyContent = () => {
        const msg = props.emptyMessage
        return typeof msg === 'string'
            ? <span class="text-sm text-subtle">{msg}</span>
            : (msg ?? <span class="text-sm text-subtle">No entries found.</span>)
    }

    return (
        <div ref={containerRef} class="overflow-x-auto overflow-y-visible">
            <Table
                class={cn('w-full text-sm', props.class)}
            >
                <TableHeader class="text-left text-subtle">
                    <For each={props.table.getHeaderGroups()}>
                        {(headerGroup) => (
                            <TableRow>
                                <For each={headerGroup.headers}>
                                    {(header: Header<T, unknown>) => {
                                        if (header.isPlaceholder || header.column.columnDef.meta?.hidden) return null
                                        const canSort = header.column.getCanSort()
                                        const meta = header.column.columnDef.meta
                                        const isSticky = meta?.sticky === 'left'
                                        const minWidth = meta?.minWidth

                                        return (
                                            <TableHead
                                                class={cn(
                                                    canSort ? 'cursor-pointer select-none' : '',
                                                    isSticky ? `sticky left-0 z-10 bg-[var(--card)] ${isScrolled() ? 'shadow-[4px_0_8px_rgba(0,0,0,0.1)]' : ''}` : '',
                                                )}
                                                style={minWidth ? { 'min-width': `${minWidth}px` } : undefined}
                                            >
                                                <Show when={canSort} fallback={flexRender(header.column.columnDef.header, header.getContext())}>
                                                    <button
                                                        type="button"
                                                        onClick={header.column.getToggleSortingHandler()}
                                                        class="inline-flex items-center gap-2"
                                                    >
                                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                                        <Show when={header.column.getIsSorted() === 'asc'}>
                                                            <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
                                                        </Show>
                                                        <Show when={header.column.getIsSorted() === 'desc'}>
                                                            <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
                                                        </Show>
                                                        <Show when={!header.column.getIsSorted()}>
                                                            <svg class="h-3.5 w-3.5 text-subtle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 15l5 5 5-5M7 9l5-5 5 5" /></svg>
                                                        </Show>
                                                    </button>
                                                </Show>
                                            </TableHead>
                                        )
                                    }}
                                </For>
                            </TableRow>
                        )}
                    </For>
                </TableHeader>
                <TableBody class="divide-y divide-[color:var(--card-border)]">
                    <Show when={rows().length > 0} fallback={
                        <TableRow>
                            <TCell colSpan={colSpan()} class="px-4 py-4">
                                {emptyContent()}
                            </TCell>
                        </TableRow>
                    }>
                        <For each={rows()}>
                            {(row) => (
                                <TableRow class="text-foreground">
                                    <For each={row.getVisibleCells()}>
                                        {(cell: Cell<T, unknown>) => {
                                            if (cell.column.columnDef.meta?.hidden) return null
                                            const meta = cell.column.columnDef.meta
                                            const isSticky = meta?.sticky === 'left'
                                            const minWidth = meta?.minWidth

                                            return (
                                                <TCell
                                                    class={cn(
                                                        'px-4 py-3',
                                                        isSticky ? `sticky left-0 z-10 bg-[var(--card)] ${isScrolled() ? 'shadow-[4px_0_8px_rgba(0,0,0,0.1)]' : ''}` : '',
                                                    )}
                                                    style={minWidth ? { 'min-width': `${minWidth}px` } : undefined}
                                                >
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TCell>
                                            )
                                        }}
                                    </For>
                                </TableRow>
                            )}
                        </For>
                    </Show>
                </TableBody>
            </Table>
        </div>
    )
}
