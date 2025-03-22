import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, MessageSquare, Heart } from 'lucide-react';
import { Notification } from '../../types/notifications';
import { formatDate } from '../../utils/dateUtils';

interface NotificationItemProps {
  notification: Notification;
}

export default function NotificationItem({ notification }: NotificationItemProps) {
  const getIcon = () => {
    switch (notification.type) {
      case 'purchase':
        return <ShoppingCart className="w-5 h-5 text-green-500" />;
      case 'comment':
        return <MessageSquare className="w-5 h-5 text-blue-500" />;
      case 'like':
        return <Heart className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <Link
      to={notification.link || '#'}
      className={`block p-4 rounded-lg transition-colors ${
        notification.read 
          ? 'bg-surface/50 hover:bg-surface/80' 
          : 'bg-surface hover:bg-surface/80 border border-accent/20'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="mt-1">{getIcon()}</div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-primary">{notification.message}</p>
          <p className="text-xs text-primary/60 mt-1">
            {formatDate(notification.timestamp)}
          </p>
        </div>
      </div>
    </Link>
  );
}