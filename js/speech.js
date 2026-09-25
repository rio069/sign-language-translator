/**
 * Audio Effects and Text-to-Speech (TTS) Manager.
 * Uses Web Audio API for synthetic feedback chimes and Web Speech API for voice.
 */

class SoundController {
  constructor() {
    this.audioCtx = null;
    this.synth = window.speechSynthesis || null;
    this.enabled = true;
    this.speechRate = 1.0;
    this.voices = [];

    this.initAudioContext();
    if (this.synth) {
      this.loadVoices();
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  initAudioContext() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.audioCtx = new AudioCtx();
      }
    } catch (e) {
      console.warn("AudioContext not supported:", e);
    }
  }

  resumeAudio() {
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  loadVoices() {
    if (!this.synth) return;
    this.voices = this.synth.getVoices().filter(v => v.lang.startsWith('en'));
  }

  // Play a gentle pop/ding chime when a letter is confirmed
  playConfirmationChime() {
    if (!this.enabled || !this.audioCtx) return;
    this.resumeAudio();

    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      // Crisp 880Hz (A5) -> 1320Hz (E6) quick blip
      const now = this.audioCtx.currentTime;
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(1320, now + 0.08);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.16);
    } catch (e) {
      // Audio error ignored
    }
  }

  // Play a triumphant 3-note chime for completing a practice challenge!
  playSuccessArpeggio() {
    if (!this.enabled || !this.audioCtx) return;
    this.resumeAudio();

    try {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      const now = this.audioCtx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        const noteStart = now + idx * 0.08;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, noteStart);

        gain.gain.setValueAtTime(0.15, noteStart);
        gain.gain.exponentialRampToValueAtTime(0.001, noteStart + 0.25);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(noteStart);
        osc.stop(noteStart + 0.26);
      });
    } catch (e) {
      // Audio error ignored
    }
  }

  // Speak the translated sentence using native speech synthesis
  speak(text) {
    if (!this.enabled || !this.synth || !text.trim()) return;

    // Cancel ongoing speech to avoid queue pileup
    this.synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = this.speechRate;
    utterance.pitch = 1.0;

    // Prefer an English voice if available
    if (this.voices.length > 0) {
      utterance.voice = this.voices.find(v => v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha')) || this.voices[0];
    }

    this.synth.speak(utterance);
  }
}

if (typeof window !== 'undefined') {
  window.SoundController = SoundController;
}
