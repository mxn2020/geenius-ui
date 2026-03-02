// geenius-ui — TanStack Table Pagination

import type { Table } from '@tanstack/react-table'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { twMerge } from 'tailwind-merge'
import { Button } from '../components/Button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/Select'

type TablePaginationProps<T> = {
  table: Table<T>
  pageSizeOptions?: number[]
  className?: string
  /** Optional explicit total for server-side pagination */
  totalRows?: number
}

export function TablePagination<T>({
  table,
  pageSizeOptions = [10, 25, 50, 100],
  className,
  totalRows: propTotalRows,
}: TablePaginationProps<T>) {
  const { pageIndex, pageSize } = table.getState().pagination
  const totalRows =
    typeof propTotalRows === 'number'
      ? propTotalRows
      : (table.options.rowCount ?? table.getFilteredRowModel().rows.length)
  const pageCount = table.getPageCount()
  const start = totalRows === 0 ? 0 : pageIndex * pageSize + 1
  const end = Math.min(totalRows, (pageIndex + 1) * pageSize)

  return (
    <div
      className={twMerge(
        'flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between',
        className,
      )}
    >
      <div className="text-sm text-subtle">
        Rows {start}-{end} of {totalRows}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 text-sm text-subtle">
          <span>Per page</span>
          <Select
            value={pageSize.toString()}
            onValueChange={(value) => table.setPageSize(Number(value))}
          >
            <SelectTrigger className="w-[80px]" aria-label="Rows per page">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {pageSizeOptions.map((size) => (
                <SelectItem key={size} value={size.toString()}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            icon={<ChevronLeft className="h-4 w-4" />}
          />
          <span className="text-sm text-subtle">
            Page {pageCount === 0 ? 0 : pageIndex + 1} of {pageCount}
          </span>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            icon={<ChevronRight className="h-4 w-4" />}
          />
        </div>
      </div>
    </div>
  )
}
