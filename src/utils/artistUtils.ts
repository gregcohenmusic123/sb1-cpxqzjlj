import { artists } from '../data/artists';

export function findArtistIdByName(artistName: string): string {
  const artist = artists.find(a => a.name === artistName);
  if (!artist) {
    console.warn(`Artist not found: ${artistName}`);
    return '';
  }
  return artist.id;
}