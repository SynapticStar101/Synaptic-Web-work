/**
 * SYNAPTIC STARS RETRO UNIVERSE
 * Sound System — Web Audio API retro beeps & boops
 * Fully accessible: off by default, user-controlled toggle
 */

(function () {
  'use strict';

  // Audio context — created lazily on first user interaction
  let audioCtx = null;
  let soundEnabled = false;

  function getCtx() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    // Resume if suspended (browser autoplay policy)
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  /**
   * Play a retro beep tone
   * @param {number} freq      - Frequency in Hz
   * @param {number} duration  - Duration in seconds
   * @param {string} type      - Oscillator type: 'square'|'sawtooth'|'sine'|'triangle'
   * @param {number} volume    - 0 to 1
   * @param {number} delay     - Start delay in seconds
   */
  function playTone(freq, duration, type = 'square', volume = 0.15, delay = 0) {
    if (!soundEnabled) return;
    try {
      const ctx = getCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);

      gain.gain.setValueAtTime(0, ctx.currentTime + delay);
      gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + delay + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);

      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + duration + 0.05);
    } catch (e) {
      // Silently fail — audio is non-critical
    }
  }

  /**
   * Retro "power on" jingle — plays once when sound is enabled
   */
  function playStartupJingle() {
    // Ascending arpeggio — classic 8-bit startup feel
    const notes = [261, 329, 392, 523, 659, 784];
    notes.forEach((freq, i) => {
      playTone(freq, 0.12, 'square', 0.12, i * 0.08);
    });
    // Final flourish
    playTone(1046, 0.3, 'square', 0.1, notes.length * 0.08);
  }

  /**
   * Hover beep — short, subtle
   */
  function playHoverBeep() {
    playTone(440, 0.06, 'square', 0.08);
  }

  /**
   * Click / activate sound
   */
  function playClickSound() {
    playTone(660, 0.05, 'square', 0.12);
    playTone(880, 0.08, 'square', 0.1, 0.05);
  }

  /**
   * Blog link hover — slightly different pitch
   */
  function playBlogHover() {
    playTone(523, 0.07, 'triangle', 0.1);
  }

  // Expose to window for main.js
  window.SynapticSounds = {
    enable() {
      soundEnabled = true;
      playStartupJingle();
    },
    disable() {
      soundEnabled = false;
    },
    isEnabled() {
      return soundEnabled;
    },
    hover: playHoverBeep,
    click: playClickSound,
    blogHover: playBlogHover,
  };
})();
