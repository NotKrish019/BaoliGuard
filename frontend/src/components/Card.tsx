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
  elevated = false,
  borderAccent = 'none',
  onClick,
}) => {
  const accentClasses = {
    sandstone: 'border-l-2 border-l-[#D8C8B0]',
    jal: 'border-l-2 border-l-[#28A9E0]',
    surkhi: 'border-l-2 border-l-[#E08A1E]',
    none: '',
  };

  const baseClasses = elevated
    ? 'bg-[#0C3D66]/85 border border-[#28A9E0]/30 rounded-sm shadow-panel'
    : 'bg-[#083358]/70 border border-[#28A9E0]/20 rounded-sm';

  const interactiveClasses = onClick
    ? 'cursor-pointer hover:border-[#28A9E0]/50 transition-all duration-150'
    : '';

  return (
    <div
      onClick={onClick}
      className={`${baseClasses} ${accentClasses[borderAccent]} ${interactiveClasses} ${className}`}
    >
      {(title || subtitle || badge || action) && (
        <div className="px-4 py-3 border-b border-[#28A9E0]/15 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              {title && (
                <h3 className="text-xs sm:text-sm font-semibold text-white tracking-tight">
                  {title}
                </h3>
              )}
              {badge}
            </div>
            {subtitle && <p className="text-[11px] text-[#8CD8F5]/80 mt-0.5 leading-snug">{subtitle}</p>}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      <div className="p-4">{children}</div>
      {footer && (
        <div className="px-4 py-2.5 bg-[#062B49]/60 border-t border-[#28A9E0]/15 rounded-b-sm">
          {footer}
        </div>
      )}
    </div>
  );
};
