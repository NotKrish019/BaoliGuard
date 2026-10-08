import React, { useEffect, useState } from 'react';
import { checkBackendHealth } from '../services/api';
import { AppRoute } from '../types';
import { JalDrishtiLogo } from './JalDrishtiLogo';

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
    { route: '/', label: 'Home' },
    { route: '/upload', label: 'Scan' },
    {
      route: '/analysis',
      label: 'Diagnostics',
      badge: hasAnalysisResult ? 'Active' : undefined,
    },
    {
      route: '/knowledge',
      label: 'Knowledge',
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-[#062B49]/95 backdrop-blur-md border-b border-[#28A9E0]/20 flex items-center transition-colors">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand Lockup: Small, Confident, Architectural */}
        <div
          onClick={() => onRouteChange('/')}
          className="flex items-center gap-2.5 cursor-pointer select-none group shrink-0"
        >
          <JalDrishtiLogo size="sm" />
          <div className="flex items-baseline gap-2">
            <span className="font-semibold tracking-tight text-sm text-white group-hover:text-[#28A9E0] transition-colors">
              JalDrishti
            </span>
            <span className="hidden xl:inline text-[11px] text-[#8CD8F5]/70 tracking-normal">
              Digital Water Heritage
            </span>
          </div>
        </div>

        {/* Primary Navigation: Restrained Typography, Subtle Underline */}
        <nav className="flex items-center space-x-4 sm:space-x-7 h-14 overflow-x-auto no-scrollbar">
          {navLinks.map((item) => {
            const isActive = currentRoute === item.route;
            return (
              <button
                key={item.route}
                onClick={() => onRouteChange(item.route)}
                className={`relative h-14 flex items-center gap-1.5 text-xs sm:text-[13px] font-medium transition-colors duration-150 whitespace-nowrap ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-[#8CD8F5]/80 hover:text-white'
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded-xs bg-[#083358] text-[#28A9E0] border border-[#28A9E0]/40">
                    {item.badge}
                  </span>
                )}
                {/* Thin Highlight Rule for Active State */}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#28A9E0] rounded-t-xs" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Instrument Panel Utilities */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Restrained Command Search Field */}
          <div className="relative hidden md:flex items-center">
            <input
              type="text"
              placeholder="Search dharohar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-40 xl:w-52 h-8 pl-3 pr-8 text-xs text-white bg-[#083358] border border-[#28A9E0]/30 rounded-sm placeholder:text-[#587286] focus:outline-none focus:border-[#28A9E0] transition-colors"
            />
            <svg
              className="absolute right-2.5 w-3.5 h-3.5 text-[#8CD8F5]/70 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* System Status Indicator */}
          <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-medium text-[#8CD8F5] px-2.5 py-1 bg-[#083358] border border-[#28A9E0]/20 rounded-sm">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                backendStatus === 'online' ? 'bg-emerald-400' : 'bg-amber-400'
              }`}
            />
            <span>{backendStatus === 'online' ? 'Online' : 'Local'}</span>
          </div>

          {/* Primary Action Button */}
          <button
            onClick={() => onRouteChange('/upload')}
            className="h-8 px-3.5 text-xs font-semibold text-white bg-[#087CC1] hover:bg-[#28A9E0] border border-[#28A9E0]/50 rounded-sm transition-all duration-150 flex items-center gap-1.5 shadow-sm active:scale-95"
          >
            <span>+</span>
            <span>Scan</span>
          </button>
        </div>
      </div>
    </header>
  );
};
