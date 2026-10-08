import React from 'react';

export type BadgeVariant = 'info' | 'success' | 'warning' | 'danger' | 'sandstone' | 'jal' | 'neutral';

export interface StatusBadgeProps {
  label: string;
  variant?: BadgeVariant;
  pulse?: boolean;
  icon?: React.ReactNode;
  size?: 'sm' | 'md';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  label,
  variant = 'neutral',
  pulse = false,
  icon,
  size = 'sm',
  className = '',
}) => {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs font-semibold';

  const variantClasses: Record<BadgeVariant, { container: string; dot: string }> = {
    info: {
      container: 'bg-sky-950/80 text-sky-300 border-sky-800/60',
      dot: 'bg-sky-400',
    },
    success: {
      container: 'bg-emerald-950/80 text-emerald-300 border-emerald-800/60',
      dot: 'bg-emerald-400',
    },
    warning: {
      container: 'bg-amber-950/80 text-amber-300 border-amber-800/60',
      dot: 'bg-amber-400',
    },
    danger: {
      container: 'bg-rose-950/80 text-rose-300 border-rose-800/60',
      dot: 'bg-rose-400',
    },
    sandstone: {
      container: 'bg-sandstone-950/80 text-sandstone-300 border-sandstone-700/60',
      dot: 'bg-sandstone-400',
    },
    jal: {
      container: 'bg-jal-950/80 text-jal-300 border-jal-700/60',
      dot: 'bg-jal-400',
    },
    neutral: {
      container: 'bg-slate-900/80 text-slate-300 border-slate-700/60',
      dot: 'bg-slate-400',
    },
  };

  const style = variantClasses[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border shadow-sm ${sizeClasses} ${style.container} ${className}`}
    >
      {pulse ? (
        <span className="relative flex h-2 w-2">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${style.dot}`} />
          <span className={`relative inline-flex rounded-full h-2 w-2 ${style.dot}`} />
        </span>
      ) : icon ? (
        <span className="shrink-0">{icon}</span>
      ) : (
        <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
      )}
      <span className="truncate">{label}</span>
    </span>
  );
};
