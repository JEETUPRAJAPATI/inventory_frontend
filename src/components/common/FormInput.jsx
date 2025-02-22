import React from 'react';

export default function FormInput({ 
  label, 
  id, 
  type = 'text', 
  required = false,
  multiline = false,
  rows = 3,
  className = '', 
  ...props 
}) {
  const InputComponent = multiline ? 'textarea' : 'input';

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <InputComponent
        id={id}
        type={!multiline ? type : undefined}
        required={required}
        rows={multiline ? rows : undefined}
        className={`
          block w-full px-3 py-2 
          border border-gray-300 rounded-md shadow-sm
          focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
          placeholder-gray-400
          ${className}
        `}
        {...props}
      />
    </div>
  );
}