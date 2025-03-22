class AudioPlayerService {
  private audio: HTMLAudioElement | null = null;
  private currentUrl: string | null = null;
  private eventListeners: { [key: string]: (() => void)[] } = {};

  initialize() {
    if (!this.audio) {
      this.audio = new Audio();
    }
  }

  async play(url: string) {
    this.initialize();
    if (!this.audio) return;

    try {
      if (this.currentUrl !== url) {
        this.audio.src = url;
        this.currentUrl = url;
        await this.audio.load();
      }
      
      await this.audio.play();
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.debug('Audio loading aborted');
      } else {
        throw error;
      }
    }
  }

  pause() {
    if (this.audio) {
      this.audio.pause();
    }
  }

  setVolume(value: number) {
    if (this.audio) {
      this.audio.volume = value;
    }
  }

  getCurrentTime() {
    return this.audio?.currentTime || 0;
  }

  getDuration() {
    return this.audio?.duration || 0;
  }

  seek(time: number) {
    if (this.audio) {
      this.audio.currentTime = time;
    }
  }

  forward(seconds: number = 10) {
    if (this.audio) {
      const newTime = Math.min(this.audio.currentTime + seconds, this.audio.duration);
      this.audio.currentTime = newTime;
    }
  }

  rewind(seconds: number = 10) {
    if (this.audio) {
      const newTime = Math.max(this.audio.currentTime - seconds, 0);
      this.audio.currentTime = newTime;
    }
  }

  addEventListener(event: string, handler: () => void) {
    if (!this.audio) this.initialize();
    if (!this.eventListeners[event]) {
      this.eventListeners[event] = [];
    }
    this.eventListeners[event].push(handler);
    this.audio?.addEventListener(event, handler);
  }

  removeEventListener(event: string, handler: () => void) {
    if (!this.audio) return;
    const index = this.eventListeners[event]?.indexOf(handler);
    if (index > -1) {
      this.eventListeners[event].splice(index, 1);
      this.audio.removeEventListener(event, handler);
    }
  }

  cleanup() {
    if (this.audio) {
      // Remove all event listeners
      Object.entries(this.eventListeners).forEach(([event, handlers]) => {
        handlers.forEach(handler => {
          this.audio?.removeEventListener(event, handler);
        });
      });
      this.eventListeners = {};
      
      this.audio.pause();
      this.audio.src = '';
      this.audio = null;
      this.currentUrl = null;
    }
  }
}

export const audioPlayer = new AudioPlayerService();