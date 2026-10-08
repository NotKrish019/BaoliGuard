import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'sandstone' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled,
  className = '',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-mono uppercase tracking-wider font-semibold rounded-xs transition-colors duration-150 focus:outline-none focus:ring-1 focus:ring-[#2498D5] disabled:opacity-40 disabled:cursor-not-allowed select-none';

  const sizeClasses: Record<ButtonSize, string> = {
    sm: 'h-7 px-2.5 text-[11px] gap-1.5',
    md: 'h-8 px-3.5 text-xs gap-2',
    lg: 'h-10 px-5 text-xs sm:text-sm gap-2.5',
  };

  const variantClasses: Record<ButtonVariant, string> = {
    primary: 'bg-[#2498D5] hover:bg-[#0A6FB7] text-white border border-[#2498D5]',
    secondary: 'bg-[#081E31] hover:bg-[#0C2B45] text-[#F4F7F9] border border-white/15',
    outline: 'bg-transparent hover:bg-white/5 text-[#94A7B5] hover:text-white border border-white/20',
    ghost: 'bg-transparent hover:bg-white/5 text-[#7E98A8] hover:text-white border border-transparent',
    sandstone: 'bg-[#081E31] hover:bg-[#0C2B45] text-[#D8C8B0] border border-[#D8C8B0]/30',
    danger: 'bg-[#B64A45] hover:bg-[#993A35] text-white border border-[#B64A45]',
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin -ml-0.5 mr-2 h-3.5 w-3.5 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      ) : leftIcon ? (
        <span className="shrink-0">{leftIcon}</span>
      ) : null}
      <span>{children}</span>
      {!isLoading && rightIcon ? <span className="shrink-0">{rightIcon}</span> : null}
    </button>
  );
};
