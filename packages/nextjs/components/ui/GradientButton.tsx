import React, { ButtonHTMLAttributes, ReactNode } from "react";

interface GradientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isLoading?: boolean;
}

export const GradientButton = ({ children, isLoading, className = "", ...props }: GradientButtonProps) => {
  return (
    <button
      {...props}
      disabled={isLoading || props.disabled}
      className={`
        relative overflow-hidden group px-6 py-3 rounded-xl font-semibold text-white
        transition-all duration-300 ease-out hover:scale-[1.02] active:scale-[0.98]
        disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100
        ${className}
      `}
    >
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 bg-[length:200%_auto] group-hover:animate-[gradient_2s_linear_infinite]" />
      <div className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-20 bg-white transition-opacity duration-300" />

      <div className="relative flex items-center justify-center gap-2">
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        {children}
      </div>
    </button>
  );
};
