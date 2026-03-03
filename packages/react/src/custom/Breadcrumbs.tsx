

import { Link, useMatches } from '@tanstack/react-router'
import { ChevronRight, Home } from 'lucide-react'

const MAP_PATH_NAMES: Record<string, string> = {
  admin: 'Admin',
  member: 'Benutzer',
  system: 'System',
  members: 'Benutzer',
  users: 'Benutzer',
  approvals: 'Freigaben',
  inventory: 'Inventar',
  products: 'Produkte',
  add: 'Hinzufügen',
  orders: 'Bestellungen',
  dashboard: 'Dashboard',
  memberships: 'Abonnements',
  rules: 'Regeln',
  payments: 'Zahlungen',
  news: 'News',
  logs: 'Logs',
}

export function Breadcrumbs() {
  const matches = useMatches()

  // Filter out root match and layout matches often with no ID or visible path
  const relevantMatches = matches.filter((match) => {
    // Basic heuristic: must have a path and not be just "/" unless it's the home
    return match.pathname !== '/' && match.context
  })

  // To build unique breadcrumbs we simulate path segments
  // TanStack router matches give us hierarchical route objects.
  // We can just iterate over the path segments of the current location match
  // or use the matches chain if it maps well to hierarchy.
  // Using path segments is often simpler for auto-generation.

  // Let's use the last match to get the full current path
  const currentMatch = matches[matches.length - 1]
  const pathname = currentMatch?.pathname || '/'

  const pathSegments = pathname.split('/').filter(Boolean)

  if (pathSegments.length === 0) return null

  // Build cumulative paths
  const items = pathSegments.map((segment, index) => {
    const isLast = index === pathSegments.length - 1
    const to = `/${pathSegments.slice(0, index + 1).join('/')}`

    // Normalize label
    const rawLabel = segment.replace(/-/g, ' ')
    // Check map or Title Case
    const label =
      MAP_PATH_NAMES[segment] ||
      rawLabel.charAt(0).toUpperCase() + rawLabel.slice(1)

    return { label, to, isLast }
  })

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center text-sm text-[var(--muted-foreground)] mb-1"
    >
      <Link
        to="/"
        className="hover:text-[var(--foreground)] transition-colors flex items-center"
      >
        <Home className="w-4 h-4" />
      </Link>

      {items.map((item) => (
        <div key={item.to} className="flex items-center">
          <ChevronRight className="w-4 h-4 mx-1.5 opacity-50" />
          {item.isLast ? (
            <span className="font-medium text-[var(--foreground)] line-clamp-1 max-w-[200px]">
              {item.label}
            </span>
          ) : (
            <Link
              to={item.to}
              className="hover:text-[var(--foreground)] transition-colors line-clamp-1 max-w-[150px]"
            >
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  )
}
