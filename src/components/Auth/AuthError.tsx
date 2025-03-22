import React from 'react';

interface AuthErrorProps {
  message: string;
}

export default function AuthError({ message }: AuthErrorProps) {
  return (
    <div className="text-red-500 text-sm text-center">
      {message}
    </div>
  );
}