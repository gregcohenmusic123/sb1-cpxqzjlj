import { MerchItem } from '../types/merch';

export const merchItems: MerchItem[] = [
  // CHUCKIE Merch (prioritized)
  {
    id: 'mc-vinyl-1',
    type: 'vinyl',
    name: 'Higher Voltage - Get Ready',
    artist: 'CHUCKIE',
    description: '7 Inch Vinyl (limited edition) - Chuckie & Gregor Salto ft. Sister Smurf & Simple Simon',
    price: 0.045,
    image: 'https://cfbkroydnewghbokycek.supabase.co/storage/v1/object/public/images/Higher%20Voltage_Get%20Ready.png',
    inscription: 'ord1:vinyl789...',
    inStock: 25,
    attributes: {
      edition: '7 Inch Vinyl',
      limitedRun: 75
    }
  },
  {
    id: 'mc-shirt-1',
    type: 't-shirt',
    name: 'Voltage - Raw & Uncut',
    artist: 'CHUCKIE',
    description: 'Bubbling Culture Club Tee',
    price: 0.022,
    image: 'https://cfbkroydnewghbokycek.supabase.co/storage/v1/object/public/images/Bubbling%20Culture%20Club%20Tee.png',
    inscription: 'ord1:shirt789...',
    inStock: 60,
    attributes: {
      size: 'S/M/L/XL',
      color: 'Black'
    }
  },
  // Daytona Starsky Merch
  {
    id: 'dd-vinyl-1',
    type: 'vinyl',
    name: 'Reality Station - Limited Edition Vinyl',
    artist: 'Daytona Starsky',
    description: 'Limited edition 180g blue vinyl featuring Gasoline and other hits. Each record is uniquely tokenized on Bitcoin.',
    price: 0.05,
    image: 'https://cfbkroydnewghbokycek.supabase.co/storage/v1/object/public/images/Daytona%20Starsky%20-%20Reality%20Station%20LP.png?t=2024-12-29T22%3A29%3A02.719Z',
    inscription: 'ord1:vinyl123...',
    inStock: 50,
    attributes: {
      edition: 'First Press',
      limitedRun: 100
    }
  },
  {
    id: 'dd-shirt-1',
    type: 't-shirt',
    name: 'Daytona Starsky "Better Views, Views Better" Womens Tour Shirt',
    artist: 'Daytona Starsky',
    description: 'Official tour merchandise featuring unique digital art. Each shirt comes with a tokenized digital twin.',
    price: 0.02,
    image: 'https://cfbkroydnewghbokycek.supabase.co/storage/v1/object/public/images/Daytona%20Starsky%20-%20Better%20Views,%20Views%20Better%20T-Shirt.png',
    inscription: 'ord1:shirt123...',
    inStock: 75,
    attributes: {
      size: 'S/M/L/XL',
      color: 'White'
    }
  },

  // DJ Cassidy Merch
  {
    id: 'cs-vinyl-1',
    type: 'vinyl',
    name: 'Pass The Mic - Collector\'s Edition',
    artist: 'DJ Cassidy',
    description: 'Limited edition 180g gold vinyl featuring Paradise and exclusive remixes. Includes holographic artwork.',
    price: 0.06,
    image: 'https://cfbkroydnewghbokycek.supabase.co/storage/v1/object/public/images/DJ%20Cassidy%20-%20Pass%20The%20Mic%20LP.png',
    inscription: 'ord1:vinyl456...',
    inStock: 30,
    attributes: {
      edition: 'Collector\'s',
      limitedRun: 50
    }
  },
  {
    id: 'cs-shirt-1',
    type: 't-shirt',
    name: 'Resort Cashmere Sweater',
    artist: 'DJ Cassidy',
    description: 'Luxury sweater that unlocks augmented reality experiences when scanned.',
    price: 0.025,
    image: 'https://cfbkroydnewghbokycek.supabase.co/storage/v1/object/public/images/DJ%20Cassidy%20-%20Resort%20Sweater.png?t=2024-12-29T22%3A46%3A47.942Z',
    inscription: 'ord1:shirt456...',
    inStock: 100,
    attributes: {
      size: 'S/M/L/XL',
      color: 'Navy'
    }
  }
];