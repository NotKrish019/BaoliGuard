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
    sandstone: 'border-l-4 border-l-sandstone-500',
    jal: 'border-l-4 border-l-jal-500',
    surkhi: 'border-l-4 border-l-surkhi-500',
    none: '',
  };

  const baseClasses = elevated
    ? 'glass-panel-elevated rounded-xl shadow-xl'
    : 'glass-panel rounded-xl shadow-lg';

  const interactiveClasses = onClick
    ? 'cursor-pointer hover:border-slate-600 transition-all duration-200 hover:-translate-y-0.5'
    : '';

  return (
    <div
      onClick={onClick}
      className={`${baseClasses} ${accentClasses[borderAccent]} ${interactiveClasses} ${className}`}
    >
      {(title || subtitle || badge || action) && (
        <div className="px-5 py-4 border-b border-slate-800/80 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              {title && <h3 className="text-base font-semibold text-slate-100 tracking-tight">{title}</h3>}
              {badge}
            </div>
            {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      <div className="p-5">{children}</div>
      {footer && (
        <div className="px-5 py-3 bg-slate-950/40 border-t border-slate-800/80 rounded-b-xl text-xs text-slate-400">
          {footer}
        </div>
      )}
    </div>
  );
};
