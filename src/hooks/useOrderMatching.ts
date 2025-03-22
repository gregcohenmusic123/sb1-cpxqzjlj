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

export function useOrderMatching(inscriptionId: string) {
  const { address } = useWallet();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!inscriptionId) return;

    const fetchOrders = async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('inscription_id', inscriptionId)
        .eq('status', 'open')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching orders:', error);
        return;
      }

      setOrders(data || []);
      setLoading(false);
    };

    fetchOrders();

    // Subscribe to order changes
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

    return () => {
      supabase.removeChannel(channel);
    };
  }, [inscriptionId]);

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
        status: 'open'
      });

    if (error) throw error;
  };

  const cancelOrder = async (orderId: string) => {
    if (!address) throw new Error('Wallet not connected');

    const { error } = await supabase
      .from('orders')
      .update({ status: 'cancelled' })
      .eq('id', orderId)
      .eq('maker_address', address);

    if (error) throw error;
  };

  return {
    orders,
    loading,
    placeOrder,
    cancelOrder
  };
}