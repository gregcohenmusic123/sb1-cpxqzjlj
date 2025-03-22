import { Event } from '../types/events';

export const events: Event[] = [
  {
    id: 'mc-meetgreet-2024',
    title: 'CHUCKIE VIP Experience',
    artist: 'CHUCKIE',
    date: '2025-08-10T19:00:00Z',
    location: 'Avant Gardner, New York',
    description: 'An intimate evening with CHUCKIE. Includes exclusive previews of upcoming tracks, photo opportunities, and a curated Ordinals exhibition.',
    image: 'https://cfbkroydnewghbokycek.supabase.co/storage/v1/object/public/images/Voltage%20Set.png',
    price: 0.02,
    type: 'meet-greet',
    capacity: 100,
    remaining: 45,
    requirements: {
      minHoldings: 2
    }
  },
  {
    id: 'dd-concert-2024',
    title: 'Pass The Mic World Tour',
    artist: 'DJ Cassidy',
    date: '2025-06-15T20:00:00Z',
    location: 'Crypto Arena, Los Angeles',
    description: 'Experience DJ Cassidy live in concert with a full immersive visual experience. Ordinal holders get exclusive backstage access and a private meet & greet session.',
    image: 'https://cfbkroydnewghbokycek.supabase.co/storage/v1/object/public/images/DJ%20Cassidy%20-%20Pass%20The%20Mic%20Live.png',
    price: 0.05,
    type: 'concert',
    capacity: 1000,
    remaining: 425,
    requirements: {
      minHoldings: 1
    }
  },
  {
    id: 'cs-masterclass-2024',
    title: 'Production Masterclass',
    artist: 'Daytona Starsky',
    date: '2025-07-22T18:00:00Z',
    location: 'ADV3NT Studios, New York',
    description: 'Join Daytona Starsky for an exclusive masterclass on music production in the digital age. Learn the secrets behind his signature sound.',
    image: 'https://cfbkroydnewghbokycek.supabase.co/storage/v1/object/public/images/Daytona%20Starsky%20-%20Live.png?t=2024-12-29T22%3A53%3A04.674Z',
    price: 0.03,
    type: 'masterclass',
    capacity: 50,
    remaining: 12,
    requirements: {
      specificOrdinals: ['ord1:def456...']
    }
  }
];