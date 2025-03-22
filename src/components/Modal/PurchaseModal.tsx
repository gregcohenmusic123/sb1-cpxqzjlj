import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bitcoin, AlertCircle } from 'lucide-react';
import { DynamicWidget, useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { useDynamicWallet } from '../../hooks/useDynamicWallet';

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  price: number;
  artist: string;
}

export default function PurchaseModal({ isOpen, onClose, title, price, artist }: PurchaseModalProps) {
  const [amount, setAmount] = useState<string>('1');
  const [error, setError] = useState<string>('');
  const modalRef = useRef<HTMLDivElement>(null);
  const { address, isAuthenticated } = useDynamicWallet();
  const { setShowAuthFlow } = useDynamicContext();
  const [scrollPosition, setScrollPosition] = useState(0);

  const validateAmount = (value: string) => {
    const numValue = parseInt(value);
    if (isNaN(numValue) || numValue < 1) {
      setError('Please enter a valid amount (minimum 1)');
      return false;
    }
    setError('');
    return true;
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);
    validateAmount(value);
  };

  const handleModalClose = () => {
    // Restore scroll position
    window.scrollTo(0, scrollPosition);
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleModalClose();
    }
  };

  const handleEscapeKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleModalClose();
    }
  };
  useEffect(() => {
    if (isOpen) {
      // Store current scroll position
      setScrollPosition(window.scrollY);
      // Add event listeners
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handlePurchase = async () => {
    if (isAuthenticated && address) {
      handleModalClose();
      try {
        // Add purchase logic here
        console.log('Processing purchase with wallet:', address);
      } catch (error) {
        console.error('Purchase failed:', error);
        setError('Failed to process purchase. Please try again.');
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          onClick={handleOverlayClick}
        >
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-[500px] bg-surface rounded-xl border border-accent/20 shadow-xl"
          >
            {/* Close button */}
            <button
              onClick={handleModalClose}
              className="absolute top-4 right-4 p-2 text-primary/60 hover:text-accent transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content */}
            <div className="p-6">
              <h2 id="modal-title" className="text-xl font-bold text-primary mb-4">
                Confirm Purchase
              </h2>

              <div className="space-y-4">
                <div className="bg-surface/50 p-4 rounded-lg border border-accent/10">
                  <h3 className="font-medium text-primary">{title}</h3>
                  <p className="text-sm text-primary/60">{artist}</p>
                  <div className="mt-4">
                    <label className="block text-sm text-primary/60 mb-2">Amount</label>
                    <input
                      type="number"
                      min="1"
                      value={amount}
                      onChange={handleAmountChange}
                      className="w-full px-3 py-2 bg-surface border border-accent/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-primary text-sm"
                      placeholder="Enter amount"
                    />
                    {error && (
                      <div className="flex items-center gap-1 mt-1 text-red-500 text-xs">
                        <AlertCircle className="w-3 h-3" />
                        <span>{error}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-surface/50 rounded-lg border border-accent/10">
                  <span className="text-primary/60">Price</span>
                  <div className="flex items-center gap-2 text-primary">
                    <Bitcoin className="w-4 h-4" />
                    <span className="font-medium">{(price * parseInt(amount || '0')).toFixed(3)} BTC</span>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleModalClose}
                    className="flex-1 px-4 py-2 bg-surface border border-accent/20 text-primary hover:text-accent rounded-lg transition-colors"
                    type="button"
                  >
                    Cancel
                  </button>
                  {isAuthenticated ? (
                    <button 
                      onClick={handlePurchase}
                      className="flex-1 px-4 py-2 bg-accent/10 text-accent hover:bg-accent/20 rounded-lg transition-colors"
                      type="button"
                    >
                      Confirm Purchase
                    </button>
                  ) : (
                    <DynamicWidget
                      buttonClassName="flex-1 px-4 py-2 bg-accent/10 text-accent hover:bg-accent/20 rounded-lg transition-colors"
                      innerButtonComponent={
                        <div className="flex items-center justify-center gap-2">
                          <Bitcoin className="w-4 h-4" />
                          <span>Connect Wallet</span>
                        </div>
                      }
                    />
                  )}
                </div>
              </div>
            </div>
            {address && (
              <div className="mt-4 pt-4 border-t border-accent/20">
                <div className="flex items-center justify-between text-sm text-primary/60">
                  <span>Connected Wallet</span>
                  <span className="font-mono">{address}</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}