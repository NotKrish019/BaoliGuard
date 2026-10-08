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
      label: 'Survey',
      code: '01',
      activeOn: ['/upload'],
    },
    {
      route: '/analysis',
      label: 'Diagnose',
      code: '02',
      activeOn: ['/analysis'],
    },
    {
      route: '/report',
      label: 'Conserve',
      code: '03',
      activeOn: ['/report'],
    },
  ];

  return (
    <nav className="fixed top-14 left-0 right-0 z-40 h-10 bg-[#062B49]/95 backdrop-blur-md border-b border-[#28A9E0]/20 flex items-center transition-colors">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Restrained Workflow Steps */}
        <div className="flex items-center space-x-6 sm:space-x-8 h-10 overflow-x-auto no-scrollbar">
          {workflowSteps.map((step) => {
            const isActive = step.activeOn.includes(currentRoute);
            const isReady = hasAnalysisResult && (step.route === '/analysis' || step.route === '/report');
            return (
              <button
                key={step.route}
                onClick={() => onRouteChange(step.route)}
                className={`relative h-10 flex items-center gap-1.5 text-xs sm:text-[13px] font-medium transition-colors duration-150 whitespace-nowrap ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-[#8CD8F5]/75 hover:text-white'
                }`}
              >
                <span className="text-[10px] text-[#28A9E0] font-semibold">{step.code}</span>
                <span>{step.label}</span>
                {isReady && !isActive && (
                  <span className="w-1.5 h-1.5 bg-[#28A9E0] rounded-full" />
                )}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#28A9E0] rounded-t-xs" />
                )}
              </button>
            );
          })}
        </div>

        {/* Technical Pipeline Sequence */}
        <div className="hidden lg:flex items-center gap-2 text-xs text-[#8CD8F5]/70 font-medium">
          <span className={currentRoute === '/upload' ? 'text-[#28A9E0] font-semibold' : ''}>SEE</span>
          <span>→</span>
          <span className={currentRoute === '/analysis' ? 'text-[#28A9E0] font-semibold' : ''}>UNDERSTAND</span>
          <span>→</span>
          <span className={currentRoute === '/analysis' ? 'text-[#28A9E0] font-semibold' : ''}>ASSESS</span>
          <span>→</span>
          <span className={currentRoute === '/report' ? 'text-[#28A9E0] font-semibold' : ''}>REVIVE</span>
        </div>
      </div>
    </nav>
  );
};
