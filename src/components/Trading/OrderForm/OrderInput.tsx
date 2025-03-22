import React from 'react';
import { Bitcoin } from 'lucide-react';

interface OrderInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'number';
  min?: string;
  step?: string;
  showBitcoinIcon?: boolean;
}

export default function OrderInput({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  min,
  step,
  showBitcoinIcon = false
}: OrderInputProps) {
  return (
    <div className="w-full">
      <label className="block text-sm text-primary/60 mb-1">{label}</label>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          min={min}
          step={step}
          className="w-full px-3 py-2 bg-surface border border-accent/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-primary text-[10px]"
          placeholder={placeholder}
        />
        {showBitcoinIcon && (
          <Bitcoin className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-primary/60" />
        )}
      </div>
    </div>
  );
}