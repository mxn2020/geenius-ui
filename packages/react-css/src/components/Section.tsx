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

// Compound Section sub-components
export const SectionHeader = memo(({ children, className }: { children: ReactNode; className?: string }) => (
    <div className={cx('gui-section__header', className)}>{children}</div>
))
SectionHeader.displayName = 'SectionHeader'

export const SectionTitle = memo(({ children, className }: { children: ReactNode; className?: string }) => (
    <h2 className={cx('gui-section__title', className)}>{children}</h2>
))
SectionTitle.displayName = 'SectionTitle'

export const SectionDescription = memo(({ children, className }: { children: ReactNode; className?: string }) => (
    <p className={cx('gui-section__description', className)}>{children}</p>
))
SectionDescription.displayName = 'SectionDescription'

export const SectionContent = memo(({ children, className }: { children: ReactNode; className?: string }) => (
    <div className={cx('gui-section__content', className)}>{children}</div>
))
SectionContent.displayName = 'SectionContent'

export const CompoundSection = Section

