import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Search, Filter } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { formatDate } from '../../utils/dateUtils';

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchTransactions();
  }, [searchTerm, dateRange, statusFilter]);

  const fetchTransactions = async () => {
    try {
      let query = supabase
        .from('transactions')
        .select('*')
        .order('created_at', { ascending: false });

      // Apply filters
      if (searchTerm) {
        query = query.or(`tx_hash.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
      }

      if (dateRange.start) {
        query = query.gte('created_at', dateRange.start);
      }

      if (dateRange.end) {
        query = query.lte('created_at', dateRange.end);
      }

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }

      const { data, error } = await query;

      if (error) throw error;
      setTransactions(data || []);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportTransactions = async (format: 'csv' | 'pdf') => {
    // Implement export logic
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap gap-4 bg-surface p-4 rounded-lg border border-accent/20">
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/60" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-surface border border-accent/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-primary text-sm"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <input
            type="date"
            value={dateRange.start}
            onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
            className="px-4 py-2 bg-surface border border-accent/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-primary text-sm"
          />
          <input
            type="date"
            value={dateRange.end}
            onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
            className="px-4 py-2 bg-surface border border-accent/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-primary text-sm"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 bg-surface border border-accent/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-primary text-sm"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="failed">Failed</option>
        </select>

        <div className="flex gap-2">
          <button
            onClick={() => exportTransactions('csv')}
            className="px-4 py-2 bg-surface border border-accent/20 text-primary hover:text-accent rounded-lg transition-colors text-sm flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
          <button
            onClick={() => exportTransactions('pdf')}
            className="px-4 py-2 bg-surface border border-accent/20 text-primary hover:text-accent rounded-lg transition-colors text-sm flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export PDF
          </button>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-surface rounded-lg border border-accent/20 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-accent/20">
              <th className="px-6 py-3 text-left text-xs font-medium text-primary/60">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-primary/60">TX Hash</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-primary/60">Amount (BTC)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-primary/60">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-primary/60">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-accent/20">
            {transactions.map((tx: any) => (
              <motion.tr
                key={tx.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="hover:bg-accent/5"
              >
                <td className="px-6 py-4 text-sm text-primary">
                  {formatDate(new Date(tx.created_at).getTime())}
                </td>
                <td className="px-6 py-4">
                  <a
                    href={`https://mempool.space/${tx.network === 'testnet' ? 'testnet/' : ''}tx/${tx.tx_hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-accent hover:underline"
                  >
                    {tx.tx_hash.slice(0, 8)}...{tx.tx_hash.slice(-8)}
                  </a>
                </td>
                <td className="px-6 py-4 text-sm text-primary">{tx.amount}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      tx.status === 'confirmed'
                        ? 'bg-green-100 text-green-800'
                        : tx.status === 'failed'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {tx.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-primary">{tx.description}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}