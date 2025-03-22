import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface SidebarLinkProps {
  icon: LucideIcon;
  label: string;
  path: string;
  isActive: boolean;
  isDisabled?: boolean;
  badge?: number;
}

export default function SidebarLink({
  icon: Icon,
  label,
  path,
  isActive,
  isDisabled,
  badge
}: SidebarLinkProps) {
  const baseClasses = "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors";
  const activeClasses = "bg-accent/10 text-accent border border-accent/20 shadow-lg";
  const inactiveClasses = "text-primary hover:text-accent hover:bg-accent/5";
  const disabledClasses = "opacity-50 cursor-not-allowed";

  if (isDisabled) {
    return (
      <div className={`${baseClasses} ${disabledClasses}`} title="Sign in required">
        <Icon className="w-5 h-5" />
        <span className="font-medium">{label}</span>
      </div>
    );
  }

  return (
    <Link
      to={path}
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">{label}</span>
      {badge !== undefined && badge > 0 && (
        <span className="ml-auto bg-accent text-background text-xs font-bold px-2 py-1 rounded-full">
          {badge}
        </span>
      )}
    </Link>
  );
}