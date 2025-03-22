import React from 'react';
import { motion } from 'framer-motion';
import { LineChart } from 'lucide-react';
import { headerAnimation } from './animations';

export default function MarketplaceHeader() {
  return (
    <motion.div 
      className="flex items-center justify-between"
      {...headerAnimation}
    >
      <div className="flex items-center gap-3">
        <LineChart className="w-6 h-6 text-accent" />
        <h1 className="text-3xl text-primary font-bold">Marketplace</h1>
      </div>
    </motion.div>
  );
}