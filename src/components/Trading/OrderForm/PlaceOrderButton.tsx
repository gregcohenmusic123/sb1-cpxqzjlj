import React from 'react';

interface PlaceOrderButtonProps {
  type: 'buy' | 'sell';
  onClick: () => void;
  disabled?: boolean;
}

export default function PlaceOrderButton({ type, onClick, disabled }: PlaceOrderButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
        type === 'buy'
          ? 'bg-green-500/10 text-green-500 hover:bg-green-500/20 disabled:opacity-50'
          : 'bg-red-500/10 text-red-500 hover:bg-red-500/20 disabled:opacity-50'
      }`}
    >
      {`Place ${type === 'buy' ? 'Buy' : 'Sell'} Order`}
    </button>
  );
}