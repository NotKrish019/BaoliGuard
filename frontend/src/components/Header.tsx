import React, { useEffect, useState } from 'react';
import { JalDrishtiLogo } from './JalDrishtiLogo';
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
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
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
    const interval = setInterval(verifyHealth, 20000);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      isMounted = false;
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks: { route: AppRoute; label: string; badge?: string }[] = [
    { route: '/', label: 'HOME' },
    { route: '/upload', label: 'SCAN' },
    {
      route: '/analysis',
      label: 'DIAGNOSTICS',
      badge: hasAnalysisResult ? 'Active' : undefined,
    },
    {
      route: '/report',
      label: 'KNOWLEDGE',
      badge: hasAnalysisResult ? 'Ready' : undefined,
    },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || currentRoute !== '/'
          ? 'bg-[#063B63]/92 backdrop-blur-md shadow-lg shadow-[#031c30]/40 border-b border-[#2498D5]/20 py-2.5 sm:py-3'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand Logo & Title */}
        <div
          onClick={() => onRouteChange('/')}
          className="cursor-pointer group shrink-0"
        >
          <JalDrishtiLogo size="sm" light={true} />
        </div>

        {/* Floating Minimalist Center Navigation */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-2">
          {navLinks.map((item) => {
            const isActive = currentRoute === item.route;
            return (
              <button
                key={item.route}
                onClick={() => onRouteChange(item.route)}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-200 uppercase ${
                  isActive
                    ? 'text-white bg-white/15 backdrop-blur-sm shadow-sm'
                    : 'text-[#EAF7FB]/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="ml-1.5 text-[9px] font-mono px-1.5 py-0.2 rounded-full bg-[#2498D5]/40 text-[#8FD5F2] border border-[#8FD5F2]/40">
                    {item.badge}
                  </span>
                )}
                {isActive && (
                  <span className="absolute bottom-1 left-3.5 right-3.5 h-[2px] bg-[#8FD5F2] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Utility: Clean Rounded Search Pill matching Reference */}
        <div className="flex items-center gap-3">
          <div className="relative hidden sm:flex items-center">
            <input
              type="text"
              placeholder="Search dharohar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-40 lg:w-56 pl-3.5 pr-8 py-1.5 text-xs text-[#102433] bg-white rounded-full shadow-sm placeholder:text-[#5E7280] focus:outline-none focus:ring-2 focus:ring-[#2498D5] transition-all"
            />
            <div className="absolute right-1 w-6 h-6 rounded-full bg-[#0A6FB7] flex items-center justify-center text-white pointer-events-none">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Minimal Backend Status Pip */}
          <div
            className="flex items-center gap-1.5 text-[11px] font-mono text-[#EAF7FB]/75 px-2.5 py-1 rounded-full bg-black/20 border border-white/10"
            title={backendStatus === 'online' ? 'FastAPI Backend Online' : 'Local Standalone Mode'}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                backendStatus === 'online'
                  ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]'
                  : 'bg-amber-400 shadow-[0_0_8px_#fbbf24]'
              }`}
            />
            <span className="hidden lg:inline">
              {backendStatus === 'online' ? 'System Live' : 'Standalone'}
            </span>
          </div>

          {/* Quick CTA on non-home pages */}
          {currentRoute !== '/upload' && (
            <button
              onClick={() => onRouteChange('/upload')}
              className="text-xs font-semibold px-3 py-1.5 rounded-full bg-[#2498D5] hover:bg-[#8FD5F2] hover:text-[#063B63] text-white shadow-sm transition-all duration-200"
            >
              + Scan
            </button>
          )}
        </div>
      </div>

      {/* Mobile Navigation Row */}
      <div className="flex md:hidden items-center justify-around px-4 pt-2 border-t border-white/10 mt-2 overflow-x-auto no-scrollbar">
        {navLinks.map((item) => (
          <button
            key={item.route}
            onClick={() => onRouteChange(item.route)}
            className={`px-2.5 py-1 text-[11px] font-semibold tracking-wider uppercase whitespace-nowrap ${
              currentRoute === item.route ? 'text-white border-b-2 border-[#8FD5F2]' : 'text-white/70'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
};
