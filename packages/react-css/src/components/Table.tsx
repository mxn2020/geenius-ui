import { forwardRef, memo, type ReactNode, type RefObject } from 'react'
import { cx } from '../lib/cx'

export interface TableProps { children: ReactNode; className?: string; containerClassName?: string; containerRef?: RefObject<HTMLDivElement | null> }

export const Table = memo(
    forwardRef<HTMLTableElement, TableProps>(
        ({ children, className, containerClassName, containerRef }, ref) => (
            <div className={cx('gui-table-container', containerClassName)} ref={containerRef}>
                <table ref={ref} className={cx('gui-table', className)}>{children}</table>
            </div>
        ),
    ),
)
Table.displayName = 'Table'

export const TableHeader = memo(forwardRef<HTMLTableSectionElement, { children: ReactNode; className?: string }>(
    ({ children, className }, ref) => <thead ref={ref} className={className}>{children}</thead>
))
TableHeader.displayName = 'TableHeader'

export const TableBody = memo(forwardRef<HTMLTableSectionElement, { children: ReactNode; className?: string }>(
    ({ children, className }, ref) => <tbody ref={ref} className={className}>{children}</tbody>
))
TableBody.displayName = 'TableBody'

export const TableRow = memo(forwardRef<HTMLTableRowElement, { children: ReactNode; className?: string }>(
    ({ children, className }, ref) => <tr ref={ref} className={className}>{children}</tr>
))
TableRow.displayName = 'TableRow'

export const TableHead = memo(forwardRef<HTMLTableCellElement, { children?: ReactNode; className?: string; style?: React.CSSProperties }>(
    ({ children, className, style }, ref) => <th ref={ref} className={className} style={style}>{children}</th>
))
TableHead.displayName = 'TableHead'

export const TableCell = memo(forwardRef<HTMLTableCellElement, { children?: ReactNode; className?: string; colSpan?: number; style?: React.CSSProperties }>(
    ({ children, className, colSpan, style }, ref) => <td ref={ref} className={className} colSpan={colSpan} style={style}>{children}</td>
))
TableCell.displayName = 'TableCell'
