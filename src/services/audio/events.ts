import { audioPlayer } from './AudioPlayer';

export function addEventListener(event: string, handler: () => void) {
  const audio = audioPlayer.getAudio();
  audio?.addEventListener(event, handler);
}

export function removeEventListener(event: string, handler: () => void) {
  const audio = audioPlayer.getAudio();
  audio?.removeEventListener(event, handler);
}