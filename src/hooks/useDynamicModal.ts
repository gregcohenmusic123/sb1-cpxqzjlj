import { useState, useCallback } from 'react';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';

export function useDynamicModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { primaryWallet, showAuthFlow } = useDynamicContext();

  const openModal = useCallback(async () => {
    if (!primaryWallet) {
      try {
        await showAuthFlow();
      } catch (error) {
        console.error('Failed to connect wallet:', error);
        return;
      }
    }
    setIsOpen(true);
  }, [primaryWallet, showAuthFlow]);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    isOpen,
    openModal,
    closeModal,
    isWalletConnected: !!primaryWallet
  };
}