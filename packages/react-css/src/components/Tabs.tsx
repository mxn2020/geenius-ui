import { memo, useState, type ReactNode } from 'react'
import { cx } from '../lib/cx'

export interface TabsProps {
    tabs: { label: string; value: string; content: ReactNode }[]
    defaultValue?: string
    className?: string
    onChange?: (value: string) => void
}

export const Tabs = memo(({ tabs, defaultValue, className, onChange }: TabsProps) => {
    const [active, setActive] = useState(defaultValue || tabs[0]?.value || '')
    const handleTab = (value: string) => { setActive(value); onChange?.(value) }
    const activeTab = tabs.find(t => t.value === active)

    return (
        <div className={className}>
            <div className="gui-tabs-list" role="tablist">
                {tabs.map(t => (
                    <button
                        key={t.value}
                        type="button"
                        role="tab"
                        aria-selected={active === t.value}
                        className={cx('gui-tab', active === t.value && 'gui-tab--active')}
                        onClick={() => handleTab(t.value)}
                    >
                        {t.label}
                    </button>
                ))}
            </div>
            <div className="gui-tab-content" role="tabpanel">{activeTab?.content}</div>
        </div>
    )
})
Tabs.displayName = 'Tabs'
