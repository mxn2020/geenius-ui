import React, { forwardRef, memo, useCallback } from 'react'
import type { ButtonHTMLAttributes, ElementRef, ReactNode } from 'react'
import { cx } from '../lib/cx'
import type { ButtonVariant, ButtonSize } from '../lib/types'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant
    size?: ButtonSize
    loading?: boolean
    icon?: ReactNode
    children?: ReactNode
    asChild?: boolean
}

interface ChildElementProps extends Record<string, unknown> {
    className?: string
    disabled?: boolean
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const LoadingSpinner = memo(() => (
    <svg
        className="gui-spinner"
        style={{ marginLeft: '-0.25rem', marginRight: '0.5rem', height: '1rem', width: '1rem' }}
        fill="none"
        viewBox="0 0 24 24"
    >
        <circle
            style={{ opacity: 0.25 }}
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
        />
        <path
            style={{ opacity: 0.75 }}
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
    </svg>
))
LoadingSpinner.displayName = 'LoadingSpinner'

export const Button = memo(
    forwardRef<ElementRef<'button'>, ButtonProps>(
        (
            {
                variant = 'primary',
                size = 'md',
                loading = false,
                disabled = false,
                icon,
                className,
                children,
                onClick,
                asChild = false,
                ...props
            },
            ref,
        ) => {
            const isDisabled = disabled || loading
            const hasText = !!children
            const showIcon = !loading && !!icon

            const handleClick = useCallback(
                (e: React.MouseEvent<HTMLButtonElement>) => {
                    if (!isDisabled && onClick) onClick(e)
                },
                [isDisabled, onClick],
            )

            const buttonClasses = cx(
                'gui-btn',
                `gui-btn--${variant}`,
                `gui-btn--${size}`,
                isDisabled && 'gui-btn--disabled',
                className,
            )

            if (asChild) {
                if (!React.isValidElement(children)) {
                    console.warn('<Button asChild> expects a single valid React element child.')
                    return null
                }
                const childProps = (children as React.ReactElement<ChildElementProps>).props
                return React.cloneElement(
                    children as React.ReactElement<ChildElementProps>,
                    {
                        ref,
                        className: cx(buttonClasses, childProps.className),
                        disabled: isDisabled || childProps.disabled,
                        onClick: handleClick,
                        ...props,
                    },
                )
            }

            return (
                <button
                    ref={ref}
                    disabled={isDisabled}
                    onClick={handleClick}
                    className={buttonClasses}
                    {...props}
                >
                    {loading && <LoadingSpinner />}
                    {showIcon && (
                        <span className={cx('gui-btn__icon', hasText && 'gui-btn__icon--with-text')}>
                            {icon}
                        </span>
                    )}
                    {hasText ? <span className="gui-btn__text">{children}</span> : null}
                </button>
            )
        },
    ),
)
Button.displayName = 'Button'
