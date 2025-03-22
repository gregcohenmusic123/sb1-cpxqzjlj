import React from 'react';
import UserOrderRow from './UserOrderRow';

interface Order {
  id: string;
  type: 'buy' | 'sell';
  price: number;
  amount: number;
}

interface UserOrdersProps {
  orders: Order[];
  onCancelOrder: (id: string) => void;
}

export default function UserOrders({ orders, onCancelOrder }: UserOrdersProps) {
  if (orders.length === 0) {
    return (
      <div className="text-center py-4 text-primary/60">
        No active orders
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {orders.map(order => (
        <UserOrderRow
          key={order.id}
          {...order}
          onCancel={onCancelOrder}
        />
      ))}
    </div>
  );
}