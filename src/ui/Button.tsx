'use client';

import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'subtle' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

const sizeMap: Record<ButtonSize, string> = {
  sm: 'h-9 rounded-full px-4 text-sm',
  md: 'h-11 rounded-full px-5 text-sm',
  lg: 'h-12 rounded-full px-6 text-base',
};

const variantMap: Record<ButtonVariant, string> = {
  primary:
    'bg-accent text-white shadow-button hover:bg-accent/90 active:bg-accent/80 disabled:bg-accent/60 disabled:text-white',
  secondary:
    'bg-panel text-text-ink border border-border-ghost shadow-card hover:bg-panel/90 disabled:bg-panel disabled:text-text-subtle',
  ghost: 'text-text-ink border border-transparent hover:bg-panel/60 active:bg-panel/80 disabled:text-text-subtle',
  subtle: 'bg-accent-soft text-accent-strong border border-accent/15 hover:border-accent/30 shadow-soft disabled:opacity-60',
  danger:
    'bg-danger/10 text-danger border border-danger/20 hover:bg-danger/15 active:bg-danger/20 disabled:text-danger/60',
};

type BaseButtonProps = {
  /**
   * Visual treatment for the button.
   * @default "primary"
   */
  variant?: ButtonVariant;
  /**
   * Vertical sizing token.
   * @default "md"
   */
  size?: ButtonSize;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  fullWidth?: boolean;
};

type ButtonAsButton = BaseButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: 'button';
  };

type ButtonAsAnchor = BaseButtonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    as: 'a';
  };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

const buildClasses = ({
  size,
  variant,
  fullWidth,
  className,
  isInteractive = true,
}: {
  size: ButtonSize;
  variant: ButtonVariant;
  fullWidth?: boolean;
  className?: string;
  isInteractive?: boolean;
}) =>
  clsx(
    'inline-flex items-center justify-center gap-2 font-medium transition-all',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-paper',
    sizeMap[size],
    variantMap[variant],
    fullWidth && 'w-full',
    !isInteractive && 'cursor-not-allowed opacity-80',
    className,
  );

/**
 * Render Vault themed button that centralizes the brand's rounded pills, focus rings,
 * and shadow treatments so every surface can share the same interaction patterns.
 *
 * @example
 * ```tsx
 * <Button variant="primary" iconLeft={<Sparkles />}>
 *   Create project
 * </Button>
 * ```
 */
export function Button(props: ButtonProps) {
  if (props.as === 'a') {
    const {
    as: unusedAs,
      variant = 'primary',
      size = 'md',
      iconLeft,
      iconRight,
      fullWidth,
      className,
      children,
      ...anchorProps
    } = props;

    void unusedAs;
    return (
      <a className={buildClasses({ size, variant, fullWidth, className })} {...anchorProps}>
        {iconLeft && <span className="inline-flex h-4 w-4 items-center justify-center">{iconLeft}</span>}
        <span className="whitespace-nowrap">{children}</span>
        {iconRight && <span className="inline-flex h-4 w-4 items-center justify-center">{iconRight}</span>}
      </a>
    );
  }

  const {
    as: unusedAs,
    variant = 'primary',
    size = 'md',
    iconLeft,
    iconRight,
    fullWidth,
    className,
    children,
    type = 'button',
    ...buttonProps
  } = props;

  void unusedAs;
  return (
    <button type={type} className={buildClasses({ size, variant, fullWidth, className, isInteractive: !buttonProps.disabled })} {...buttonProps}>
      {iconLeft && <span className="inline-flex h-4 w-4 items-center justify-center">{iconLeft}</span>}
      <span className="whitespace-nowrap">{children}</span>
      {iconRight && <span className="inline-flex h-4 w-4 items-center justify-center">{iconRight}</span>}
    </button>
  );
}

