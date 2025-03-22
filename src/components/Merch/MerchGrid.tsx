import React from 'react';
import { motion } from 'framer-motion';
import { MerchItem } from '../../types/merch';
import MerchCard from './MerchCard';
import { gridAnimation, gridItemAnimation } from './animations';

interface MerchGridProps {
  items: MerchItem[];
}

export default function MerchGrid({ items }: MerchGridProps) {
  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={gridAnimation}
      initial="hidden"
      animate="show"
    >
      {items.map(item => (
        <motion.div
          key={item.id}
          variants={gridItemAnimation}
        >
          <MerchCard
            item={item}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}