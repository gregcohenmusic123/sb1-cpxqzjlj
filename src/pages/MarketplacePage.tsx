import React from 'react';
import { motion } from 'framer-motion';
import MarketplaceHeader from '../components/Marketplace/MarketplaceHeader';
import MarketplaceGrid from '../components/Marketplace/MarketplaceGrid';
import TradingView from '../components/Terminal/TradingView/TradingView';
import MarketOverview from '../components/Terminal/MarketOverview/MarketOverview';
import { pageAnimation } from '../components/Marketplace/animations';

export default function MarketplacePage() {
  return (
    <motion.div 
      className="space-y-6"
      {...pageAnimation}
    >
      <MarketplaceHeader />
      {/* Pass prioritized tracks to grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TradingView />
        </div>
        <div>
          <MarketOverview />
        </div>
      </div>
      <MarketplaceGrid />
    </motion.div>
  );
}