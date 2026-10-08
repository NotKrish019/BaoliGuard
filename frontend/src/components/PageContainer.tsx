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
    <div className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-8 pt-28 sm:pt-32 pb-12 flex flex-col">
      {/* Thin Institutional Notice: Replaces Generic Notification Card */}
      {showNotice && (
        <div className="mb-6 py-2 border-y border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] font-mono text-[#7E98A8]">
          <div className="flex items-center gap-2">
            <span className="text-[#C9902E] font-semibold tracking-wider uppercase">
              PROTOTYPE NOTICE
            </span>
            <span className="hidden sm:inline text-white/20">|</span>
            <span className="text-[#94A7B5]">
              Visual and material indicators are preliminary photographic guidance and do not replace certified structural or conservation assessment.
            </span>
          </div>
          <span className="text-[10px] text-[#516A7A] uppercase tracking-wider shrink-0">
            IKS &amp; Deterministic Rules
          </span>
        </div>
      )}

      {/* Editorial Page Statement / Title Area */}
      {(title || subtitle || actions) && (
        <div className="mb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3">
              {title && (
                <h1 className="text-2xl sm:text-3xl font-sans font-semibold tracking-tight text-[#F4F7F9]">
                  {title}
                </h1>
              )}
              {badge}
            </div>
            {subtitle && (
              <p className="text-xs sm:text-sm text-[#7E98A8] mt-1 max-w-3xl leading-relaxed font-sans">
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
      <footer className="mt-16 pt-6 border-t border-white/10 text-xs font-mono text-[#516A7A] flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="font-sans font-semibold text-[#94A7B5]">JalDrishti</span>
          <span>•</span>
          <span>Digital Intelligence for India's Traditional Water Heritage</span>
        </div>
        <div className="text-[11px]">
          Sovereign Conservation Engineering • IKS Material Preservation
        </div>
      </footer>
    </div>
  );
};
