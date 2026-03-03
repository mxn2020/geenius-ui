

import { ReactNode } from 'react'

interface AnimateInProps {
  children: ReactNode
  className?: string
  delay?: number
}

/**
 * Simple animation wrapper that fades in content
 * Used to provide smooth transitions when content loads
 */
export function AnimateIn({
  children,
  className = '',
  delay = 0,
}: AnimateInProps) {
  const style = delay > 0 ? { animationDelay: `${delay}ms` } : undefined

  return (
    <div
      className={`animate-in fade-in duration-200 ${className}`}
      style={style}
    >
      {children}
    </div>
  )
}
