import React from 'react';
import { DynamicWidget as DynamicAuthWidget, useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { Bitcoin } from 'lucide-react';

const unlockScroll = () => {
  const scrollY = document.body.style.top;
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';
  window.scrollTo(0, parseInt(scrollY || '0') * -1);
};

const lockScroll = () => {
  const scrollY = window.scrollY;
  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollY}px`;
  document.body.style.width = '100%';
};

interface DynamicWidgetProps {
  className?: string;
}

export default function DynamicWidget({ className = '' }: DynamicWidgetProps) {
  const { isOpen } = useDynamicContext();

  React.useEffect(() => {
    // Only modify body style if the modal is open
    if (isOpen) {
      lockScroll();
    } else {
      unlockScroll();
    }

    return () => {
      unlockScroll();
    };
  }, [isOpen]);

  return (
    <DynamicAuthWidget
      buttonClassName={`flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent hover:bg-accent/20 rounded-lg transition-colors border border-accent/20 ${className}`}
      innerButtonComponent={
        <div className="flex items-center gap-2">
          <Bitcoin className="w-4 h-4" />
          <span className="text-sm">Connect Wallet</span>
        </div>
      }
    />
  );
}