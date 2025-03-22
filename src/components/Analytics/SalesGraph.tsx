import React from 'react';

interface SalesGraphProps {
  data: number[];
}

export default function SalesGraph({ data }: SalesGraphProps) {
  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);
  const range = maxValue - minValue;

  const normalizeValue = (value: number) => {
    return ((value - minValue) / range) * 100;
  };

  return (
    <div className="w-full h-full flex items-end justify-between gap-1">
      {data.map((value, index) => (
        <div
          key={index}
          className="w-full bg-black/10 rounded-t-sm relative group"
          style={{ height: `${normalizeValue(value)}%` }}
        >
          {/* Tooltip */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block z-10">
            <div className="bg-black text-white text-xs py-0.5 px-1.5 rounded whitespace-nowrap">
              {value} sales
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}