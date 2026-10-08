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
    <section className={`mb-12 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-5 pb-3 border-b border-[#28A9E0]/20">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            {tag && (
              <span className="text-[11px] font-medium tracking-wide uppercase text-[#28A9E0] px-2 py-0.5 bg-[#083358] border border-[#28A9E0]/30 rounded-sm">
                {tag}
              </span>
            )}
            {icon && <span className="text-[#8CD8F5]">{icon}</span>}
            <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-white">
              {title}
            </h2>
          </div>
          {subtitle && (
            <p className="text-xs sm:text-sm text-[#8CD8F5]/80 max-w-3xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
      <div>{children}</div>
    </section>
  );
};
