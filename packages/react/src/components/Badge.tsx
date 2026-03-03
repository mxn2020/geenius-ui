



import { forwardRef, memo } from 'react'
import type { HTMLAttributes, ElementRef, ReactNode } from 'react'
import { cn } from '../lib/utils'
import type { BadgeVariant, BadgeSize, PriorityLevel } from '../lib/types'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode
  variant?: BadgeVariant
  size?: BadgeSize
  asChild?: boolean
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-primary/20 text-primary border-primary/35',
  primary: 'bg-primary/20 text-primary border-primary/35',
  secondary: 'bg-surface text-foreground border-border',
  success: 'bg-success/20 text-success border-success/35',
  warning: 'tone-warning tone-surface',
  danger: 'bg-danger/20 text-danger border-danger/35',
  destructive: 'bg-danger/25 text-danger border-danger/45',
  error: 'bg-danger/20 text-danger border-danger/35',
  info: 'bg-primary/15 text-primary border-primary/30',
  outline: 'bg-card text-foreground border-border hover:bg-surface',
}

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
  lg: 'px-3 py-1.5 text-base',
}

export const Badge = memo(
  forwardRef<ElementRef<'span'>, BadgeProps>(
    (
      {
        children,
        variant = 'secondary',
        size = 'md',
        asChild = false,
        className,
        ...props
      },
      ref,
    ) => {
      const badgeClassName = cn(
        'inline-flex items-center rounded-full border font-medium',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )

      if (asChild) {
        return (
          <span className={badgeClassName} {...props}>
            {children}
          </span>
        )
      }

      return (
        <span ref={ref} className={badgeClassName} {...props}>
          {children}
        </span>
      )
    },
  ),
)
Badge.displayName = 'Badge'

interface StatusBadgeProps extends Omit<BadgeProps, 'variant'> {
  status: 'active' | 'completed' | 'on_hold' | 'cancelled'
}

export const StatusBadge = memo(
  forwardRef<ElementRef<'span'>, StatusBadgeProps>(
    ({ status, ...props }, ref) => {
      const variants = {
        active: 'success' as const,
        completed: 'primary' as const,
        on_hold: 'warning' as const,
        cancelled: 'danger' as const,
      }

      return (
        <Badge ref={ref} variant={variants[status]} {...props}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      )
    },
  ),
)
StatusBadge.displayName = 'StatusBadge'

interface PriorityBadgeProps extends Omit<BadgeProps, 'variant' | 'children'> {
  priority: PriorityLevel
  children?: never
}

export const PriorityBadge = memo(
  forwardRef<ElementRef<'span'>, PriorityBadgeProps>(
    ({ priority, ...props }, ref) => {
      const variants = {
        low: 'secondary' as const,
        medium: 'info' as const,
        high: 'warning' as const,
        urgent: 'danger' as const,
      }

      return (
        <Badge ref={ref} variant={variants[priority]} {...props}>
          {priority.charAt(0).toUpperCase() + priority.slice(1)}
        </Badge>
      )
    },
  ),
)
PriorityBadge.displayName = 'PriorityBadge'

interface TaskStatusBadgeProps
  extends Omit<BadgeProps, 'variant' | 'children'> {
  status: 'todo' | 'in_progress' | 'completed' | 'cancelled' | 'blocked'
  children?: never
}

export const TaskStatusBadge = memo(
  forwardRef<ElementRef<'span'>, TaskStatusBadgeProps>(
    ({ status, ...props }, ref) => {
      const variants: Record<TaskStatusBadgeProps['status'], BadgeVariant> = {
        todo: 'secondary',
        in_progress: 'info',
        completed: 'success',
        cancelled: 'danger',
        blocked: 'destructive',
      }

      const labels: Record<TaskStatusBadgeProps['status'], string> = {
        todo: 'To Do',
        in_progress: 'In Progress',
        completed: 'Completed',
        cancelled: 'Cancelled',
        blocked: 'Blocked',
      }

      return (
        <Badge ref={ref} variant={variants[status]} {...props}>
          {labels[status]}
        </Badge>
      )
    },
  ),
)
TaskStatusBadge.displayName = 'TaskStatusBadge'
