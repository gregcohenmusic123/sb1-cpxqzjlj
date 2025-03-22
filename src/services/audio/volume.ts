import { audioPlayer } from './AudioPlayer';

export function setVolume(value: number) {
  const audio = audioPlayer.getAudio();
  if (audio) {
    audio.volume = value;
  }
}

export function getVolume() {
  const audio = audioPlayer.getAudio();
  return audio?.volume || 1;
}