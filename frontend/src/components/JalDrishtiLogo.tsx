import React from 'react';

export interface JalDrishtiLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  light?: boolean;
}

export const JalDrishtiLogo: React.FC<JalDrishtiLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  light = true,
}) => {
  const iconDimensions = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  }[size];

  const textSize = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl',
  }[size];

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Bespoke vector mark: Stepwell arch intertwined with flowing water currents */}
      <div className={`relative ${iconDimensions} shrink-0 flex items-center justify-center`}>
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm"
        >
          {/* Subtle outer circular aura */}
          <circle cx="24" cy="24" r="22" className="fill-[#0A6FB7]/20 stroke-[#2498D5]/40" strokeWidth="1.5" />
          
          {/* Architectural stepwell arch silhouette */}
          <path
            d="M14 36V23C14 17.477 18.477 13 24 13C29.523 13 34 17.477 34 23V36"
            stroke={light ? '#FFFFFF' : '#063B63'}
            strokeWidth="2.2"
            strokeLinecap="round"
          />

          {/* Stepped terrace contour */}
          <path
            d="M17 36V28H21V22H27V28H31V36"
            stroke={light ? '#8FD5F2' : '#0A6FB7'}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.85"
          />

          {/* Flowing water wave intersecting the masonry base */}
          <path
            d="M10 33C14 30 18 35 24 32C30 29 34 34 38 31"
            stroke={light ? '#2498D5' : '#2498D5'}
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Concentric subterranean water droplet */}
          <circle cx="24" cy="18" r="2.5" fill={light ? '#8FD5F2' : '#0A6FB7'} />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span
            className={`font-display font-bold tracking-tight leading-none ${textSize} ${
              light ? 'text-white' : 'text-[#063B63]'
            }`}
          >
            JalDrishti
          </span>
          <span
            className={`text-[9.5px] font-mono tracking-wider uppercase mt-0.5 ${
              light ? 'text-[#8FD5F2]' : 'text-[#0A6FB7]'
            }`}
          >
            Water Heritage Intelligence
          </span>
        </div>
      )}
    </div>
  );
};
