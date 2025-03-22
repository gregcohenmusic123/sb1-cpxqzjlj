```tsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data - replace with real API data
const data = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  price: 0.85 + Math.random() * 0.2
}));

export default function PriceChart() {
  return (
    <div className="h-[400px] p-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis
            dataKey="date"
            stroke="#666"
            tick={{ fill: '#666', fontSize: 10 }}
            tickLine={{ stroke: '#666' }}
          />
          <YAxis
            stroke="#666"
            tick={{ fill: '#666', fontSize: 10 }}
            tickLine={{ stroke: '#666' }}
            domain={['dataMin - 0.1', 'dataMax + 0.1']}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#111921',
              border: '1px solid rgba(208, 255, 39, 0.2)',
              borderRadius: '8px'
            }}
            labelStyle={{ color: '#EEEDF2' }}
            itemStyle={{ color: '#D0FF27' }}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#D0FF27"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
```