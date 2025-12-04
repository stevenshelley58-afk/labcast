'use client';

import type { InputHTMLAttributes } from 'react';
import clsx from 'clsx';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

/**
 * Standard text input with consistent styling across the site.
 *
 * @example
 * <Input type="email" placeholder="you@example.com" />
 */
export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={clsx(
        'w-full rounded-lg border border-border bg-transparent px-4 py-3 text-sm',
        'placeholder:text-muted',
        'transition-colors focus:border-foreground focus:outline-none',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  );
}

