// ============================================================
// PHONIX IT SOLUTIONS — MODERN CURSOR & SPARK EFFECTS
// Preserves default OS cursor.
// 1. Subtle electric cyan glow & floating particle trail on mouse move.
// 2. High-energy electric tech spark burst & shockwave on click.
// 3. 100% non-blocking (pointer-events: none) & auto-sleep on idle.
// ============================================================

(function () {
  'use strict';

  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const CONFIG = {
    sparkCount: 16,
    sparkColors: ['#38bdf8', '#2563eb', '#60a5fa', '#93c5fd', '#ffffff'],
    trailColors: ['#38bdf8', '#2563eb', '#60a5fa'],
    maxMoveParticles: 45,
    sparkSpeed: 4.8,
  };

  let canvas = null;
  let ctx = null;
  let width = 0;
  let height = 0;
  let animId = null;

  const sparks = [];
  const rings = [];
  const trail = [];

  const mouse = { x: -100, y: -100, lastX: -100, lastY: -100, moving: false };
  let isTouch = false;
  let idleTimer = null;

  function init() {
    isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    canvas = document.createElement('canvas');
    canvas.id = 'cursor-effects-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '999999';
    canvas.style.overflow = 'hidden';
    document.body.appendChild(canvas);

    ctx = canvas.getContext('2d', { alpha: true });

    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Pointer move listener
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('mousemove', onPointerMove, { passive: true });

    // Click / Pointerdown for Sparks
    window.addEventListener('pointerdown', onPointerDown, { passive: true });

    // Touch support for tap sparks
    window.addEventListener('touchstart', onTouchStart, { passive: true });
  }

  function resize() {
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
  }

  function onPointerMove(e) {
    if (isTouch && e.pointerType === 'touch') return;

    mouse.lastX = mouse.x;
    mouse.lastY = mouse.y;
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.moving = true;

    const dx = mouse.x - mouse.lastX;
    const dy = mouse.y - mouse.lastY;
    const dist = Math.hypot(dx, dy);

    // Spawn subtle floating trail particles when moving
    if (dist > 3 && trail.length < CONFIG.maxMoveParticles) {
      const color = CONFIG.trailColors[Math.floor(Math.random() * CONFIG.trailColors.length)];
      trail.push({
        x: mouse.x + (Math.random() - 0.5) * 6,
        y: mouse.y + (Math.random() - 0.5) * 6,
        vx: (Math.random() - 0.5) * 0.6 - dx * 0.05,
        vy: (Math.random() - 0.5) * 0.6 - dy * 0.05,
        size: Math.random() * 2.2 + 1.2,
        color: color,
        alpha: 0.8,
        decay: Math.random() * 0.03 + 0.025,
      });
    }

    startAnimation();

    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      mouse.moving = false;
    }, 200);
  }

  function onPointerDown(e) {
    if (e.button && e.button !== 0) return;
    createSparkBurst(e.clientX, e.clientY);
  }

  function onTouchStart(e) {
    if (e.touches && e.touches[0]) {
      createSparkBurst(e.touches[0].clientX, e.touches[0].clientY);
    }
  }

  function createSparkBurst(x, y) {
    // 1. Shockwave glow ring
    rings.push({
      x: x,
      y: y,
      radius: 4,
      maxRadius: 32,
      lineWidth: 2.2,
      alpha: 0.9,
      decay: 0.045,
      color: '#38bdf8',
    });

    // 2. High-energy spark streaks
    const count = CONFIG.sparkCount;
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.45;
      const speed = Math.random() * CONFIG.sparkSpeed + 2.5;
      const color = CONFIG.sparkColors[Math.floor(Math.random() * CONFIG.sparkColors.length)];

      sparks.push({
        x: x,
        y: y,
        prevX: x,
        prevY: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        gravity: 0.07,
        friction: 0.94,
        size: Math.random() * 2 + 1.6,
        color: color,
        alpha: 1,
        decay: Math.random() * 0.035 + 0.025,
      });
    }

    startAnimation();
  }

  function startAnimation() {
    if (!animId) {
      animId = requestAnimationFrame(render);
    }
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    let active = false;

    // --- Render Shockwave Rings ---
    for (let i = rings.length - 1; i >= 0; i--) {
      const r = rings[i];
      r.radius += (r.maxRadius - r.radius) * 0.22 + 0.6;
      r.alpha -= r.decay;

      if (r.alpha <= 0) {
        rings.splice(i, 1);
        continue;
      }

      active = true;
      ctx.save();
      ctx.beginPath();
      ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
      ctx.strokeStyle = r.color;
      ctx.lineWidth = Math.max(0.5, r.lineWidth * (r.alpha / 0.9));
      ctx.globalAlpha = Math.max(0, r.alpha);
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#38bdf8';
      ctx.stroke();
      ctx.restore();
    }

    // --- Render Sparks on Click ---
    for (let i = sparks.length - 1; i >= 0; i--) {
      const s = sparks[i];
      s.prevX = s.x;
      s.prevY = s.y;

      s.x += s.vx;
      s.y += s.vy;
      s.vy += s.gravity;
      s.vx *= s.friction;
      s.vy *= s.friction;
      s.alpha -= s.decay;

      if (s.alpha <= 0) {
        sparks.splice(i, 1);
        continue;
      }

      active = true;
      ctx.save();
      ctx.globalAlpha = Math.max(0, s.alpha);

      // Streak line from prevX, prevY to x, y
      ctx.beginPath();
      ctx.moveTo(s.prevX, s.prevY);
      ctx.lineTo(s.x, s.y);
      ctx.strokeStyle = s.color;
      ctx.lineWidth = s.size;
      ctx.lineCap = 'round';
      ctx.shadowBlur = 10;
      ctx.shadowColor = s.color;
      ctx.stroke();

      // Bright spark tip
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size * 0.7, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();

      ctx.restore();
    }

    // --- Render Cursor Move Trail Particles ---
    for (let i = trail.length - 1; i >= 0; i--) {
      const p = trail[i];
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= p.decay;
      p.size = Math.max(0.3, p.size * 0.97);

      if (p.alpha <= 0) {
        trail.splice(i, 1);
        continue;
      }

      active = true;
      ctx.save();
      ctx.globalAlpha = Math.max(0, p.alpha);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.shadowBlur = 8;
      ctx.shadowColor = p.color;
      ctx.fill();
      ctx.restore();
    }

    // --- Subtle Aura Under Cursor ---
    if (!isTouch && mouse.x >= 0 && mouse.y >= 0 && mouse.moving) {
      ctx.save();
      const aura = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 20);
      aura.addColorStop(0, 'rgba(56, 189, 248, 0.25)');
      aura.addColorStop(0.5, 'rgba(37, 99, 235, 0.08)');
      aura.addColorStop(1, 'rgba(37, 99, 235, 0)');
      ctx.fillStyle = aura;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 20, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    if (active || (mouse.moving && !isTouch)) {
      animId = requestAnimationFrame(render);
    } else {
      animId = null;
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
