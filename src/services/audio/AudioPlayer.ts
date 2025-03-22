// Core audio player service
class AudioPlayer {
  private audio: HTMLAudioElement | null = null;
  private currentUrl: string | null = null;

  initialize() {
    if (!this.audio) {
      this.audio = new Audio();
    }
  }

  getAudio() {
    return this.audio;
  }

  getCurrentUrl() {
    return this.currentUrl;
  }

  setCurrentUrl(url: string) {
    this.currentUrl = url;
  }

  cleanup() {
    if (this.audio) {
      this.audio.pause();
      this.audio.src = '';
      this.audio = null;
      this.currentUrl = null;
    }
  }
}

export const audioPlayer = new AudioPlayer();