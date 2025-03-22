import { audioPlayer } from './AudioPlayer';
import { play, pause, seek } from './controls';
import { setVolume, getVolume } from './volume';
import { getCurrentTime, getDuration } from './time';
import { addEventListener, removeEventListener } from './events';

export const audioService = {
  play,
  pause,
  seek,
  setVolume,
  getVolume,
  getCurrentTime,
  getDuration,
  addEventListener,
  removeEventListener,
  cleanup: () => audioPlayer.cleanup()
};