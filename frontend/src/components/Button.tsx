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
  const baseClasses = 'inline-flex items-center justify-center font-sans font-medium rounded-sm transition-all duration-150 focus:outline-none focus:ring-1 focus:ring-[#28A9E0] disabled:opacity-40 disabled:cursor-not-allowed select-none active:scale-[0.98]';

  const sizeClasses: Record<ButtonSize, string> = {
    sm: 'h-7 px-3 text-xs gap-1.5',
    md: 'h-8 px-4 text-xs sm:text-[13px] gap-2',
    lg: 'h-10 px-5 text-sm gap-2.5',
  };

  const variantClasses: Record<ButtonVariant, string> = {
    primary: 'bg-[#087CC1] hover:bg-[#28A9E0] text-white border border-[#28A9E0]/40 shadow-sm',
    secondary: 'bg-[#083358] hover:bg-[#0C3D66] text-[#DDF6FC] border border-[#28A9E0]/30',
    outline: 'bg-transparent hover:bg-[#083358]/50 text-[#8CD8F5] hover:text-white border border-[#28A9E0]/40',
    ghost: 'bg-transparent hover:bg-[#083358]/40 text-[#8CD8F5] hover:text-white border border-transparent',
    sandstone: 'bg-[#083358] hover:bg-[#0C3D66] text-[#D8C8B0] border border-[#D8C8B0]/30',
    danger: 'bg-[#D3455B] hover:bg-[#B63D50] text-white border border-[#D3455B]/60',
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
