export interface Event {
  id: string;
  title: string;
  artist: string;
  date: string;
  location: string;
  description: string;
  image: string;
  price: number;
  type: 'concert' | 'meet-greet' | 'backstage' | 'masterclass';
  capacity: number;
  remaining: number;
  requirements: {
    minHoldings?: number;
    specificOrdinals?: string[];
  };
}