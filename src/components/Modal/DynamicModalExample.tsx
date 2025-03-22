import React from 'react';
import { Bitcoin } from 'lucide-react';
import DynamicModal from './DynamicModal';
import { useDynamicModal } from '../../hooks/useDynamicModal';

export default function DynamicModalExample() {
  const { isOpen, openModal, closeModal, isWalletConnected } = useDynamicModal();

  return (
    <>
      <button
        onClick={openModal}
        className="flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent hover:bg-accent/20 rounded-lg transition-colors"
      >
        <Bitcoin className="w-5 h-5" />
        {isWalletConnected ? 'Open Modal' : 'Connect Wallet'}
      </button>

      <DynamicModal
        isOpen={isOpen}
        onClose={closeModal}
        title="Dynamic Integration"
      >
        <div className="space-y-4">
          <p className="text-primary/60">
            This modal is integrated with Dynamic and will handle wallet connections automatically.
          </p>
          
          {isWalletConnected ? (
            <div className="p-4 bg-accent/10 rounded-lg">
              <p className="text-accent">Wallet connected successfully!</p>
            </div>
          ) : (
            <div className="p-4 bg-surface/50 rounded-lg border border-accent/20">
              <p className="text-primary/60">Please connect your wallet to continue.</p>
            </div>
          )}
        </div>
      </DynamicModal>
    </>
  );
}