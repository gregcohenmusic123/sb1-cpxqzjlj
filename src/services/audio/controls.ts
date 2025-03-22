import { audioPlayer } from './AudioPlayer';

export async function play(url: string) {
  const audio = audioPlayer.getAudio();
  if (!audio) {
    audioPlayer.initialize();
  }

  try {
    // If it's a new track, load it first
    if (audioPlayer.getCurrentUrl() !== url) {
      audio!.src = url;
      audioPlayer.setCurrentUrl(url);
      await audio!.load();
    }
    
    await audio!.play();
  } catch (error) {
    // Ignore abort errors when changing tracks quickly
    if (error instanceof Error && error.name === 'AbortError') {
      console.debug('Audio loading aborted');
    } else {
      throw error;
    }
  }
}

export function pause() {
  const audio = audioPlayer.getAudio();
  if (audio) {
    audio.pause();
  }
}

export function seek(time: number) {
  const audio = audioPlayer.getAudio();
  if (audio) {
    audio.currentTime = time;
  }
}