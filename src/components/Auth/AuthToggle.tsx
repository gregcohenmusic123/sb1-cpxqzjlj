import React from 'react';

interface AuthToggleProps {
  isSignUp: boolean;
  isForgotPassword: boolean;
  onToggleSignUp: () => void;
  onToggleForgotPassword: () => void;
}

export default function AuthToggle({
  isSignUp,
  isForgotPassword,
  onToggleSignUp,
  onToggleForgotPassword
}: AuthToggleProps) {
  return (
    <div className="text-sm text-center space-y-2">
      {!isForgotPassword && (
        <button
          onClick={onToggleSignUp}
          className="text-primary hover:text-accent transition-colors block w-full"
        >
          {isSignUp
            ? 'Already have an account? Sign in'
            : "Don't have an account? Sign up"}
        </button>
      )}
      <button
        onClick={onToggleForgotPassword}
        className="text-primary hover:text-accent transition-colors block w-full"
      >
        {isForgotPassword
          ? 'Back to sign in'
          : 'Forgot your password?'}
      </button>
    </div>
  );
}