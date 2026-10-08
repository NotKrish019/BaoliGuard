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
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-[11px]';

  const variantClasses: Record<BadgeVariant, { container: string; dot: string }> = {
    info: {
      container: 'bg-[#083358] text-[#28A9E0] border-[#28A9E0]/40',
      dot: 'bg-[#28A9E0]',
    },
    success: {
      container: 'bg-[#083358] text-[#2E8B57] border-[#2E8B57]/40',
      dot: 'bg-[#2E8B57]',
    },
    warning: {
      container: 'bg-[#083358] text-[#E08A1E] border-[#E08A1E]/40',
      dot: 'bg-[#E08A1E]',
    },
    danger: {
      container: 'bg-[#083358] text-[#D3455B] border-[#D3455B]/40',
      dot: 'bg-[#D3455B]',
    },
    sandstone: {
      container: 'bg-[#083358] text-[#D8C8B0] border-[#D8C8B0]/30',
      dot: 'bg-[#D8C8B0]',
    },
    jal: {
      container: 'bg-[#083358] text-[#8CD8F5] border-[#28A9E0]/40',
      dot: 'bg-[#28A9E0]',
    },
    neutral: {
      container: 'bg-[#083358] text-[#8CD8F5]/80 border-[#28A9E0]/20',
      dot: 'bg-[#8CD8F5]',
    },
  };

  const style = variantClasses[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-sm border ${sizeClasses} ${style.container} ${className}`}
    >
      <span className="relative flex h-1.5 w-1.5 shrink-0">
        {pulse && (
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${style.dot}`}
          />
        )}
        <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${style.dot}`} />
      </span>
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{label}</span>
    </span>
  );
};
