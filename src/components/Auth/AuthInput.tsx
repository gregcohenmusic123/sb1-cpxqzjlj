import React from 'react';

interface AuthInputProps {
  type: 'email' | 'password';
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  required?: boolean;
}

export default function AuthInput({
  type,
  value,
  onChange,
  placeholder,
  required
}: AuthInputProps) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      className="w-full px-3 py-2 bg-surface border border-accent/20 text-primary placeholder-primary/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
    />
  );
}