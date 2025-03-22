import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function PerformanceMetrics() {
  const metrics = [
    { label: 'Revenue Growth', value: '+24%', isPositive: true },
    { label: 'Avg. Track Price', value: '0.12 BTC', isPositive: true },
    { label: 'Engagement Rate', value: '+8%', isPositive: true },
    { label: 'New Followers', value: '+156', isPositive: true }
  ];

  return (
    <div className="bg-surface rounded-lg p-6 border border-accent/20">
      <h3 className="text-lg font-mono text-primary font-bold mb-4">Performance Metrics</h3>
      <div className="grid grid-cols-2 gap-4">
        {metrics.map((metric, index) => (
          <div key={index} className="p-4 bg-surface border border-accent/20 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-mono text-primary">{metric.label}</span>
              {metric.isPositive ? (
                <ArrowUpRight className="w-4 h-4 text-accent" />
              ) : (
                <ArrowDownRight className="w-4 h-4 text-red-500" />
              )}
            </div>
            <p className="text-xl font-mono text-primary font-bold">{metric.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}