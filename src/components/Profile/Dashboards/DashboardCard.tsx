import React from 'react';
import { LucideIcon } from 'lucide-react';

interface DashboardCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
}

export default function DashboardCard({ icon: Icon, label, value }: DashboardCardProps) {
  return (
    <div className="bg-surface rounded-lg p-6 border border-accent/20">
      <div className="flex items-center gap-3 mb-2">
        <Icon className="w-5 h-5 text-primary" />
        <h3 className="font-mono text-primary">{label}</h3>
      </div>
      <p className="text-2xl font-mono text-primary font-bold">{value}</p>
    </div>
  );
}