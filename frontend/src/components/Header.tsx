import React, { useEffect, useState } from 'react';
import { checkBackendHealth } from '../services/api';
import { AppRoute } from '../types';

export interface HeaderProps {
  currentRoute: AppRoute;
  onRouteChange: (route: AppRoute) => void;
  hasAnalysisResult?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentRoute,
  onRouteChange,
  hasAnalysisResult = false,
}) => {
  const [backendStatus, setBackendStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    let isMounted = true;
    const verifyHealth = async () => {
      try {
        await checkBackendHealth();
        if (isMounted) {
          setBackendStatus('online');
        }
      } catch {
        if (isMounted) {
          setBackendStatus('offline');
        }
      }
    };

    verifyHealth();
    const interval = setInterval(verifyHealth, 25000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const navLinks: { route: AppRoute; label: string; badge?: string }[] = [
    { route: '/', label: 'HOME' },
    { route: '/upload', label: 'SCAN' },
    {
      route: '/analysis',
      label: 'DIAGNOSTICS',
      badge: hasAnalysisResult ? 'ACTIVE' : undefined,
    },
    {
      route: '/report',
      label: 'KNOWLEDGE',
      badge: hasAnalysisResult ? 'READY' : undefined,
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-[#04121E]/95 backdrop-blur-md border-b border-white/10 flex items-center transition-colors">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 flex items-center justify-between gap-6">
        {/* Brand Lockup: Small, Confident, Architectural */}
        <div
          onClick={() => onRouteChange('/')}
          className="flex items-center gap-2.5 cursor-pointer select-none group"
        >
          <div className="w-6 h-6 border border-[#2498D5] flex items-center justify-center bg-[#081E31] text-[#2498D5] transition-colors group-hover:border-white">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
              <path d="M4 18V8C4 5.79 5.79 4 8 4H16C18.21 4 20 5.79 20 8V18" />
              <path d="M7 18V12H17V18" />
              <circle cx="12" cy="8" r="1.5" fill="#2498D5" />
            </svg>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-sans font-semibold tracking-tight text-sm text-[#F4F7F9]">
              JalDrishti
            </span>
            <span className="hidden xl:inline text-[11px] font-mono text-[#7E98A8] uppercase tracking-wider">
              | Digital Water Heritage
            </span>
          </div>
        </div>

        {/* Primary Navigation: Restrained Typography, No Capsules */}
        <nav className="flex items-center space-x-6 sm:space-x-8 h-14">
          {navLinks.map((item) => {
            const isActive = currentRoute === item.route;
            return (
              <button
                key={item.route}
                onClick={() => onRouteChange(item.route)}
                className={`relative h-14 flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider transition-colors duration-150 ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-[#7E98A8] hover:text-[#F4F7F9]'
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="text-[9px] font-mono px-1 py-0.2 bg-[#0C2B45] text-[#2498D5] border border-[#2498D5]/30">
                    {item.badge}
                  </span>
                )}
                {/* Thin Highlight Rule for Active State */}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#2498D5]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Instrument Panel Utilities */}
        <div className="flex items-center gap-4">
          {/* Restrained Command Search Field */}
          <div className="relative hidden md:flex items-center">
            <input
              type="text"
              placeholder="Search dharohar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-48 xl:w-56 h-8 pl-3 pr-8 text-xs font-mono text-[#F4F7F9] bg-[#081E31] border border-white/15 rounded-xs placeholder:text-[#516A7A] focus:outline-none focus:border-[#2498D5] transition-colors"
            />
            <svg
              className="absolute right-2.5 w-3.5 h-3.5 text-[#7E98A8] pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* System Status Indicator */}
          <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono text-[#7E98A8] px-2 py-1 bg-[#081E31] border border-white/10 rounded-xs">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                backendStatus === 'online' ? 'bg-emerald-400' : 'bg-amber-400'
              }`}
            />
            <span>{backendStatus === 'online' ? 'ENGINE: LIVE' : 'ENGINE: LOCAL'}</span>
          </div>

          {/* Compact Technical Action Button */}
          {currentRoute !== '/upload' && (
            <button
              onClick={() => onRouteChange('/upload')}
              className="h-8 px-3.5 bg-[#2498D5] hover:bg-[#0A6FB7] text-white text-xs font-mono uppercase tracking-wider font-semibold rounded-xs border border-[#2498D5] transition-colors"
            >
              + SCAN
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
