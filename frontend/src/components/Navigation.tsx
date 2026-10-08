import React from 'react';
import { AppRoute } from '../types';

export interface NavigationProps {
  currentRoute: AppRoute;
  onRouteChange: (route: AppRoute) => void;
  hasAnalysisResult?: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentRoute,
  onRouteChange,
  hasAnalysisResult = false,
}) => {
  // If on homepage, the top floating header handles primary navigation seamlessly
  if (currentRoute === '/') {
    return null;
  }

  const navItems: { route: AppRoute; label: string; subtitle: string; badge?: string }[] = [
    {
      route: '/upload',
      label: 'Survey Ingestion',
      subtitle: 'Image & Typology',
    },
    {
      route: '/analysis',
      label: 'Diagnostic Workspace',
      subtitle: 'SEE & ASSESS',
      badge: hasAnalysisResult ? 'Active' : undefined,
    },
    {
      route: '/report',
      label: 'Conservation Dossier',
      subtitle: 'IKS & REVIVE',
      badge: hasAnalysisResult ? 'Ready' : undefined,
    },
    {
      route: '/twin',
      label: 'Digital Twin 3D',
      subtitle: 'Spatial Simulation',
      badge: '3D Live',
    },
  ];

  return (
    <nav className="mt-14 border-b border-[#2498D5]/20 bg-[#052642]/80 backdrop-blur-md px-4 sm:px-8 py-2.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto no-scrollbar gap-2 sm:gap-4">
        <div className="flex items-center gap-1.5 sm:gap-2">
          {navItems.map((item) => {
            const isActive = currentRoute === item.route;
            return (
              <button
                key={item.route}
                onClick={() => onRouteChange(item.route)}
                className={`relative px-3.5 py-1.5 rounded-lg text-left transition-all duration-200 flex items-center gap-2 whitespace-nowrap ${
                  isActive
                    ? 'bg-[#0A6FB7] text-white shadow-sm shadow-[#063B63]'
                    : 'text-[#EAF7FB]/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs sm:text-sm font-semibold tracking-tight">
                      {item.label}
                    </span>
                    {item.badge && (
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded-full bg-[#8FD5F2] text-[#063B63] font-bold">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <div className="hidden sm:block text-[10px] text-[#8FD5F2]/80 font-mono">
                    {item.subtitle}
                  </div>
                </div>

                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-white rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        <div className="hidden md:flex items-center gap-2 text-xs font-mono text-[#8FD5F2]/90">
          <span className="text-white font-bold">SEE</span>
          <span>→</span>
          <span className="text-white font-bold">UNDERSTAND</span>
          <span>→</span>
          <span className="text-white font-bold">ASSESS</span>
          <span>→</span>
          <span className="text-white font-bold">REVIVE</span>
        </div>
      </div>
    </nav>
  );
};
