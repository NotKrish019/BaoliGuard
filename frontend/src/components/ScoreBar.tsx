import React from 'react';

export interface ScoreBarProps {
  label: string;
  value: number;
  max?: number;
  subtext?: string;
  unit?: string;
  variant?: 'blue' | 'amber' | 'green' | 'red' | 'neutral';
  showBenchmark?: boolean;
  benchmarkLabelLow?: string;
  benchmarkLabelHigh?: string;
  className?: string;
}

export const ScoreBar: React.FC<ScoreBarProps> = ({
  label,
  value,
  max = 100,
  subtext,
  unit = '',
  variant = 'blue',
  showBenchmark = false,
  benchmarkLabelLow = 'LOW',
  benchmarkLabelHigh = 'HIGH',
  className = '',
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const getBarColor = () => {
    switch (variant) {
      case 'amber':
        return 'bg-[#E08A1E]';
      case 'green':
        return 'bg-[#2E8B57]';
      case 'red':
        return 'bg-[#D3455B]';
      case 'neutral':
        return 'bg-[#587286]';
      case 'blue':
      default:
        return 'bg-gradient-to-r from-[#087CC1] to-[#28A9E0]';
    }
  };

  return (
    <div className={`space-y-1.5 ${className}`}>
      <div className="flex items-baseline justify-between text-xs">
        <span className="font-medium text-[#DDF6FC]/90 tracking-wide">{label}</span>
        <div className="flex items-baseline gap-1">
          <span className="text-sm font-semibold text-white tracking-tight">
            {typeof value === 'number' ? Math.round(value) : value}
          </span>
          {max !== 100 && (
            <span className="text-[10px] text-[#587286]">/{max}</span>
          )}
          {unit && <span className="text-[10px] text-[#8CD8F5]">{unit}</span>}
        </div>
      </div>

      {/* Horizontal Bar Track */}
      <div className="relative h-1.5 w-full bg-[#041D33] rounded-full overflow-hidden border border-[#28A9E0]/15">
        <div
          className={`h-full ${getBarColor()} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Optional Benchmark or Subtext */}
      {showBenchmark && (
        <div className="flex justify-between text-[10px] font-medium text-[#587286] pt-0.5">
          <span>{benchmarkLabelLow}</span>
          <span>{benchmarkLabelHigh}</span>
        </div>
      )}

      {subtext && (
        <p className="text-[11px] text-[#8CD8F5]/80 leading-normal">{subtext}</p>
      )}
    </div>
  );
};
