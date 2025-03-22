import React from 'react';
import { motion } from 'framer-motion';
import { headerAnimation } from './animations';

export default function EventHeader() {
  return (
    <motion.div 
      className="flex items-center justify-between"
      {...headerAnimation}
    >
      <h1 className="text-3xl text-primary font-bold">Exclusive Events</h1>
    </motion.div>
  );
}