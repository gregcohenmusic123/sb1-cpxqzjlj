import React from 'react';
import { motion } from 'framer-motion';
import { headerAnimation } from './animations';

export default function MerchHeader() {
  return (
    <motion.div 
      className="flex items-center justify-between"
      {...headerAnimation} 
    >
      <h1 className="text-3xl text-primary font-bold">Merch</h1>
    </motion.div>
  );
}