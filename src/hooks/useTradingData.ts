import { useState, useEffect } from 'react';

interface PriceData {
  date: string;
  price: number;
}

interface Order {
  price: string;
  amount: number;
  total: string;
}

interface OrderBook {
  asks: Order[];
  bids: Order[];
}

export function useTradingData() {
  const [priceData, setPriceData] = useState<PriceData[]>([]);
  const [orderBook, setOrderBook] = useState<OrderBook>({ asks: [], bids: [] });

  useEffect(() => {
    // Generate mock price data
    const mockPriceData = Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      price: 0.85 + Math.random() * 0.2
    }));

    // Generate mock order book data
    const mockAsks = Array.from({ length: 5 }, (_, i) => ({
      price: (0.95 + i * 0.01).toFixed(8),
      amount: Math.floor(Math.random() * 5) + 1,
      total: ((0.95 + i * 0.01) * (Math.floor(Math.random() * 5) + 1)).toFixed(8)
    }));

    const mockBids = Array.from({ length: 5 }, (_, i) => ({
      price: (0.94 - i * 0.01).toFixed(8),
      amount: Math.floor(Math.random() * 5) + 1,
      total: ((0.94 - i * 0.01) * (Math.floor(Math.random() * 5) + 1)).toFixed(8)
    }));

    setPriceData(mockPriceData);
    setOrderBook({ asks: mockAsks, bids: mockBids });
  }, []);

  return { priceData, orderBook };
}