import { forwardRef, memo, type ReactNode } from 'react'
import { cx } from '../lib/cx'

export interface SectionProps { title?: string; description?: string; action?: ReactNode; children: ReactNode; className?: string }

export const Section = memo(
    forwardRef<HTMLElement, SectionProps>(
        ({ title, description, action, children, className }, ref) => (
            <section ref={ref} className={cx('gui-section', className)}>
                {(title || action) && (
                    <div className="gui-section__header">
                        <div>
                            {title && <h2 className="gui-section__title">{title}</h2>}
                            {description && <p className="gui-section__description">{description}</p>}
                        </div>
                        {action}
                    </div>
                )}
                {children}
            </section>
        ),
    ),
)
Section.displayName = 'Section'
