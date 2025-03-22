export interface Track {
  id: string;
  title: string;
  artist: string;
  inscription: string;
  price: number;
  coverArt: string;
  audioUrl: string;
  plays: number;
  duration: number;
}

export interface Artist {
  id: string;
  name: string;
  bio: string;
  profileImage: string;
  coverImage: string;
  socialLinks: {
    twitter?: string;
    instagram?: string;
    website?: string;
  };
  stats: {
    totalTracks: number;
    totalSales: number;
    followers: number;
  };
}