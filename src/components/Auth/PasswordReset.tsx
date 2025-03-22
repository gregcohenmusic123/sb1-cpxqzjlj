import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import AuthInput from './AuthInput';
import AuthButton from './AuthButton';
import AuthError from './AuthError';
import PasswordStrengthIndicator from './PasswordStrengthIndicator';

export default function PasswordReset() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Parse the hash fragment
    const hash = location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const accessToken = params.get('access_token');
    
    if (accessToken) {
      // Set the session with the access token
      supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: params.get('refresh_token') || '',
      });
    } else {
      // No token found, redirect to login
      navigate('/auth');
    }
  }, [location, navigate]);

  const validatePassword = (password: string): { isValid: boolean; error?: string } => {
    if (password.length < 8) {
      return { isValid: false, error: 'Password must be at least 8 characters long' };
    }
    if (!/[A-Z]/.test(password)) {
      return { isValid: false, error: 'Password must contain at least one uppercase letter' };
    }
    if (!/[a-z]/.test(password)) {
      return { isValid: false, error: 'Password must contain at least one lowercase letter' };
    }
    if (!/[0-9]/.test(password)) {
      return { isValid: false, error: 'Password must contain at least one number' };
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
      return { isValid: false, error: 'Password must contain at least one special character' };
    }
    return { isValid: true };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate password strength
    const validation = validatePassword(password);
    if (!validation.isValid) {
      setError(validation.error);
      return;
    }

    setLoading(true);

    try {
      const { error: updateError } = await supabase.auth.updateUser({ 
        password: password 
      });
      
      if (updateError) throw updateError;

      // Redirect to login with success message
      navigate('/auth', { 
        state: { message: 'Password has been successfully reset. Please sign in with your new password.' }
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-surface p-8 rounded-xl border border-accent/20">
      <h2 className="text-center text-2xl sm:text-3xl text-primary">
        Create New Password
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <AuthInput
              type="password"
              value={password}
              onChange={setPassword}
              placeholder="New password"
              required
            />
            <PasswordStrengthIndicator password={password} />
          </div>

          <AuthInput
            type="password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            placeholder="Confirm new password"
            required
          />
        </div>

        {error && <AuthError message={error} />}

        <AuthButton
          type="submit"
          label={loading ? 'Updating Password...' : 'Update Password'}
          disabled={loading}
        />
      </form>
      </div>
    </div>
  );
}