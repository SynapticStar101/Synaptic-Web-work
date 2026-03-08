/**
 * SYNAPTIC STARS RETRO UNIVERSE
 * Main JS — interactions, sound wiring, accessibility
 */

(function () {
  'use strict';

  // ── Sound toggle ──────────────────────────────────────
  const soundBtn = document.getElementById('sound-toggle');
  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      const isOn = soundBtn.getAttribute('aria-pressed') === 'true';
      if (isOn) {
        soundBtn.setAttribute('aria-pressed', 'false');
        soundBtn.querySelector('.sound-label').textContent = 'SOUND: OFF';
        window.SynapticSounds && window.SynapticSounds.disable();
      } else {
        soundBtn.setAttribute('aria-pressed', 'true');
        soundBtn.querySelector('.sound-label').textContent = 'SOUND: ON';
        window.SynapticSounds && window.SynapticSounds.enable();
      }
    });
  }

  // ── Game tile sounds ──────────────────────────────────
  const gameTiles = document.querySelectorAll('.game-tile-link');
  gameTiles.forEach(tile => {
    tile.addEventListener('mouseenter', () => {
      window.SynapticSounds && window.SynapticSounds.hover();
    });
    tile.addEventListener('focus', () => {
      window.SynapticSounds && window.SynapticSounds.hover();
    });
    tile.addEventListener('click', () => {
      window.SynapticSounds && window.SynapticSounds.click();
    });
  });

  // ── Blog link sound ───────────────────────────────────
  const blogBtn = document.querySelector('.blog-link-btn');
  if (blogBtn) {
    blogBtn.addEventListener('mouseenter', () => {
      window.SynapticSounds && window.SynapticSounds.blogHover();
    });
    blogBtn.addEventListener('focus', () => {
      window.SynapticSounds && window.SynapticSounds.blogHover();
    });
  }

  // ── Scanline overlay (purely decorative, aria-hidden) ─
  const scanline = document.createElement('div');
  scanline.setAttribute('aria-hidden', 'true');
  scanline.style.cssText = `
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    pointer-events: none;
    z-index: 9998;
    background: repeating-linear-gradient(
      0deg,
      rgba(0,0,0,0) 0px,
      rgba(0,0,0,0) 2px,
      rgba(0,0,0,0.04) 2px,
      rgba(0,0,0,0.04) 4px
    );
  `;
  document.body.appendChild(scanline);

  // ── Respect reduced motion for scanlines ─────────────
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  function handleMotion(e) {
    // Scanlines are static so they're fine regardless, but we
    // could remove them for users with very high contrast needs
  }
  motionQuery.addEventListener('change', handleMotion);

})();
