import React from 'react';
import { Button } from './Button';

export interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
  className = '',
}) => {
  return (
    <div className={`glass-panel rounded-2xl p-10 text-center flex flex-col items-center justify-center max-w-xl mx-auto border border-dashed border-slate-800 ${className}`}>
      <div className="w-14 h-14 rounded-2xl bg-heritage-900 border border-slate-700/60 flex items-center justify-center text-2xl text-sandstone-400 mb-4 shadow-inner">
        {icon || '🏛️'}
      </div>
      <h3 className="text-lg font-bold text-white mb-2 tracking-tight">{title}</h3>
      <p className="text-xs text-slate-400 max-w-md mb-6 leading-relaxed">
        {description}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        {actionLabel && onAction && (
          <Button variant="sandstone" size="md" onClick={onAction}>
            {actionLabel}
          </Button>
        )}
        {secondaryActionLabel && onSecondaryAction && (
          <Button variant="outline" size="md" onClick={onSecondaryAction}>
            {secondaryActionLabel}
          </Button>
        )}
      </div>
    </div>
  );
};
