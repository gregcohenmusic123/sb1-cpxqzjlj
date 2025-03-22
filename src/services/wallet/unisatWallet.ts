// Temporarily disabled UniSat wallet integration
import { UniSatProvider } from './types';

class UniSatWallet {
  private provider: UniSatProvider | null = null;

  async initialize(): Promise<void> {
    throw new Error('WALLET_DISABLED');
  }

  async connect(): Promise<string> {
    throw new Error('WALLET_DISABLED');
  }

  async getBalance(): Promise<{ confirmed: number; total: number }> {
    throw new Error('WALLET_DISABLED');
  }

  async getNetwork(): Promise<'livenet' | 'testnet'> {
    throw new Error('WALLET_DISABLED');
  }
}

export const unisatWallet = new UniSatWallet();