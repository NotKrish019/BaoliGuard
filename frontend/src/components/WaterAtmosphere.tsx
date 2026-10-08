import React from 'react';

export interface WaterAtmosphereProps {
  variant?: 'deep' | 'subtle' | 'surface' | 'minimal';
  className?: string;
  children?: React.ReactNode;
}

export const WaterAtmosphere: React.FC<WaterAtmosphereProps> = ({
  variant = 'deep',
  className = '',
  children,
}) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Background aquatic ambient layers */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden" 
        aria-hidden="true"
      >
        {variant === 'deep' && (
          <>
            {/* Deep water radial atmospheric lighting */}
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-b from-[#28A9E0]/12 via-[#087CC1]/06 to-transparent rounded-full blur-3xl animate-water-current" />
            <div className="absolute top-1/4 -right-48 w-[600px] h-[500px] bg-gradient-to-l from-[#087CC1]/10 via-[#8CD8F5]/04 to-transparent rounded-full blur-3xl animate-water-drift" />
            <div className="absolute bottom-10 -left-32 w-[500px] h-[400px] bg-gradient-to-r from-[#062B49] via-[#087CC1]/08 to-transparent rounded-full blur-2xl" />
            
            {/* Subtle organic flow curves */}
            <svg 
              className="absolute inset-0 w-full h-full opacity-15 stroke-[#28A9E0]/25 fill-none" 
              viewBox="0 0 1440 800" 
              preserveAspectRatio="none"
            >
              <path d="M-100,200 C300,120 700,280 1540,160" strokeWidth="1.5" strokeDasharray="6 8" />
              <path d="M-100,380 C400,480 900,320 1540,420" strokeWidth="1" />
              <path d="M-100,560 C500,480 1000,640 1540,540" strokeWidth="1.2" strokeDasharray="4 6" />
            </svg>
          </>
        )}

        {variant === 'subtle' && (
          <>
            <div className="absolute -top-20 left-1/3 w-[600px] h-[250px] bg-gradient-to-b from-[#28A9E0]/08 to-transparent rounded-full blur-2xl" />
            <svg 
              className="absolute inset-0 w-full h-full opacity-10 stroke-[#8CD8F5]/30 fill-none" 
              viewBox="0 0 1440 400" 
              preserveAspectRatio="none"
            >
              <path d="M0,150 C400,220 800,80 1440,180" strokeWidth="1" />
            </svg>
          </>
        )}

        {variant === 'surface' && (
          <div className="absolute inset-0 bg-gradient-to-b from-[#062B49] via-[#083358]/50 to-[#062B49] opacity-90" />
        )}
      </div>

      {/* Content wrapper */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
