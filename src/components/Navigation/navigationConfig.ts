import {
  Home,
  TrendingUp,
  Library,
  LineChart,
  Shirt,
  Calendar,
  Bell,
  User
} from 'lucide-react';

export const navigationItems = [
  {
    icon: Home,
    label: 'Home',
    path: '/'
  },
  {
    icon: TrendingUp,
    label: 'Top Tracks',
    path: '/top-tracks'
  },
  {
    icon: Library,
    label: 'Collections',
    path: '/collections',
    requiresAuth: true
  },
  {
    icon: LineChart,
    label: 'Marketplace',
    path: '/marketplace'
  },
  {
    icon: Shirt,
    label: 'Merch',
    path: '/merch'
  },
  {
    icon: Calendar,
    label: 'Events',
    path: '/events'
  },
  {
    icon: Bell,
    label: 'Notifications',
    path: '/notifications',
    requiresAuth: true,
    badge: 3
  },
  {
    icon: User,
    label: 'Profile',
    path: '/profile',
    requiresAuth: true
  }
];