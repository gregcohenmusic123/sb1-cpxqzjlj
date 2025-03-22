import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import AuthInput from './AuthInput';
import AuthButton from './AuthButton';
import AuthToggle from './AuthToggle';
import AuthError from './AuthError';

export default function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const { signInWithEmail, signUpWithEmail, resetPassword } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      if (isForgotPassword) {
        await resetPassword(email);
        setMessage('If an account exists with this email, you will receive password reset instructions shortly');
      } else if (isSignUp) {
        await signUpWithEmail(email, password);
        navigate('/');
      } else {
        await signInWithEmail(email, password);
        navigate('/');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      
      // Handle specific error cases
      if (errorMessage.includes('invalid_credentials')) {
        setError('Invalid email or password. Please try again.');
      } else if (errorMessage.includes('email_taken')) {
        setError('This email is already registered. Please sign in instead.');
      } else if (errorMessage.includes('invalid_email')) {
        setError('Please enter a valid email address.');
      } else if (errorMessage.includes('weak_password')) {
        setError('Password should be at least 6 characters long.');
      } else {
        setError('An error occurred. Please try again.');
      }
      console.error('Auth error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-center text-2xl sm:text-3xl text-primary">
        {isForgotPassword 
          ? 'Reset your password'
          : isSignUp 
            ? 'Create your account' 
            : 'Sign in to your account'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <AuthInput
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="Email address"
            required
          />

          {!isForgotPassword && (
            <AuthInput
              type="password"
              value={password}
              onChange={setPassword}
              placeholder="Password"
              required
            />
          )}
        </div>

        <AuthButton
          type="submit"
          label={
            loading
              ? 'Please wait...'
              : isForgotPassword
              ? 'Send Reset Instructions'
              : isSignUp
              ? 'Sign Up'
              : 'Sign In'
          }
          disabled={loading}
        />
      </form>

      {/* Wallet Connection */}
        
      {error && <AuthError message={error} />}
      {message && (
        <div className="text-accent text-sm text-center">{message}</div>
      )}

      <AuthToggle
        isSignUp={isSignUp}
        isForgotPassword={isForgotPassword}
        onToggleSignUp={() => setIsSignUp(!isSignUp)}
        onToggleForgotPassword={() => setIsForgotPassword(!isForgotPassword)}
      />

      {isSignUp && (
        <p className="text-xs text-center text-primary/60 px-4">
          By clicking Sign Up, you agree to our{' '}
          <a href="/terms" className="text-accent hover:underline">
            Terms of Service
          </a>
        </p>
      )}
    </div>
  );
}