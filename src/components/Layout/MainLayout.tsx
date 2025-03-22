import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../Header';
import Sidebar from '../Navigation/Sidebar';
import MobileNavbar from '../Navigation/MobileNavbar';
import MusicPlayer from '../Player/MusicPlayer';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [showContent, setShowContent] = React.useState(false);

  React.useEffect(() => {
    // Delay showing content until splash screen is complete
    const timer = setTimeout(() => setShowContent(true), 2800); // 2500ms (splash) + 300ms buffer
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen text-primary">
      <AnimatePresence>
        {showContent && (
          <>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="fixed top-0 left-0 right-0 z-50 glass-effect"
            >
              <Header />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hidden md:block fixed top-16 left-0 bottom-0 w-64 gradient-surface glass-effect border-r border-accent/10"
            >
              <Sidebar />
            </motion.div>

            <motion.main 
              className="pt-20 pb-32 md:ml-64 md:pt-24"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
                {children}
              </div>
            </motion.main>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <MobileNavbar />
              <MusicPlayer />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}