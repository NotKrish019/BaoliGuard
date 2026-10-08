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
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-5 pb-3 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            {tag && (
              <span className="text-[10px] font-mono tracking-widest uppercase font-semibold text-[#2498D5] px-1.5 py-0.5 bg-[#081E31] border border-[#2498D5]/30 rounded-xs">
                {tag}
              </span>
            )}
            {icon && <span className="text-[#7E98A8]">{icon}</span>}
            <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-[#F4F7F9] font-sans">
              {title}
            </h2>
          </div>
          {subtitle && <p className="text-xs text-[#7E98A8] max-w-3xl font-sans leading-relaxed">{subtitle}</p>}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
      <div>{children}</div>
    </section>
  );
};
