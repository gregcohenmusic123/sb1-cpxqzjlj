import { Notification } from '../types/notifications';

export const notifications: Notification[] = [
  {
    id: '1',
    type: 'purchase',
    message: 'Someone purchased "Kaws" for 0.015 BTC',
    read: false,
    timestamp: Date.now() - 1000 * 60 * 30, // 30 minutes ago
    link: '/marketplace'
  },
  {
    id: '2',
    type: 'comment',
    message: 'New comment on the track "Paradise"',
    read: false,
    timestamp: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
    link: '/artist/dj-cassidy'
  },
  {
    id: '3',
    type: 'like',
    message: 'CryptoBeats liked the track "8BIT"',
    read: false,
    timestamp: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
    link: '/top-tracks'
  }
];