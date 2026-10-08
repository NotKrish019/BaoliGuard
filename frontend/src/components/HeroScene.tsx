import React from 'react';
import { AppRoute } from '../types';

export interface HeroSceneProps {
  onRouteChange: (route: AppRoute) => void;
  onLoadDemoFixture: () => void;
}

export const HeroScene: React.FC<HeroSceneProps> = ({
  onRouteChange,
  onLoadDemoFixture,
}) => {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#063B63] via-[#0A6FB7] to-[#085a96] pt-28 sm:pt-36 lg:pt-40">
      {/* Background Layer 1: Sun rays & water caustics filtering down from the surface */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <svg
          viewBox="0 0 1440 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover"
          preserveAspectRatio="none"
        >
          <g opacity="0.6" filter="blur(30px)">
            <path d="M120 -50L300 850L450 850L220 -50Z" fill="url(#sunray)" />
            <path d="M600 -50L750 850L880 850L680 -50Z" fill="url(#sunray)" />
            <path d="M1020 -50L1180 850L1350 850L1120 -50Z" fill="url(#sunray)" />
          </g>
          <defs>
            <linearGradient id="sunray" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8FD5F2" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#2498D5" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Background Layer 2: Subterranean Stepwell Masonry & Geometrical Arch Silhouettes */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg
          viewBox="0 0 1440 700"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover"
        >
          {/* Ancient stepwell tiers fading into the aquatic depths */}
          <path
            d="M-50 480H220V420H340V360H460V300H580V250H860V300H980V360H1100V420H1220V480H1500"
            stroke="#8FD5F2"
            strokeWidth="1.2"
            strokeDasharray="4 4"
          />
          <path
            d="M-50 540H180V490H300V440H420V390H540V340H900V390H1020V440H1140V490H1260V540H1500"
            stroke="#8FD5F2"
            strokeWidth="0.8"
            opacity="0.6"
          />
          {/* Submerged Archway contour */}
          <path
            d="M620 620V450C620 400 660 360 720 360C780 360 820 400 820 450V620"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            opacity="0.3"
          />
        </svg>
      </div>

      {/* Layer 3: Flowing ribbons, aquatic vegetation silhouettes, and gentle fish forms */}
      <div className="absolute inset-0 pointer-events-none">
        <svg
          viewBox="0 0 1440 750"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover"
        >
          {/* Left flowing hydrodynamic ribbon */}
          <path
            d="M-80 340C120 280 200 480 380 430C520 390 480 220 280 260C160 280 40 400 -80 340Z"
            fill="url(#ribbonLeft)"
            opacity="0.3"
          />

          {/* Right aquatic stylized vegetation cluster */}
          <g opacity="0.35">
            <path
              d="M1250 600C1230 450 1280 350 1270 250C1260 200 1230 180 1220 240C1210 320 1240 460 1210 600"
              fill="#2498D5"
            />
            <path
              d="M1320 600C1300 480 1350 380 1330 280C1320 220 1290 230 1280 290C1270 380 1310 500 1290 600"
              fill="#063B63"
            />
            <path
              d="M1380 600C1370 420 1420 320 1400 220C1390 170 1360 180 1350 240C1340 330 1380 480 1360 600"
              fill="#2498D5"
            />
          </g>

          {/* Left aquatic flora cluster */}
          <g opacity="0.35">
            <path
              d="M60 600C40 480 90 380 70 290C60 230 30 240 20 300C10 390 50 510 30 600"
              fill="#2498D5"
            />
            <path
              d="M130 600C110 460 160 360 140 270C130 220 100 230 90 290C80 370 120 490 100 600"
              fill="#063B63"
            />
          </g>

          {/* Delicate swimming fish silhouettes */}
          {/* Fish 1 (Top Left) */}
          <path
            d="M190 210C210 205 230 215 245 220C230 225 210 235 190 230C180 227 175 220 170 215L160 210L168 220L160 230L170 225C175 220 180 213 190 210Z"
            fill="#FFFFFF"
            opacity="0.75"
            className="animate-subtle-float"
          />
          {/* Fish 2 (Mid Right) */}
          <path
            d="M1120 320C1140 315 1160 325 1175 330C1160 335 1140 345 1120 340C1110 337 1105 330 1100 325L1090 320L1098 330L1090 340L1100 335C1105 330 1110 323 1120 320Z"
            fill="#8FD5F2"
            opacity="0.8"
          />
          {/* Fish 3 (Small, Lower Left) */}
          <path
            d="M380 380C395 376 410 383 420 387C410 391 395 398 380 394C373 392 369 387 365 383L358 380L363 387L358 394L365 391C369 387 373 382 380 380Z"
            fill="#FFFFFF"
            opacity="0.6"
          />
          {/* Fish 4 (Small, Lower Center) */}
          <path
            d="M840 410C855 406 870 413 880 417C870 421 855 428 840 424C833 422 829 417 825 413L818 410L823 417L818 424L825 421C829 417 833 412 840 410Z"
            fill="#8FD5F2"
            opacity="0.6"
          />

          {/* Delicate water bubbles */}
          <circle cx="280" cy="180" r="4" fill="#FFFFFF" opacity="0.5" />
          <circle cx="295" cy="150" r="2.5" fill="#8FD5F2" opacity="0.6" />
          <circle cx="760" cy="220" r="3.5" fill="#FFFFFF" opacity="0.4" />
          <circle cx="775" cy="190" r="2" fill="#8FD5F2" opacity="0.5" />
          <circle cx="1060" cy="260" r="4.5" fill="#FFFFFF" opacity="0.45" />

          <defs>
            <linearGradient id="ribbonLeft" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8FD5F2" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#0A6FB7" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Main Content Area: Centered, Editorial, Restrained */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8 pb-32 sm:pb-44 lg:pb-52">
        {/* Eyebrow Label */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#EAF7FB] text-xs font-mono uppercase tracking-widest mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#8FD5F2] animate-pulse" />
          <span>Digital Intelligence for India's Traditional Water Heritage</span>
        </div>

        {/* Central Editorial Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] mb-6 drop-shadow-sm">
          <span>India's water wisdom,</span>
          <br />
          <span className="font-editorial italic font-normal text-[#8FD5F2] lowercase tracking-normal">
            seen differently.
          </span>
        </h1>

        {/* Concise Supporting Copy */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#EAF7FB]/90 leading-relaxed font-sans font-light mb-10">
          JalDrishti combines computer vision, indigenous engineering knowledge, and digital conservation tools to help us understand and revive India's traditional water heritage.
        </p>

        {/* Actions: Primary Pill + Secondary Outline */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => onRouteChange('/upload')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#063B63] hover:bg-[#04253e] text-white font-semibold text-xs sm:text-sm tracking-wider uppercase shadow-xl shadow-[#063B63]/40 border border-[#2498D5]/40 hover:border-[#8FD5F2] transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            SCAN A DHAROHAR
          </button>

          <button
            onClick={onLoadDemoFixture}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white/15 hover:bg-white/25 text-white font-semibold text-xs sm:text-sm tracking-wider uppercase backdrop-blur-sm border border-white/30 transition-all duration-200"
          >
            EXPLORE THE KNOWLEDGE
          </button>
        </div>
      </div>

      {/* THE SIGNATURE WHITE ORGANIC CURVED SHAPE */}
      {/* Inspired by the reference: A bespoke sweeping organic wave cutting diagonally across the bottom */}
      <div className="relative w-full leading-none z-20">
        <svg
          viewBox="0 0 1440 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto block"
          preserveAspectRatio="none"
        >
          {/* Subtle soft translucent water transition rim */}
          <path
            d="M0 130C320 220 540 60 920 140C1160 190 1340 100 1440 80V220H0V130Z"
            fill="#2498D5"
            opacity="0.35"
          />
          {/* Main Pure White Organic Foreground Curve */}
          <path
            d="M0 160C280 235 520 85 880 155C1140 205 1320 120 1440 95V220H0V160Z"
            fill="#FFFFFF"
          />
        </svg>
      </div>
    </section>
  );
};
