import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useWallet } from './useWallet';

interface Order {
  id: string;
  inscription_id: string;
  price: number;
  amount: number;
  type: 'buy' | 'sell';
  status: 'open' | 'filled' | 'cancelled';
}

export function useTradingTerminal(inscriptionId: string) {
  const { address } = useWallet();
  const [orders, setOrders] = useState<{
    bids: Order[];
    asks: Order[];
  }>({ bids: [], asks: [] });

  useEffect(() => {
    if (!inscriptionId) return;

    // Subscribe to orders
    const channel = supabase
      .channel(`orders:${inscriptionId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'orders',
          filter: `inscription_id=eq.${inscriptionId}`,
        },
        () => {
          fetchOrders();
        }
      )
      .subscribe();

    fetchOrders();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [inscriptionId]);

  const fetchOrders = async () => {
    const { data: orders } = await supabase
      .from('orders')
      .select('*')
      .eq('inscription_id', inscriptionId)
      .eq('status', 'open')
      .order('price', { ascending: true });

    if (orders) {
      setOrders({
        bids: orders.filter(order => order.type === 'buy'),
        asks: orders.filter(order => order.type === 'sell'),
      });
    }
  };

  const placeOrder = async (type: 'buy' | 'sell', price: number, amount: number) => {
    if (!address) throw new Error('Wallet not connected');

    const { error } = await supabase
      .from('orders')
      .insert({
        inscription_id: inscriptionId,
        maker_address: address,
        type,
        price,
        amount,
        network: 'testnet'
      });

    if (error) throw error;
    await fetchOrders();
  };

  const cancelOrder = async (orderId: string) => {
    if (!address) throw new Error('Wallet not connected');

    const { error } = await supabase
      .from('orders')
      .update({ status: 'cancelled' })
      .eq('id', orderId)
      .eq('maker_address', address);

    if (error) throw error;
    await fetchOrders();
  };

  return {
    orders,
    placeOrder,
    cancelOrder
  };
}