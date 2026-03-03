

// Sliding panel component (similar to Dialog but slides from side)

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  forwardRef,
  ReactNode,
  memo,
} from 'react'
import { createPortal } from 'react-dom'
import { cn } from '../lib/utils'
import { X } from 'lucide-react'

// Types
type SheetSide = 'left' | 'right' | 'top' | 'bottom'

// Context for managing sheet state
interface SheetContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  side: SheetSide
}

const SheetContext = createContext<SheetContextValue | undefined>(undefined)

const useSheetContext = () => {
  const context = useContext(SheetContext)
  if (!context) {
    throw new Error(
      'Sheet compound components must be used within a Sheet component',
    )
  }
  return context
}

// Root Sheet component
interface SheetProps {
  children: ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  side?: SheetSide
}

export const Sheet = memo(function Sheet({
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  side = 'right',
}: SheetProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen)

  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : internalOpen

  const handleOpenChange = useCallback(
    (newOpen: boolean) => {
      if (!isControlled) {
        setInternalOpen(newOpen)
      }
      onOpenChange?.(newOpen)
    },
    [isControlled, onOpenChange],
  )

  return (
    <SheetContext.Provider value={{ open, setOpen: handleOpenChange, side }}>
      {children}
    </SheetContext.Provider>
  )
})

// SheetTrigger component
interface SheetTriggerProps {
  children: ReactNode
  asChild?: boolean
  className?: string
}

export const SheetTrigger = memo(
  forwardRef<HTMLButtonElement, SheetTriggerProps>(
    ({ children, asChild = false, className }, ref) => {
      const { setOpen } = useSheetContext()

      const handleClick = useCallback(() => {
        setOpen(true)
      }, [setOpen])

      if (asChild) {
        const child = children as React.ReactElement
        return (
          <div
            onClick={handleClick}
            className={cn('cursor-pointer', className)}
          >
            {child}
          </div>
        )
      }

      return (
        <button
          ref={ref}
          type="button"
          onClick={handleClick}
          className={cn('cursor-pointer', className)}
        >
          {children}
        </button>
      )
    },
  ),
)
SheetTrigger.displayName = 'SheetTrigger'

// SheetPortal component
interface SheetPortalProps {
  children: ReactNode
  container?: HTMLElement
}

export const SheetPortal = memo(function SheetPortal({
  children,
  container,
}: SheetPortalProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  if (!mounted) {
    return null
  }

  const portalContainer = container || document.body

  if (!portalContainer) {
    return null
  }

  return mounted ? createPortal(children, portalContainer) : null
})

// SheetOverlay component
interface SheetOverlayProps {
  className?: string
}

export const SheetOverlay = memo(
  forwardRef<HTMLDivElement, SheetOverlayProps>(({ className }, ref) => {
    const { setOpen, open } = useSheetContext()

    const handleClick = useCallback(
      (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
          setOpen(false)
        }
      },
      [setOpen],
    )

    return (
      <div
        ref={ref}
        onClick={handleClick}
        className={cn(
          'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm cursor-pointer',
          'transition-opacity duration-300',
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          className,
        )}
        data-state={open ? 'open' : 'closed'}
      />
    )
  }),
)
SheetOverlay.displayName = 'SheetOverlay'

// Animation classes by side
const slideAnimations: Record<SheetSide, string> = {
  right:
    'data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right',
  left: 'data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left',
  top: 'data-[state=open]:slide-in-from-top data-[state=closed]:slide-out-to-top',
  bottom:
    'data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom',
}

const sidePositions: Record<SheetSide, string> = {
  right: 'right-0 top-0 h-full w-full max-w-md',
  left: 'left-0 top-0 h-full w-full max-w-md',
  top: 'top-0 left-0 w-full h-auto max-h-[80vh]',
  bottom: 'bottom-0 left-0 w-full h-auto max-h-[80vh]',
}

// SheetContent component
interface SheetContentProps {
  children: ReactNode
  className?: string
  showCloseButton?: boolean
}

export const SheetContent = memo(
  forwardRef<HTMLDivElement, SheetContentProps>(
    ({ children, className, showCloseButton = true }, ref) => {
      const { open, setOpen, side } = useSheetContext()
      const contentRef = useRef<HTMLDivElement>(null)

      // Merge refs
      const mergedRef = useCallback(
        (node: HTMLDivElement | null) => {
          if (contentRef.current !== node) {
            ;(
              contentRef as React.MutableRefObject<HTMLDivElement | null>
            ).current = node
          }
          if (typeof ref === 'function') {
            ref(node)
          } else if (ref) {
            ref.current = node
          }
        },
        [ref],
      )

      const handleCloseClick = useCallback(() => {
        setOpen(false)
      }, [setOpen])

      // Handle escape key
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

      // Focus management
      useEffect(() => {
        if (open && contentRef.current) {
          const focusableElements = contentRef.current.querySelectorAll(
            `button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])`,
          )
          const firstElement = focusableElements[0] as HTMLElement
          if (firstElement) {
            firstElement.focus()
          }
        }
      }, [open])

      // Body scroll lock
      useEffect(() => {
        if (open) {
          document.body.style.overflow = 'hidden'
          return () => {
            document.body.style.overflow = 'unset'
          }
        }
      }, [open])

      // Handle exit animation
      const [shouldRender, setShouldRender] = useState(false)

      // We need a separate state for the animation trigger to ensure the browser paints the "closed" state first
      const [dataState, setDataState] = useState<'open' | 'closed'>('closed')

      useEffect(() => {
        if (open) {
          setShouldRender(true)
          // Small delay to allow mount to happen with initial state before switching to open
          // This triggers the CSS transition/animation
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              setDataState('open')
            })
          })
        } else {
          setDataState('closed')
          const timer = setTimeout(() => {
            setShouldRender(false)
          }, 300) // Match duration-300
          return () => clearTimeout(timer)
        }
      }, [open])

      if (!shouldRender) return null

      return (
        <SheetPortal>
          <div className="fixed inset-0 z-50 pointer-events-none">
            <SheetOverlay />
            <div
              ref={mergedRef}
              className={cn(
                'fixed z-50 flex flex-col gap-4 border bg-card p-6 shadow-xl pointer-events-auto',
                'transition-all duration-300 ease-in-out', // Changed to transition-all for width animations
                'data-[state=open]:animate-in data-[state=closed]:animate-out',
                sidePositions[side],
                slideAnimations[side],
                side === 'left' && 'border-r',
                side === 'right' && 'border-l',
                side === 'top' && 'border-b rounded-b-lg',
                side === 'bottom' && 'border-t rounded-t-lg',
                className,
              )}
              role="dialog"
              aria-modal="true"
              data-state={dataState}
            >
              {children}
              {showCloseButton && (
                <button
                  type="button"
                  onClick={handleCloseClick}
                  className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-card transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:pointer-events-none cursor-pointer"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </button>
              )}
            </div>
          </div>
        </SheetPortal>
      )
    },
  ),
)
SheetContent.displayName = 'SheetContent'

// SheetHeader component
interface SheetHeaderProps {
  children: ReactNode
  className?: string
}

export const SheetHeader = memo(
  forwardRef<HTMLDivElement, SheetHeaderProps>(
    ({ children, className }, ref) => {
      return (
        <div ref={ref} className={cn('flex flex-col space-y-2', className)}>
          {children}
        </div>
      )
    },
  ),
)
SheetHeader.displayName = 'SheetHeader'

// SheetTitle component
interface SheetTitleProps {
  children: ReactNode
  className?: string
}

export const SheetTitle = memo(
  forwardRef<HTMLHeadingElement, SheetTitleProps>(
    ({ children, className }, ref) => {
      return (
        <h2
          ref={ref}
          className={cn(
            'text-lg font-semibold leading-none tracking-tight',
            className,
          )}
        >
          {children}
        </h2>
      )
    },
  ),
)
SheetTitle.displayName = 'SheetTitle'

// SheetDescription component
interface SheetDescriptionProps {
  children: ReactNode
  className?: string
}

export const SheetDescription = memo(
  forwardRef<HTMLParagraphElement, SheetDescriptionProps>(
    ({ children, className }, ref) => {
      return (
        <p ref={ref} className={cn('text-sm text-muted-foreground', className)}>
          {children}
        </p>
      )
    },
  ),
)
SheetDescription.displayName = 'SheetDescription'

// SheetFooter component
interface SheetFooterProps {
  children: ReactNode
  className?: string
}

export const SheetFooter = memo(
  forwardRef<HTMLDivElement, SheetFooterProps>(
    ({ children, className }, ref) => {
      return (
        <div
          ref={ref}
          className={cn(
            'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-auto',
            className,
          )}
        >
          {children}
        </div>
      )
    },
  ),
)
SheetFooter.displayName = 'SheetFooter'

// SheetClose component
interface SheetCloseProps {
  children: ReactNode
  asChild?: boolean
  className?: string
}

export const SheetClose = memo(
  forwardRef<HTMLButtonElement, SheetCloseProps>(
    ({ children, asChild = false, className }, ref) => {
      const { setOpen } = useSheetContext()

      const handleClick = useCallback(() => {
        setOpen(false)
      }, [setOpen])

      if (asChild) {
        const child = children as React.ReactElement
        return (
          <div
            onClick={handleClick}
            className={cn('cursor-pointer', className)}
          >
            {child}
          </div>
        )
      }

      return (
        <button
          ref={ref}
          type="button"
          onClick={handleClick}
          className={cn('cursor-pointer', className)}
        >
          {children}
        </button>
      )
    },
  ),
)
SheetClose.displayName = 'SheetClose'
