// geenius-ui — TanStack Table Data Table

import { useRef, useState, useEffect, type ReactNode } from 'react'
import { flexRender, type Table as ReactTable } from '@tanstack/react-table'
import { ArrowUpDown, ChevronDown, ChevronUp } from 'lucide-react'
import { twMerge } from 'tailwind-merge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/Table'

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData, TValue> {
    hidden?: boolean
    sticky?: 'left' | 'right'
    minWidth?: number
  }
}

type DataTableProps<T> = {
  table: ReactTable<T>
  emptyMessage?: ReactNode
  className?: string
}

export function DataTable<T>({
  table,
  emptyMessage = 'No entries found.',
  className,
}: DataTableProps<T>) {
  const rows = table.getRowModel().rows
  const colSpan = table
    .getAllLeafColumns()
    .filter((col) => !col.columnDef.meta?.hidden).length
  const containerRef = useRef<HTMLDivElement>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      setIsScrolled(container.scrollLeft > 0)
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  const emptyContent =
    typeof emptyMessage === 'string' ? (
      <span className="text-sm text-subtle">{emptyMessage}</span>
    ) : (
      emptyMessage
    )

  return (
    <Table
      className={twMerge('w-full text-sm', className)}
      containerClassName="overflow-x-auto overflow-y-visible"
      containerRef={containerRef}
    >
      <TableHeader className="text-left text-subtle">
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              if (header.isPlaceholder || header.column.columnDef.meta?.hidden)
                return null

              const canSort = header.column.getCanSort()
              const sorted = header.column.getIsSorted()
              const meta = header.column.columnDef.meta
              const isSticky = meta?.sticky === 'left'
              const minWidth = meta?.minWidth

              const stickyClasses = isSticky
                ? `sticky left-0 z-10 bg-[var(--card)] ${isScrolled ? 'shadow-[4px_0_8px_rgba(0,0,0,0.1)]' : ''}`
                : ''

              return (
                <TableHead
                  key={header.id}
                  className={twMerge(
                    canSort ? 'cursor-pointer select-none' : '',
                    stickyClasses,
                  )}
                  style={{ minWidth }}
                >
                  {canSort ? (
                    <button
                      type="button"
                      onClick={header.column.getToggleSortingHandler()}
                      className="inline-flex items-center gap-2"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      {sorted === 'asc' ? (
                        <ChevronUp className="h-3.5 w-3.5" />
                      ) : sorted === 'desc' ? (
                        <ChevronDown className="h-3.5 w-3.5" />
                      ) : (
                        <ArrowUpDown className="h-3.5 w-3.5 text-subtle" />
                      )}
                    </button>
                  ) : (
                    flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )
                  )}
                </TableHead>
              )
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody className="divide-y divide-[color:var(--card-border)]">
        {rows.length === 0 ? (
          <TableRow>
            <TableCell colSpan={colSpan} className="px-4 py-4">
              {emptyContent}
            </TableCell>
          </TableRow>
        ) : (
          rows.map((row) => (
            <TableRow key={row.id} className="text-foreground">
              {row.getVisibleCells().map((cell) => {
                if (cell.column.columnDef.meta?.hidden) return null

                const meta = cell.column.columnDef.meta
                const isSticky = meta?.sticky === 'left'
                const minWidth = meta?.minWidth

                const stickyClasses = isSticky
                  ? `sticky left-0 z-10 bg-[var(--card)] ${isScrolled ? 'shadow-[4px_0_8px_rgba(0,0,0,0.1)]' : ''}`
                  : ''

                return (
                  <TableCell
                    key={cell.id}
                    className={twMerge('px-4 py-3', stickyClasses)}
                    style={{ minWidth }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                )
              })}
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
}
