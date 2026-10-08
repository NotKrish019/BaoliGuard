import React from 'react';

export interface PageHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  breadcrumbs?: { label: string; onClick?: () => void }[];
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  badge,
  title,
  subtitle,
  action,
  breadcrumbs,
  className = '',
}) => {
  return (
    <div className={`py-6 border-b border-[#28A9E0]/20 mb-8 ${className}`}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <div className="flex items-center gap-2 text-xs text-[#587286] mb-3">
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={crumb.label}>
              {idx > 0 && <span>/</span>}
              {crumb.onClick ? (
                <button
                  onClick={crumb.onClick}
                  className="hover:text-[#28A9E0] transition-colors"
                >
                  {crumb.label}
                </button>
              ) : (
                <span className="text-[#8CD8F5]">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          {badge && (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm bg-[#083358] border border-[#28A9E0]/30 text-[#8CD8F5] text-[11px] font-semibold tracking-wide uppercase mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#28A9E0]" />
              {badge}
            </div>
          )}
          <h1 className="text-2xl sm:text-3xl md:text-[34px] font-semibold tracking-tight text-white leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-1.5 text-xs sm:text-sm text-[#8CD8F5]/85 max-w-3xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {action && <div className="shrink-0 flex items-center gap-3">{action}</div>}
      </div>
    </div>
  );
};
