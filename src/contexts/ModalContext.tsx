import React, { createContext, useContext, useState } from 'react';
import PurchaseModal from '../components/Modal/PurchaseModal';
import WalletModal from '../components/Modal/WalletModal';

interface ModalContextType {
  openPurchaseModal: (title: string, price: number, artist: string) => void;
  closePurchaseModal: () => void;
  openWalletModal: () => Promise<string>;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [modalData, setModalData] = useState({ title: '', price: 0, artist: '' });
  const [walletPromise, setWalletPromise] = useState<{
    resolve: (value: string) => void;
    reject: (reason?: any) => void;
  } | null>(null);

  const openPurchaseModal = (title: string, price: number, artist: string) => {
    setModalData({ title, price, artist });
    setIsOpen(true);
  };

  const closePurchaseModal = () => {
    setIsOpen(false);
  };

  const openWalletModal = () => {
    return new Promise<string>((resolve, reject) => {
      setWalletPromise({ resolve, reject });
      setIsWalletOpen(true);
    });
  };

  const handleWalletSuccess = (address: string) => {
    if (walletPromise) {
      walletPromise.resolve(address);
      setWalletPromise(null);
    }
    setIsWalletOpen(false);
  };

  const handleWalletClose = () => {
    if (walletPromise) {
      walletPromise.reject(new Error('User cancelled'));
      setWalletPromise(null);
    }
    setIsWalletOpen(false);
  };

  return (
    <ModalContext.Provider value={{ openPurchaseModal, closePurchaseModal, openWalletModal }}>
      {children}
      <PurchaseModal
        isOpen={isOpen}
        onClose={closePurchaseModal}
        {...modalData}
      />
      <WalletModal
        isOpen={isWalletOpen}
        onClose={handleWalletClose}
        onSuccess={handleWalletSuccess}
      />
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}