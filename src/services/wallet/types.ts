export interface UniSatProvider {
  requestAccounts: () => Promise<string[]>;
  getBalance: () => Promise<{ confirmed: number; total: number; }>;
  getNetwork: () => Promise<'livenet' | 'testnet'>;
  signMessage: (message: string) => Promise<string>;
  sendBitcoin: (toAddress: string, satoshis: number) => Promise<string>;
}