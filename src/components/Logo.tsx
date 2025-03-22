import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
}

export default function Logo({ className = '' }: LogoProps) {
  return (
    <motion.img
      src="https://cfbkroydnewghbokycek.supabase.co/storage/v1/object/public/images/ADV3NT%20Logo.png"
      alt="Company Logo"
      className={`w-32 h-32 ${className}`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    />
  );
}