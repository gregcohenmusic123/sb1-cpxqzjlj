import React from 'react';

interface AuthButtonProps {
  type: 'submit' | 'button';
  label: string;
  disabled?: boolean;
  onClick?: () => void;
}

export default function AuthButton({ type, label, disabled, onClick }: AuthButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="w-full py-2 px-4 bg-surface border border-accent/20 text-primary hover:text-accent rounded-lg transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-surface disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {label}
    </button>
  );
}