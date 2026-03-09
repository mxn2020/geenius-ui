// geenius-ui — TanStack Solid Table Pagination

import { Show, For, type JSX } from 'solid-js'
import type { Table } from '@tanstack/solid-table'
import { cn } from '../lib/utils'
import { Button } from '../components/Button'
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '../components/Select'

type TablePaginationProps<T> = {
    table: Table<T>
    pageSizeOptions?: number[]
    class?: string
    /** Optional explicit total for server-side pagination */
    totalRows?: number
}

export function TablePagination<T>(props: TablePaginationProps<T>) {
    const pageSizeOptions = () => props.pageSizeOptions ?? [10, 25, 50, 100]

    const pageIndex = () => props.table.getState().pagination.pageIndex
    const pageSize = () => props.table.getState().pagination.pageSize
    const totalRows = () =>
        typeof props.totalRows === 'number'
            ? props.totalRows
            : (props.table.options.rowCount ?? props.table.getFilteredRowModel().rows.length)
    const pageCount = () => props.table.getPageCount()
    const start = () => totalRows() === 0 ? 0 : pageIndex() * pageSize() + 1
    const end = () => Math.min(totalRows(), (pageIndex() + 1) * pageSize())

    return (
        <div class={cn('flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between', props.class)}>
            <div class="text-sm text-subtle">
                Rows {start()}-{end()} of {totalRows()}
            </div>
            <div class="flex flex-wrap items-center gap-3">
                <div class="flex items-center gap-2 text-sm text-subtle">
                    <span>Per page</span>
                    <Select
                        value={pageSize().toString()}
                        onValueChange={(value: string) => props.table.setPageSize(Number(value))}
                    >
                        <SelectTrigger class="w-[80px]" aria-label="Rows per page">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <For each={pageSizeOptions()}>
                                {(size) => (
                                    <SelectItem value={size.toString()}>
                                        {size}
                                    </SelectItem>
                                )}
                            </For>
                        </SelectContent>
                    </Select>
                </div>
                <div class="flex items-center gap-2">
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => props.table.previousPage()}
                        disabled={!props.table.getCanPreviousPage()}
                        icon={
                            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 19l-7-7 7-7" /></svg>
                        }
                    />
                    <span class="text-sm text-subtle">
                        Page {pageCount() === 0 ? 0 : pageIndex() + 1} of {pageCount()}
                    </span>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => props.table.nextPage()}
                        disabled={!props.table.getCanNextPage()}
                        icon={
                            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 5l7 7-7 7" /></svg>
                        }
                    />
                </div>
            </div>
        </div>
    )
}
