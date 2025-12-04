'use client';

import type { TextareaHTMLAttributes } from 'react';
import clsx from 'clsx';

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

/**
 * Standard textarea with consistent styling across the site.
 *
 * @example
 * <TextArea placeholder="Tell us more..." rows={4} />
 */
export function TextArea({ className, ...props }: TextAreaProps) {
  return (
    <textarea
      className={clsx(
        'w-full resize-none rounded-lg border border-border bg-transparent px-4 py-3 text-sm',
        'placeholder:text-muted',
        'transition-colors focus:border-foreground focus:outline-none',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'min-h-[120px]',
        className,
      )}
      {...props}
    />
  );
}


