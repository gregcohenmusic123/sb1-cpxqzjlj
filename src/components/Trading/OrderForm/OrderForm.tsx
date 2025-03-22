import React, { useState } from 'react';
import { useWallet } from '../../../hooks/useWallet';
import OrderTypeSelector from './OrderTypeSelector';
import OrderInput from './OrderInput';
import PlaceOrderButton from './PlaceOrderButton';

interface OrderFormProps {
  onSubmit: (type: 'buy' | 'sell', price: number, amount: number) => Promise<void>;
}

export default function OrderForm({ onSubmit }: OrderFormProps) {
  const { connected } = useWallet();
  const [type, setType] = useState<'buy' | 'sell'>('buy');
  const [price, setPrice] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async () => {
    if (!price || !amount) return;
    
    try {
      await onSubmit(type, Number(price), Number(amount));
      // Reset form after successful submission
      setPrice('');
      setAmount('');
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  return (
    <div className="space-y-4">
      <OrderTypeSelector selectedType={type} onTypeChange={setType} />
      
      <OrderInput
        label="Price (BTC)"
        value={price}
        onChange={setPrice}
        type="number"
        min="0"
        step="0.00000001"
        placeholder="0.00000000"
        showBitcoinIcon
      />

      <OrderInput
        label="Amount"
        value={amount}
        onChange={setAmount}
        type="number"
        min="1"
        step="1"
        placeholder="1"
      />

      <PlaceOrderButton
        type={type}
        onClick={handleSubmit}
        disabled={!connected || !price || !amount}
      />
    </div>
  );
}