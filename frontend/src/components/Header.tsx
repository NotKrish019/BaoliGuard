import React, { useEffect, useState } from 'react';
import { StatusBadge } from './StatusBadge';
import { checkBackendHealth } from '../services/api';
import { AppRoute } from '../types';

export interface HeaderProps {
  currentRoute: AppRoute;
  onRouteChange: (route: AppRoute) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentRoute, onRouteChange }) => {
  const [backendStatus, setBackendStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const [backendVersion, setBackendVersion] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const verifyHealth = async () => {
      try {
        const res = await checkBackendHealth();
        if (isMounted) {
          setBackendStatus('online');
          setBackendVersion(res.version);
        }
      } catch {
        if (isMounted) {
          setBackendStatus('offline');
        }
      }
    };

    verifyHealth();
    const interval = setInterval(verifyHealth, 15000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/90 bg-heritage-950/80 backdrop-blur-md px-4 sm:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand identity */}
        <div
          onClick={() => onRouteChange('/')}
          className="flex items-center gap-3.5 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sandstone-600 via-sandstone-700 to-heritage-900 border border-sandstone-500/40 flex items-center justify-center text-xl shadow-md shadow-sandstone-950/60 group-hover:scale-105 transition-transform">
            🏛️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight text-white group-hover:text-sandstone-200 transition-colors">
                BaoliGuard
              </h1>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-sandstone-950 text-sandstone-400 border border-sandstone-800/60">
                PWA v0.1
              </span>
            </div>
            <p className="text-[11px] text-amber-400/90 font-mono tracking-tight flex items-center gap-1.5">
              <span>Jal-Dharohar Digital Intelligence Platform</span>
            </p>
          </div>
        </div>

        {/* System status & CTA */}
        <div className="flex items-center gap-3">
          {backendStatus === 'online' ? (
            <StatusBadge
              label={`FastAPI Active ${backendVersion ? `v${backendVersion}` : ''}`}
              variant="success"
              pulse
              size="sm"
            />
          ) : backendStatus === 'checking' ? (
            <StatusBadge
              label="Probing Orchestrator..."
              variant="neutral"
              size="sm"
            />
          ) : (
            <StatusBadge
              label="Local Standalone Mode"
              variant="sandstone"
              size="sm"
            />
          )}

          {currentRoute !== '/upload' && (
            <button
              onClick={() => onRouteChange('/upload')}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-sandstone-600/90 hover:bg-sandstone-500 text-white shadow-sm border border-sandstone-400/40 transition-colors"
            >
              <span>+ New Survey</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
