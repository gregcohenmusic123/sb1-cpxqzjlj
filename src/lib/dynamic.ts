import { DynamicContextProvider } from '@dynamic-labs/sdk-react-core';
import { BitcoinWalletConnectors } from '@dynamic-labs/bitcoin';

export const DYNAMIC_ENVIRONMENT_ID = 'e09bfd02-f94b-49b9-b8ab-44c0630847a0';

export const dynamicConfig = {
  environmentId: DYNAMIC_ENVIRONMENT_ID,
  walletConnectors: [BitcoinWalletConnectors],
  settings: {
    environmentId: DYNAMIC_ENVIRONMENT_ID,
    walletList: {
      displayWithdrawalAddress: true,
    },
    eventsCallbacks: {
      onAuthSuccess: (args: any) => {
        console.log('Auth success:', args);
        window.location.href = '/';
      },
      onAuthError: (args: any) => {
        console.error('Auth error:', args);
      },
      onLogout: () => {
        console.log('User logged out');
        window.location.href = '/auth';
      },
    },
    overrides: {
      walletBook: {
        bitcoin: {
          displayWithdrawalAddress: true
        }
      }
    }
  },
};