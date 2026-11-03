/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { NotificationSoundType } from '../types/notifications';

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playNotificationSound(type: NotificationSoundType, volume = 0.5): void {
  if (type === 'none' || volume <= 0) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const masterGain = ctx.createGain();
  masterGain.gain.setValueAtTime(volume * 0.3, now);
  masterGain.connect(ctx.destination);

  switch (type) {
    case 'pixel-ping': {
      // Crisp 2-tone melodic chirp
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain1 = ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(587.33, now); // D5
      osc1.frequency.exponentialRampToValueAtTime(880, now + 0.08); // A5

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(1174.66, now + 0.05); // D6
      osc2.frequency.exponentialRampToValueAtTime(1760, now + 0.16); // A6

      gain1.gain.setValueAtTime(0.7, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      osc1.connect(gain1);
      osc2.connect(gain1);
      gain1.connect(masterGain);

      osc1.start(now);
      osc1.stop(now + 0.3);
      osc2.start(now + 0.05);
      osc2.stop(now + 0.3);
      break;
    }

    case 'gentle-chime': {
      // Soft ambient glass chime chord
      const freqs = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const noteGain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.02);

        noteGain.gain.setValueAtTime(0.3, now + idx * 0.02);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6 + idx * 0.1);

        osc.connect(noteGain);
        noteGain.connect(masterGain);

        osc.start(now + idx * 0.02);
        osc.stop(now + 0.7);
      });
      break;
    }

    case 'pebble-pop': {
      // Warm tactile droplet pop
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(950, now + 0.04);
      osc.frequency.exponentialRampToValueAtTime(450, now + 0.12);

      gain.gain.setValueAtTime(0.9, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

      osc.connect(gain);
      gain.connect(masterGain);

      osc.start(now);
      osc.stop(now + 0.2);
      break;
    }

    case 'modern-blip': {
      // Modern subtle tech notification blip
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.setValueAtTime(1200, now + 0.04);

      gain.gain.setValueAtTime(0.5, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      osc.connect(gain);
      gain.connect(masterGain);

      osc.start(now);
      osc.stop(now + 0.15);
      break;
    }

    default:
      break;
  }
}

export function triggerHaptic(enabled = true): void {
  if (!enabled || typeof window === 'undefined') return;
  if ('vibrate' in navigator) {
    try {
      navigator.vibrate([20, 30, 20]);
    } catch {
      // Ignore vibration error on unsupported browsers
    }
  }
}
