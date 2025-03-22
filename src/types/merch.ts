export interface MerchItem {
  id: string;
  type: 'vinyl' | 't-shirt';
  name: string;
  artist: string;
  description: string;
  price: number;
  image: string;
  inscription: string;
  inStock: number;
  attributes?: {
    size?: string;
    color?: string;
    edition?: string;
    limitedRun?: number;
  };
}