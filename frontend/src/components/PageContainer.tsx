import React from 'react';

export interface PageContainerProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  badge?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  title,
  subtitle,
  badge,
  actions,
  className = '',
}) => {
  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-8 flex flex-col">
      {/* Top Banner Notice: Technical Claim Boundary */}
      <div className="mb-6 px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] text-slate-400 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-amber-400 font-mono font-bold">[DISCLAIMER]</span>
          <span>
            Prototype decision-support system. Visual Condition &amp; Material metrics represent preliminary photographic guidance, not certified structural audits.
          </span>
        </div>
        <span className="font-mono text-[10px] text-sandstone-400 shrink-0">
          Indian Knowledge Systems (IKS) &amp; Deterministic Conservation
        </span>
      </div>

      {(title || subtitle || actions) && (
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-3">
              {title && (
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-sans">
                  {title}
                </h1>
              )}
              {badge}
            </div>
            {subtitle && (
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
          {actions && <div className="shrink-0">{actions}</div>}
        </div>
      )}

      <main className={`flex-1 ${className}`}>{children}</main>

      {/* Footer */}
      <footer className="mt-16 pt-6 pb-4 border-t border-slate-800/80 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-400">BaoliGuard</span>
          <span>•</span>
          <span>Jal-Dharohar Digital Intelligence Platform</span>
        </div>
        <div className="text-[11px] font-mono text-slate-500">
          Phase 1: PWA Foundation &amp; Design System | Anika Jain
        </div>
      </footer>
    </div>
  );
};
