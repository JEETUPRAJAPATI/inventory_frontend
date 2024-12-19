import React from 'react';

export default function FormTextarea({ 
  label, 
  id, 
  rows = 3, 
  required = false, 
  className = '', 
  ...props 
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <textarea
        id={id}
        rows={rows}
        required={required}
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