import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  badge?: React.ReactNode;
  action?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  elevated?: boolean;
  borderAccent?: 'sandstone' | 'jal' | 'surkhi' | 'none';
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  badge,
  action,
  footer,
  className = '',
  borderAccent = 'none',
  onClick,
}) => {
  const accentClasses = {
    sandstone: 'border-l-2 border-l-[#D8C8B0]',
    jal: 'border-l-2 border-l-[#2498D5]',
    surkhi: 'border-l-2 border-l-[#C9902E]',
    none: '',
  };

  const baseClasses = 'bg-[#081E31] border border-white/10 rounded-xs';

  const interactiveClasses = onClick
    ? 'cursor-pointer hover:border-white/25 transition-colors duration-150'
    : '';

  return (
    <div
      onClick={onClick}
      className={`${baseClasses} ${accentClasses[borderAccent]} ${interactiveClasses} ${className}`}
    >
      {(title || subtitle || badge || action) && (
        <div className="px-4 py-3 border-b border-white/10 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              {title && (
                <h3 className="text-xs sm:text-sm font-semibold text-[#F4F7F9] tracking-tight font-sans">
                  {title}
                </h3>
              )}
              {badge}
            </div>
            {subtitle && <p className="text-[11px] text-[#7E98A8] mt-0.5 font-sans leading-snug">{subtitle}</p>}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      <div className="p-4 sm:p-5">{children}</div>
      {footer && (
        <div className="px-4 py-2.5 bg-[#051624] border-t border-white/10 text-xs text-[#7E98A8] font-mono">
          {footer}
        </div>
      )}
    </div>
  );
};
