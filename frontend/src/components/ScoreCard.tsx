import React, { useState } from 'react';
import { MetricScore } from '../types';

export interface ScoreCardProps {
  title: string;
  score: MetricScore;
  category?: 'condition' | 'water' | 'priority' | 'neutral';
  description?: string;
  icon?: React.ReactNode;
}

export const ScoreCard: React.FC<ScoreCardProps> = ({
  title,
  score,
  category = 'neutral',
  description,
  icon,
}) => {
  const [showLimitations, setShowLimitations] = useState(false);

  // Normalize percentage for progress bar
  const range = score.scale_max - score.scale_min;
  const percentage = range > 0 ? Math.min(100, Math.max(0, ((score.value - score.scale_min) / range) * 100)) : score.value;

  const colorConfig = {
    condition: {
      bar: percentage > 70 ? 'bg-emerald-500' : percentage > 40 ? 'bg-amber-500' : 'bg-rose-500',
      text: percentage > 70 ? 'text-emerald-400' : percentage > 40 ? 'text-amber-400' : 'text-rose-400',
      bgGlow: percentage > 70 ? 'from-emerald-500/10' : percentage > 40 ? 'from-amber-500/10' : 'from-rose-500/10',
      badge: percentage > 70 ? 'Fair / Stable' : percentage > 40 ? 'Moderate Degradation' : 'High Vulnerability',
    },
    water: {
      bar: 'bg-jal-500',
      text: 'text-jal-400',
      bgGlow: 'from-jal-500/10',
      badge: percentage > 60 ? 'Recharge Viable' : 'Hydrologically Impaired',
    },
    priority: {
      bar: percentage > 70 ? 'bg-rose-500' : percentage > 40 ? 'bg-amber-500' : 'bg-slate-400',
      text: percentage > 70 ? 'text-rose-400' : percentage > 40 ? 'text-amber-400' : 'text-slate-300',
      bgGlow: percentage > 70 ? 'from-rose-500/10' : percentage > 40 ? 'from-amber-500/10' : 'from-slate-500/10',
      badge: percentage > 70 ? 'Immediate Action' : percentage > 40 ? 'Phased Intervention' : 'Routine Monitoring',
    },
    neutral: {
      bar: 'bg-sandstone-500',
      text: 'text-sandstone-400',
      bgGlow: 'from-sandstone-500/10',
      badge: 'Metric Value',
    },
  };

  const currentTheme = colorConfig[category];

  return (
    <div className={`glass-panel rounded-xl p-5 relative overflow-hidden bg-gradient-to-b ${currentTheme.bgGlow} to-transparent border border-slate-800`}>
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          {icon && <span className="text-slate-400">{icon}</span>}
          <div>
            <h4 className="text-sm font-semibold text-slate-200">{title}</h4>
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
              {currentTheme.badge}
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-baseline justify-end gap-1">
            <span className={`text-2xl font-bold font-mono tracking-tight ${currentTheme.text}`}>
              {score.value.toFixed(1)}
            </span>
            <span className="text-xs text-slate-500 font-mono">
              / {score.scale_max}
            </span>
          </div>
          <div className="text-[10px] text-slate-400 font-mono">
            Confidence: {(score.confidence * 100).toFixed(0)}%
          </div>
        </div>
      </div>

      {/* Progress track */}
      <div className="w-full bg-slate-800/80 rounded-full h-1.5 mb-3 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${currentTheme.bar}`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {description && (
        <p className="text-xs text-slate-400 mb-3 leading-relaxed">
          {description}
        </p>
      )}

      {/* Methodology badge & limitations accordion */}
      <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
        <span className="font-mono text-[10px] text-slate-400 truncate max-w-[200px]" title={score.method}>
          Rule: {score.method}
        </span>
        {score.limitations && score.limitations.length > 0 && (
          <button
            type="button"
            onClick={() => setShowLimitations(!showLimitations)}
            className="text-amber-400/90 hover:text-amber-300 font-medium underline-offset-2 hover:underline transition-colors flex items-center gap-1"
          >
            <span>{showLimitations ? 'Hide Limitations' : `Limitations (${score.limitations.length})`}</span>
          </button>
        )}
      </div>

      {showLimitations && score.limitations && (
        <div className="mt-3 p-2.5 bg-amber-950/30 border border-amber-800/40 rounded-lg text-[11px] text-amber-200/90 space-y-1">
          <div className="font-semibold text-amber-300 text-[10px] uppercase tracking-wider mb-1">
            Explicit Engineering Limitations
          </div>
          <ul className="list-disc list-inside space-y-0.5 text-slate-300 text-[10.5px]">
            {score.limitations.map((lim, idx) => (
              <li key={idx}>{lim}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
