// geenius-ui — TanStack Solid Table Fuzzy Filter

import { rankItem } from '@tanstack/match-sorter-utils'
import type { FilterFn } from '@tanstack/solid-table'

export const fuzzyFilter: FilterFn<unknown> = (
    row,
    columnId,
    value,
    addMeta,
) => {
    const itemRank = rankItem(row.getValue(columnId), value)
    addMeta({ itemRank })
    return itemRank.passed
}
