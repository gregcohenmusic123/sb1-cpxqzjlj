import { useDynamicContext } from '@dynamic-labs/sdk-react-core';

export function useDynamicWallet() {
  const { 
    user,
    isAuthenticated,
    handleLogOut,
    setShowAuthFlow,
    primaryWallet
  } = useDynamicContext();

  return {
    user,
    isAuthenticated,
    address: primaryWallet?.address || null,
    network: primaryWallet?.network || null,
    connect: () => setShowAuthFlow(true),
    disconnect: handleLogOut,
  };
}