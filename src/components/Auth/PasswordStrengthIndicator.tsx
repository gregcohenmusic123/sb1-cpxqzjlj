import React from 'react';

interface PasswordStrengthIndicatorProps {
  password: string;
}

export default function PasswordStrengthIndicator({ password }: PasswordStrengthIndicatorProps) {
  const getStrength = (): { strength: number; label: string } => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    return { strength, label: labels[strength - 1] || 'Very Weak' };
  };

  const { strength, label } = getStrength();
  const width = (strength / 5) * 100;
  
  const getColor = () => {
    if (strength <= 1) return 'bg-red-500';
    if (strength <= 2) return 'bg-orange-500';
    if (strength <= 3) return 'bg-yellow-500';
    if (strength <= 4) return 'bg-green-500';
    return 'bg-accent';
  };

  if (!password) return null;

  return (
    <div className="mt-2 space-y-1">
      <div className="h-1 w-full bg-surface/20 rounded-full overflow-hidden">
        <div
          className={`h-full ${getColor()} transition-all duration-300`}
          style={{ width: `${width}%` }}
        />
      </div>
      <p className={`text-xs ${getColor().replace('bg-', 'text-')}`}>
        Password Strength: {label}
      </p>
    </div>
  );
}