import React from 'react';

export interface PageContainerProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  badge?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
  showNotice?: boolean;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  title,
  subtitle,
  badge,
  actions,
  className = '',
  showNotice = true,
}) => {
  return (
    <div className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-12 flex flex-col font-sans">
      {/* Thin Institutional Notice: Restrained water/conservation amber indicator */}
      {showNotice && (
        <div className="mb-6 py-2 px-3 rounded-sm bg-[#083358]/50 border border-[#28A9E0]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#8CD8F5]">
          <div className="flex items-center gap-2">
            <span className="text-[#E08A1E] font-semibold tracking-wide uppercase text-[11px]">
              Prototype Notice
            </span>
            <span className="hidden sm:inline text-white/20">|</span>
            <span className="text-[#DDF6FC]/85">
              Visual and material indicators are preliminary photographic guidance and do not replace certified structural assessment.
            </span>
          </div>
          <span className="text-[11px] text-[#8CD8F5]/70 shrink-0 font-medium">
            IKS &amp; Deterministic Rules
          </span>
        </div>
      )}

      {/* Editorial Page Statement / Title Area */}
      {(title || subtitle || actions) && (
        <div className="mb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-4 border-b border-[#28A9E0]/20">
          <div>
            <div className="flex items-center gap-3">
              {title && (
                <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
                  {title}
                </h1>
              )}
              {badge}
            </div>
            {subtitle && (
              <p className="text-xs sm:text-sm text-[#8CD8F5]/80 mt-1 max-w-3xl leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
          {actions && <div className="shrink-0 flex items-center gap-3">{actions}</div>}
        </div>
      )}

      {/* Main Content Workspace */}
      <main className={`flex-1 ${className}`}>{children}</main>

      {/* Restrained Architectural Footer */}
      <footer className="mt-16 pt-6 border-t border-[#28A9E0]/20 text-xs text-[#8CD8F5]/70 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-white">JalDrishti</span>
          <span>•</span>
          <span>Digital Intelligence for India's Traditional Water Heritage</span>
        </div>
        <div className="text-[11px] text-[#587286]">
          Sovereign Conservation Engineering • IKS Material Preservation
        </div>
      </footer>
    </div>
  );
};
