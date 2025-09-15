// src/components/Input.jsx
import React from 'react';

export function Input({ className = '', placeholder, value, onChange }) {
  return (
    <input
      className={`border border-gray-300 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      // {...props}
    placeholder={placeholder}
      value={value}
      type='text'
      onChange={onChange}
    />
  );
}
