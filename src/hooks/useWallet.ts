import { useState, useEffect } from 'react';

interface WalletState {
  address: string | null;
  balance: number;
  connected: boolean;
  network: 'testnet' | 'mainnet';
}

export function useWallet() {
  const [wallet, setWallet] = useState<WalletState>({
    address: null,
    balance: 0,
    connected: false,
    network: 'testnet'
  });

  const connectWallet = async () => {
    try {
      // @ts-ignore - UniSat types
      const unisat = (window as any).unisat;
      if (unisat) {
        const accounts = await unisat.requestAccounts();
        const balance = await unisat.getBalance();
        const network = await unisat.getNetwork();
        
        setWallet({
          address: accounts[0],
          balance: balance.total,
          connected: true,
          network: network === 'testnet' ? 'testnet' : 'mainnet'
        });
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      throw error;
    }
  };

  const disconnectWallet = () => {
    setWallet({
      address: null,
      balance: 0,
      connected: false,
      network: 'testnet'
    });
  };

  return {
    ...wallet,
    connectWallet,
    disconnectWallet
  };
}