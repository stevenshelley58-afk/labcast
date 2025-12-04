import type { ElementType, ReactNode } from 'react';
import clsx from 'clsx';

type SectionTone = 'default' | 'surface' | 'panel';
type SectionBorder = 'none' | 'top' | 'bottom' | 'both';

const toneStyles: Record<SectionTone, string> = {
  default: 'bg-background',
  surface: 'bg-surface',
  panel: 'bg-panel',
};

const borderStyles: Record<SectionBorder, string> = {
  none: '',
  top: 'border-t border-border/50',
  bottom: 'border-b border-border/50',
  both: 'border-y border-border/50',
};

export interface PageSectionProps {
  children: ReactNode;
  id?: string;
  as?: ElementType;
  tone?: SectionTone;
  border?: SectionBorder;
  className?: string;
  containerClassName?: string;
}

/**
 * Shared marketing section wrapper that aligns spacing, background tones,
 * and borders with the Render Vault visual language.
 */
export function PageSection({
  children,
  id,
  as: Component = 'section',
  tone = 'default',
  border = 'top',
  className,
  containerClassName,
}: PageSectionProps) {
  return (
    <Component
      id={id}
      className={clsx('px-6 py-24 md:py-32', toneStyles[tone], borderStyles[border], className)}
    >
      <div className={clsx('mx-auto w-full max-w-6xl', containerClassName)}>{children}</div>
    </Component>
  );
}


