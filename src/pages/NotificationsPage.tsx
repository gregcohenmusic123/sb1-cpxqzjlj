import React from 'react';
import { motion } from 'framer-motion';
import { notifications } from '../data/notifications';
import NotificationItem from '../components/Notifications/NotificationItem';

export default function NotificationsPage() {
  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl text-primary font-bold">Notifications</h1>
      
      <div className="space-y-2">
        {notifications.length === 0 ? (
          <div className="text-center py-8 text-primary/60">
            No notifications yet
          </div>
        ) : (
          notifications.map(notification => (
            <NotificationItem 
              key={notification.id} 
              notification={notification} 
            />
          ))
        )}
      </div>
    </motion.div>
  );
}