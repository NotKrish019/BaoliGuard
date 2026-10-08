import React from 'react';

export interface SectionProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  tag?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const Section: React.FC<SectionProps> = ({
  title,
  subtitle,
  icon,
  tag,
  action,
  children,
  className = '',
}) => {
  return (
    <section className={`mb-10 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-5 pb-3 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2 mb-1">
            {tag && (
              <span className="text-[11px] font-mono tracking-widest uppercase font-semibold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/50">
                {tag}
              </span>
            )}
            {icon && <span className="text-slate-400">{icon}</span>}
            <h2 className="text-xl font-bold tracking-tight text-white">{title}</h2>
          </div>
          {subtitle && <p className="text-xs text-slate-400 max-w-2xl">{subtitle}</p>}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
      <div>{children}</div>
    </section>
  );
};
