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
  const sizeClasses = size === 'sm' ? 'px-1.5 py-0.5 text-[10px]' : 'px-2 py-0.5 text-[11px]';

  const variantClasses: Record<BadgeVariant, { container: string; dot: string }> = {
    info: {
      container: 'bg-[#081E31] text-[#2498D5] border-[#2498D5]/30',
      dot: 'bg-[#2498D5]',
    },
    success: {
      container: 'bg-[#052219] text-[#3E8F6B] border-[#3E8F6B]/30',
      dot: 'bg-[#3E8F6B]',
    },
    warning: {
      container: 'bg-[#261B07] text-[#C9902E] border-[#C9902E]/30',
      dot: 'bg-[#C9902E]',
    },
    danger: {
      container: 'bg-[#2B0E0D] text-[#E06C68] border-[#B64A45]/30',
      dot: 'bg-[#B64A45]',
    },
    sandstone: {
      container: 'bg-[#081E31] text-[#D8C8B0] border-[#D8C8B0]/30',
      dot: 'bg-[#D8C8B0]',
    },
    jal: {
      container: 'bg-[#081E31] text-[#8FD5F2] border-[#2498D5]/30',
      dot: 'bg-[#2498D5]',
    },
    neutral: {
      container: 'bg-[#081E31] text-[#7E98A8] border-white/10',
      dot: 'bg-[#7E98A8]',
    },
  };

  const style = variantClasses[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono uppercase tracking-wider font-semibold rounded-xs border ${sizeClasses} ${style.container} ${className}`}
    >
      {pulse ? (
        <span className="relative flex h-1.5 w-1.5">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${style.dot}`} />
          <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${style.dot}`} />
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
