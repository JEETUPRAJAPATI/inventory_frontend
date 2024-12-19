import React from 'react';

export default function FormSelect({ 
  label, 
  id, 
  options, 
  required = false, 
  className = '', 
  ...props 
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <select
        id={id}
        required={required}
        className={`
          block w-full px-3 py-2
          border border-gray-300 rounded-md shadow-sm
          focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
          bg-white
          ${className}
        `}
        {...props}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}