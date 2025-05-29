import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
}

const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  onClick,
  ...props 
}: ButtonProps) => {
  const baseStyles = "px-8 py-4 font-semibold rounded-lg transition-all duration-300 cursor-pointer";
  const variants = {
    primary: "bg-white text-black hover:bg-gray-200 active:bg-gray-300",
    secondary: "border border-white/20 hover:bg-white/10 active:bg-white/20",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
      type={props.type || 'button'}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;