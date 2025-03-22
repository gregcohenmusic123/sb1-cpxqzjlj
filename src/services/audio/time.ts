import { audioPlayer } from './AudioPlayer';

export function getCurrentTime() {
  const audio = audioPlayer.getAudio();
  return audio?.currentTime || 0;
}

export function getDuration() {
  const audio = audioPlayer.getAudio();
  return audio?.duration || 0;
}