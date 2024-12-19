import React from 'react';

export default function Button({ 
  children, 
  type = 'button', 
  variant = 'primary', 
  disabled = false, 
  className = '', 
  ...props 
}) {
  const baseStyles = 'w-full flex justify-center py-2 px-4 border rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200';
  
  const variants = {
    primary: 'border-transparent text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 disabled:bg-indigo-400',
    secondary: 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-indigo-500 disabled:bg-gray-100',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${disabled ? 'cursor-not-allowed' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}