import React from 'react';
import { motion } from 'framer-motion';
import { Navigate, useLocation } from 'react-router-dom';
import Logo from '../components/Logo';
import AuthForm from '../components/Auth/AuthForm';
import AuthHeader from '../components/Auth/AuthHeader';
import { useAuth } from '../contexts/AuthContext';
import { DynamicWidget } from '@dynamic-labs/sdk-react-core';

export default function AuthPage() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return null;
  }

  if (user) {
    // Redirect to the page they were trying to access, or home
    const redirectTo = location.state?.from?.pathname || '/';
    return <Navigate to={redirectTo} replace />;
  }

  const handleClose = () => {
    window.history.back();
  };

  return (
    <motion.div 
      className="min-h-screen flex items-center justify-center bg-surface px-4 py-12 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="w-full max-w-md space-y-8 relative">
        <div className="flex justify-center mb-6">
          <Logo className="w-32 h-32" />
        </div>
        <AuthHeader onClose={handleClose} />
        <div className="flex flex-col items-center gap-4 mb-8">
          <DynamicWidget
            buttonClassName="w-full px-4 py-2 bg-accent/10 text-accent hover:bg-accent/20 rounded-lg transition-colors border border-accent/20 text-sm font-medium"
            innerButtonComponent={
              <div className="flex items-center justify-center gap-2">
                <span>Connect Wallet</span>
              </div>
            }
          />
          <div className="flex items-center w-full gap-4">
            <div className="flex-1 h-px bg-accent/20"></div>
            <span className="text-primary/60 text-sm">or</span>
            <div className="flex-1 h-px bg-accent/20"></div>
          </div>
        </div>
        <AuthForm />
      </div>
    </motion.div>
  );
}