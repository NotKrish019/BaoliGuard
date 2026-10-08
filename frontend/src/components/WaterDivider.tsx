import React from 'react';

export interface WaterDividerProps {
  variant?: 'curve-white' | 'curve-dark' | 'flow-line' | 'layered-wave';
  height?: number;
  className?: string;
  flip?: boolean;
}

export const WaterDivider: React.FC<WaterDividerProps> = ({
  variant = 'curve-white',
  height = 56,
  className = '',
  flip = false,
}) => {
  if (variant === 'flow-line') {
    return (
      <div className={`relative w-full overflow-hidden my-6 ${className}`}>
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#28A9E0]/30 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#28A9E0]/40 blur-xs" />
      </div>
    );
  }

  if (variant === 'curve-dark') {
    return (
      <div 
        className={`w-full overflow-hidden leading-none ${flip ? 'rotate-180' : ''} ${className}`}
        style={{ height: `${height}px` }}
      >
        <svg 
          viewBox="0 0 1440 100" 
          className="w-full h-full preserve-3d" 
          preserveAspectRatio="none"
        >
          <path 
            d="M0,0 C320,60 720,100 1440,0 L1440,100 L0,100 Z" 
            fill="#062B49" 
          />
        </svg>
      </div>
    );
  }

  if (variant === 'layered-wave') {
    return (
      <div 
        className={`w-full overflow-hidden leading-none relative ${flip ? 'rotate-180' : ''} ${className}`}
        style={{ height: `${height}px` }}
      >
        <svg 
          viewBox="0 0 1440 120" 
          className="w-full h-full" 
          preserveAspectRatio="none"
        >
          <path 
            d="M0,30 C360,70 800,10 1440,50 L1440,120 L0,120 Z" 
            fill="rgba(8, 124, 193, 0.25)" 
          />
          <path 
            d="M0,50 C440,15 960,80 1440,35 L1440,120 L0,120 Z" 
            fill="#062B49" 
          />
        </svg>
      </div>
    );
  }

  // Default: transition to white / light surface
  return (
    <div 
      className={`w-full overflow-hidden leading-none ${flip ? 'rotate-180' : ''} ${className}`}
      style={{ height: `${height}px` }}
    >
      <svg 
        viewBox="0 0 1440 100" 
        className="w-full h-full" 
        preserveAspectRatio="none"
      >
        <path 
          d="M0,0 C420,80 1020,80 1440,0 L1440,100 L0,100 Z" 
          fill="#FFFFFF" 
        />
      </svg>
    </div>
  );
};
