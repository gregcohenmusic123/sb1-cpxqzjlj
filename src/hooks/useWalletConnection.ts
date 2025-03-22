import { useState, useEffect, useCallback } from 'react';
import { unisatWallet } from '../services/wallet/unisatWallet';

export function useWalletConnection() {
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<number>(0);
  const [network, setNetwork] = useState<'livenet' | 'testnet' | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Initialize wallet on component mount
  const initialize = useCallback(async () => {
    try {
      await unisatWallet.initialize();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to initialize wallet');
    }
  }, []);

  // Connect wallet and handle authentication
  const connect = useCallback(async () => {
    try {
      const addr = await unisatWallet.connect();
      const { total } = await unisatWallet.getBalance();
      const net = await unisatWallet.getNetwork();

      // Update wallet state
      setAddress(addr);
      setBalance(total);
      setNetwork(net);
      setError(null);

      // Return address for auth flow
      return addr;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect wallet');
      throw err;
    }
  }, []);

  const disconnect = useCallback(() => {
    setAddress(null);
    setBalance(0);
    setNetwork(null);
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return {
    address,
    balance,
    network,
    error,
    connect,
    disconnect,
    initialized: !error
  };
}