import React from 'react';
import { motion } from 'framer-motion';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [videoError, setVideoError] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 bg-surface overflow-hidden z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {/* Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-gradient-to-br from-surface via-accent/5 to-surface" />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/50 to-surface/30" />
      </div>

      {/* Content */}
      <div className="relative flex flex-col items-center justify-center min-h-screen">
        <motion.div
          className="flex flex-col items-center"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5,
            type: "spring",
            stiffness: 200
          }}
        >
          <motion.img
            src="https://cfbkroydnewghbokycek.supabase.co/storage/v1/object/public/images/ADV3NT%20Logo.png"
            alt="ADV3NT Logo"
            className="w-32 h-32 mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />

          <motion.div 
            className="relative"
            initial={{ letterSpacing: "0.2em" }}
            animate={{ letterSpacing: "0.1em" }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {/* Base text */}
            <h1 className="text-7xl md:text-9xl font-mono font-normal text-primary relative z-10">
              ADV3NT
            </h1>
            {/* Glow layers */}
            <h1 className="absolute inset-0 text-7xl md:text-9xl font-mono font-normal text-accent blur-[1px] animate-glow opacity-60 z-0">
              ADV3NT
            </h1>
            <h1 className="absolute inset-0 text-7xl md:text-9xl font-mono font-normal text-accent blur-[2px] animate-glow opacity-40 z-0">
              ADV3NT
            </h1>
          </motion.div>
          <motion.p
            className="mt-8 text-xl md:text-2xl text-primary/60"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            The Future Of Music
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
}