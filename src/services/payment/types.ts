export interface PaymentDetails {
  amount: number;
  recipientAddress: string;
  network: 'mainnet' | 'testnet';
  description?: string;
  metadata?: Record<string, any>;
}

export interface TransactionReceipt {
  id: string;
  txHash: string;
  amount: number;
  status: 'pending' | 'confirmed' | 'failed';
  confirmations: number;
  timestamp: number;
  network: 'mainnet' | 'testnet';
  exchangeRate: number;
  fiatAmount: {
    amount: number;
    currency: string;
  };
}

export interface PaymentError extends Error {
  code: string;
  details?: any;
}