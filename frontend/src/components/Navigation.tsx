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
  // Hide secondary workflow bar on the homepage
  if (currentRoute === '/') {
    return null;
  }

  const workflowSteps: { route: AppRoute; label: string; code: string; activeOn: AppRoute[] }[] = [
    {
      route: '/upload',
      label: 'SURVEY',
      code: '01',
      activeOn: ['/upload'],
    },
    {
      route: '/analysis',
      label: 'DIAGNOSE',
      code: '02',
      activeOn: ['/analysis'],
    },
    {
      route: '/report',
      label: 'CONSERVE',
      code: '03',
      activeOn: ['/report'],
    },
  ];

  return (
    <nav className="fixed top-14 left-0 right-0 z-40 h-10 bg-[#061828]/95 backdrop-blur-sm border-b border-white/10 flex items-center">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 flex items-center justify-between">
        {/* Restrained Workflow Steps */}
        <div className="flex items-center space-x-6 sm:space-x-8 h-10">
          {workflowSteps.map((step) => {
            const isActive = step.activeOn.includes(currentRoute);
            const isReady = hasAnalysisResult && (step.route === '/analysis' || step.route === '/report');
            return (
              <button
                key={step.route}
                onClick={() => onRouteChange(step.route)}
                className={`relative h-10 flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider transition-colors duration-150 ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-[#7E98A8] hover:text-[#F4F7F9]'
                }`}
              >
                <span className="text-[10px] text-[#2498D5] opacity-75">{step.code}</span>
                <span>{step.label}</span>
                {isReady && !isActive && (
                  <span className="w-1 h-1 bg-[#2498D5] rounded-full" />
                )}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#2498D5]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Technical Pipeline Sequence */}
        <div className="hidden md:flex items-center gap-2 text-[11px] font-mono text-[#7E98A8]">
          <span className={currentRoute === '/analysis' ? 'text-[#2498D5] font-semibold' : ''}>SEE</span>
          <span>→</span>
          <span className={currentRoute === '/report' ? 'text-[#2498D5] font-semibold' : ''}>UNDERSTAND</span>
          <span>→</span>
          <span className={currentRoute === '/analysis' ? 'text-[#2498D5] font-semibold' : ''}>ASSESS</span>
          <span>→</span>
          <span className={currentRoute === '/report' ? 'text-[#2498D5] font-semibold' : ''}>REVIVE</span>
        </div>
      </div>
    </nav>
  );
};
