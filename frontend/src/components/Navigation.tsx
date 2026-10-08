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
  const navItems: { route: AppRoute; label: string; icon: string; subtitle: string; badge?: string }[] = [
    {
      route: '/',
      label: 'Overview',
      icon: '🏛️',
      subtitle: 'Platform & Architecture',
    },
    {
      route: '/upload',
      label: 'Survey Ingestion',
      icon: '📤',
      subtitle: 'Image & Typology',
    },
    {
      route: '/analysis',
      label: 'Diagnostic Workspace',
      icon: '🔬',
      subtitle: 'SEE & ASSESS',
      badge: hasAnalysisResult ? 'Active' : undefined,
    },
    {
      route: '/report',
      label: 'Conservation Dossier',
      icon: '📜',
      subtitle: 'IKS & REVIVE',
      badge: hasAnalysisResult ? 'Ready' : undefined,
    },
    {
      route: '/twin',
      label: 'Digital Twin 3D',
      icon: '🌐',
      subtitle: 'Spatial Simulation',
      badge: '3D Live',
    },
  ];

  return (
    <nav className="border-b border-slate-800/80 bg-heritage-950/40 backdrop-blur px-4 sm:px-8 py-2">
      <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto no-scrollbar gap-1 sm:gap-3">
        <div className="flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => {
            const isActive = currentRoute === item.route;
            return (
              <button
                key={item.route}
                onClick={() => onRouteChange(item.route)}
                className={`relative px-3 sm:px-4 py-2 rounded-xl text-left transition-all duration-200 flex items-center gap-2.5 whitespace-nowrap group ${
                  isActive
                    ? 'bg-slate-900 text-white border border-slate-700/80 shadow-md shadow-slate-950/50'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
                }`}
              >
                <span className="text-base group-hover:scale-110 transition-transform">
                  {item.icon}
                </span>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs sm:text-sm font-semibold tracking-tight">
                      {item.label}
                    </span>
                    {item.badge && (
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded-full bg-jal-950 text-jal-300 border border-jal-800">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <div className="hidden sm:block text-[10px] text-slate-500 font-mono">
                    {item.subtitle}
                  </div>
                </div>

                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-sandstone-500 via-jal-400 to-amber-500 rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        <div className="hidden md:flex items-center gap-2 text-xs font-mono text-slate-500">
          <span className="text-amber-400">SEE</span>
          <span>→</span>
          <span className="text-amber-400">UNDERSTAND</span>
          <span>→</span>
          <span className="text-amber-400">ASSESS</span>
          <span>→</span>
          <span className="text-amber-400">REVIVE</span>
        </div>
      </div>
    </nav>
  );
};
