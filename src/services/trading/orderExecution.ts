import { supabase } from '../../lib/supabase';
import { unisatWallet } from '../wallet/unisatWallet';

export async function executeOrder(
  orderId: string,
  takerAddress: string,
  escrowAddress: string
) {
  try {
    // Get order details
    const { data: order } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single();

    if (!order) throw new Error('Order not found');

    // Calculate total amount in satoshis
    const totalSatoshis = Math.floor(order.price * order.amount * 100000000);

    // Send Bitcoin transaction
    const txHash = await unisatWallet.sendBitcoin(escrowAddress, totalSatoshis);

    // Update order status
    await supabase
      .from('trades')
      .insert({
        order_id: orderId,
        taker_address: takerAddress,
        price: order.price,
        amount: order.amount,
        tx_hash: txHash
      });

    return txHash;
  } catch (error) {
    console.error('Error executing order:', error);
    throw error;
  }
}