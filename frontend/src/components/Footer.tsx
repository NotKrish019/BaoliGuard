import React from 'react';
import { AppRoute } from '../types';
import { JalDrishtiLogo } from './JalDrishtiLogo';

export interface FooterProps {
  onRouteChange: (route: AppRoute) => void;
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ onRouteChange, className = '' }) => {
  return (
    <footer className={`bg-[#062B49] border-t border-[#28A9E0]/20 pt-8 pb-10 text-white font-sans ${className}`}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-[#28A9E0]/15">
          <div className="flex items-center gap-3">
            <JalDrishtiLogo size="sm" />
            <div>
              <span className="text-sm font-semibold tracking-wider text-white">JALDRISHTI</span>
              <p className="text-xs text-[#8CD8F5]/80 mt-0.5">
                Digital Intelligence for India's Traditional Water Heritage
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-[#8CD8F5]">
            <button
              onClick={() => onRouteChange('/')}
              className="hover:text-[#28A9E0] transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => onRouteChange('/upload')}
              className="hover:text-[#28A9E0] transition-colors"
            >
              Scan
            </button>
            <button
              onClick={() => onRouteChange('/analysis')}
              className="hover:text-[#28A9E0] transition-colors"
            >
              Diagnostics
            </button>
            <button
              onClick={() => onRouteChange('/knowledge')}
              className="hover:text-[#28A9E0] transition-colors"
            >
              Knowledge
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-5 text-[11px] text-[#587286]">
          <p>
            An AI-assisted digital engineering platform for conservation of stepwells, bawaris, and historic hydraulic architecture.
          </p>
          <div className="flex items-center gap-4">
            <span className="px-2 py-0.5 rounded-sm bg-[#083358] text-[#8CD8F5] font-medium border border-[#28A9E0]/20">
              IKS Protocol v1.4
            </span>
            <span>Deterministic Engineering Engine</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
