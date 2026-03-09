import { forwardRef, memo, type ReactNode } from 'react'
import { cx } from '../lib/cx'
import type { BadgeVariant, PriorityLevel } from '../lib/types'

export interface BadgeProps {
    children: ReactNode
    variant?: BadgeVariant
    size?: 'sm' | 'md' | 'lg'
    className?: string
}

export const Badge = memo(
    forwardRef<HTMLSpanElement, BadgeProps>(
        ({ children, variant = 'default', size = 'md', className }, ref) => (
            <span ref={ref} className={cx('gui-badge', `gui-badge--${variant}`, size !== 'md' && `gui-badge--${size}`, className)}>
                {children}
            </span>
        ),
    ),
)
Badge.displayName = 'Badge'

// StatusBadge
export interface StatusBadgeProps extends Omit<BadgeProps, 'variant'> {
    status: 'active' | 'completed' | 'on_hold' | 'cancelled'
}

const statusVariants: Record<StatusBadgeProps['status'], BadgeVariant> = {
    active: 'success', completed: 'primary', on_hold: 'warning', cancelled: 'danger',
}

export const StatusBadge = memo(
    forwardRef<HTMLSpanElement, StatusBadgeProps>(
        ({ status, ...props }, ref) => (
            <Badge ref={ref} variant={statusVariants[status]} {...props}>
                {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
            </Badge>
        ),
    ),
)
StatusBadge.displayName = 'StatusBadge'

// PriorityBadge
export interface PriorityBadgeProps extends Omit<BadgeProps, 'variant' | 'children'> {
    priority: PriorityLevel
}

const priorityVariants: Record<PriorityLevel, BadgeVariant> = {
    low: 'secondary', medium: 'info', high: 'warning', urgent: 'danger',
}

export const PriorityBadge = memo(
    forwardRef<HTMLSpanElement, PriorityBadgeProps>(
        ({ priority, ...props }, ref) => (
            <Badge ref={ref} variant={priorityVariants[priority]} {...props}>
                {priority.charAt(0).toUpperCase() + priority.slice(1)}
            </Badge>
        ),
    ),
)
PriorityBadge.displayName = 'PriorityBadge'

// TaskStatusBadge
export interface TaskStatusBadgeProps extends Omit<BadgeProps, 'variant' | 'children'> {
    status: 'todo' | 'in_progress' | 'completed' | 'cancelled' | 'blocked'
}

const taskStatusVariants: Record<TaskStatusBadgeProps['status'], BadgeVariant> = {
    todo: 'secondary', in_progress: 'info', completed: 'success', cancelled: 'danger', blocked: 'destructive',
}
const taskStatusLabels: Record<TaskStatusBadgeProps['status'], string> = {
    todo: 'To Do', in_progress: 'In Progress', completed: 'Completed', cancelled: 'Cancelled', blocked: 'Blocked',
}

export const TaskStatusBadge = memo(
    forwardRef<HTMLSpanElement, TaskStatusBadgeProps>(
        ({ status, ...props }, ref) => (
            <Badge ref={ref} variant={taskStatusVariants[status]} {...props}>
                {taskStatusLabels[status]}
            </Badge>
        ),
    ),
)
TaskStatusBadge.displayName = 'TaskStatusBadge'

