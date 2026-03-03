

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  ReactNode,
  ReactElement,
  memo,
} from 'react'
import { createPortal } from 'react-dom'
import { cn } from '../lib/utils'
import {
  useAnimatedOpen,
  ANIMATION_DURATION,
  Z_INDEX,
  hoverColors,
  borderRadius,
  transitions,
} from '../lib/animation'

// Context for managing dropdown state
interface DropdownMenuContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  triggerRef: React.RefObject<HTMLDivElement | null>
}

const DropdownMenuContext = createContext<DropdownMenuContextValue | undefined>(
  undefined,
)

const useDropdownMenuContext = () => {
  const context = useContext(DropdownMenuContext)
  if (!context) {
    throw new Error(
      'DropdownMenu compound components must be used within a DropdownMenu component',
    )
  }
  return context
}

// Root DropdownMenu component
interface DropdownMenuProps {
  children: ReactNode
}

export const DropdownMenu = memo(function DropdownMenu({
  children,
}: DropdownMenuProps) {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLDivElement>(null)

  const handleSetOpen = useCallback((newOpen: boolean) => {
    setOpen(newOpen)
  }, [])

  return (
    <DropdownMenuContext.Provider
      value={{ open, setOpen: handleSetOpen, triggerRef }}
    >
      <div ref={triggerRef} className="relative inline-block text-left">
        {children}
      </div>
    </DropdownMenuContext.Provider>
  )
})

// DropdownMenuTrigger component
interface DropdownMenuTriggerProps {
  asChild?: boolean
  children: ReactNode
  className?: string
}

export const DropdownMenuTrigger = memo(function DropdownMenuTrigger({
  asChild = false,
  children,
  className,
}: DropdownMenuTriggerProps) {
  const { open, setOpen } = useDropdownMenuContext()

  const handleClick = useCallback(() => {
    setOpen(!open)
  }, [open, setOpen])

  if (asChild) {
    // If asChild is true, clone the child element and add our props
    const child = children as ReactElement
    return (
      <div onClick={handleClick} className={cn('cursor-pointer', className)}>
        {child}
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        'inline-flex justify-center w-full rounded-lg border border-border shadow-sm px-4 py-2 bg-card text-sm font-medium text-foreground hover:bg-surface focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary cursor-pointer',
        className,
      )}
      aria-expanded={open}
      aria-haspopup="true"
    >
      {children}
    </button>
  )
})

// DropdownMenuContent component
interface DropdownMenuContentProps {
  children: ReactNode
  align?: 'start' | 'center' | 'end'
  className?: string
  sideOffset?: number
}

export const DropdownMenuContent = memo(function DropdownMenuContent({
  children,
  align = 'end',
  className,
  sideOffset = 4,
}: DropdownMenuContentProps) {
  const { open, setOpen, triggerRef } = useDropdownMenuContext()
  const contentRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ top: 0, left: 0 })

  // Use animated open for proper enter/exit animations
  const { shouldRender, dataState, animationStyle } = useAnimatedOpen(open, {
    duration: ANIMATION_DURATION.fast,
  })

  // Calculate position based on trigger element
  useEffect(() => {
    if (open && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      const scrollY = window.scrollY
      const scrollX = window.scrollX

      let left = rect.left + scrollX
      if (align === 'end') {
        left = rect.right + scrollX - 224 // 224px = w-56
      } else if (align === 'center') {
        left = rect.left + scrollX + rect.width / 2 - 112
      }

      setPosition({
        top: rect.bottom + scrollY + sideOffset,
        left: Math.max(8, left), // Ensure min 8px from left edge
      })
    }
  }, [open, triggerRef, align, sideOffset])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open, setOpen, triggerRef])

  // Close dropdown on Escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    if (open) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [open, setOpen])

  // Close on scroll
  useEffect(() => {
    if (open) {
      const handleScroll = () => setOpen(false)
      window.addEventListener('scroll', handleScroll, true)
      return () => window.removeEventListener('scroll', handleScroll, true)
    }
  }, [open, setOpen])

  if (!shouldRender) return null

  // Determine origin based on alignment
  const originClass =
    align === 'start'
      ? 'origin-top-left'
      : align === 'end'
        ? 'origin-top-right'
        : 'origin-top'

  // Use portal to render at body level
  return createPortal(
    <div
      ref={contentRef}
      data-state={dataState}
      style={{
        position: 'fixed',
        top: position.top,
        left: position.left,
        ...animationStyle,
      }}
      className={cn(
        // Base styles
        `z-[${Z_INDEX.dropdown}] w-56 ${borderRadius.default} border border-border shadow-lg bg-card focus:outline-none`,
        // Animation classes
        originClass,
        'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-top-2',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:slide-out-to-top-2',
        className,
      )}
      role="menu"
      aria-orientation="vertical"
    >
      <div className="p-1" role="none">
        {children}
      </div>
    </div>,
    document.body,
  )
})

// DropdownMenuItem component
interface DropdownMenuItemProps {
  children: ReactNode
  onClick?: (event: React.MouseEvent) => void
  disabled?: boolean
  className?: string
  asChild?: boolean
}

export const DropdownMenuItem = memo(function DropdownMenuItem({
  children,
  onClick,
  disabled = false,
  className,
  asChild = false,
}: DropdownMenuItemProps) {
  const { setOpen } = useDropdownMenuContext()

  const handleClick = useCallback(
    (event: React.MouseEvent) => {
      if (disabled) return
      onClick?.(event)
      setOpen(false)
    },
    [disabled, onClick, setOpen],
  )

  if (asChild) {
    const child = children as React.ReactElement
    return (
      <div
        role="menuitem"
        onClick={handleClick}
        className={cn(
          'flex items-center gap-2 w-full text-left px-3 py-2 text-sm text-foreground',
          'rounded-md transition-all duration-150',
          'hover:bg-primary/10 hover:text-primary',
          disabled && 'opacity-50 cursor-not-allowed',
          !disabled && 'cursor-pointer',
          className,
        )}
      >
        {child}
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        'flex items-center gap-2 w-full text-left px-3 py-2 text-sm text-foreground',
        'rounded-md transition-all duration-150',
        'hover:bg-primary/10 hover:text-primary',
        disabled && 'opacity-50 cursor-not-allowed',
        !disabled && 'cursor-pointer',
        className,
      )}
      role="menuitem"
    >
      {children}
    </button>
  )
})

// Additional components for completeness

// DropdownMenuSeparator component
interface DropdownMenuSeparatorProps {
  className?: string
}

export const DropdownMenuSeparator = memo(function DropdownMenuSeparator({
  className,
}: DropdownMenuSeparatorProps) {
  return (
    <div className={cn('h-px bg-border my-1', className)} role="separator" />
  )
})

// DropdownMenuLabel component
interface DropdownMenuLabelProps {
  children: ReactNode
  className?: string
}

export const DropdownMenuLabel = memo(function DropdownMenuLabel({
  children,
  className,
}: DropdownMenuLabelProps) {
  return (
    <div
      className={cn(
        'px-4 py-2 text-sm font-semibold text-foreground',
        className,
      )}
      role="none"
    >
      {children}
    </div>
  )
})

// DropdownMenuCheckboxItem component
interface DropdownMenuCheckboxItemProps {
  children: ReactNode
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  className?: string
}

export const DropdownMenuCheckboxItem = memo(function DropdownMenuCheckboxItem({
  children,
  checked = false,
  onCheckedChange,
  disabled = false,
  className,
}: DropdownMenuCheckboxItemProps) {
  const handleClick = useCallback(() => {
    if (!disabled && onCheckedChange) {
      onCheckedChange(!checked)
    }
  }, [disabled, onCheckedChange, checked])

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        'w-full text-left flex items-center px-4 py-2 text-sm text-foreground hover:bg-surface hover:text-foreground cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
        className,
      )}
      role="menuitemcheckbox"
      aria-checked={checked}
    >
      <span className="mr-2 flex h-3.5 w-3.5 items-center justify-center">
        {checked && (
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </span>
      {children}
    </button>
  )
})
