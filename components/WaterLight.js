'use client';

import { useEffect, useRef, useState } from 'react';

// Water caustics drawn live at low resolution and scaled up by the browser.
// The colours come from the theme tokens, the loop stops off screen and under reduced motion,
// and a visible control pauses it (it runs well past five seconds).
const W = 168;
const H = 96;
const TAU = Math.PI * 2;

function tokenRgb(name, fallback) {
  const probe = document.createElement('canvas');
  probe.width = probe.height = 1;
  const ctx = probe.getContext('2d');
  ctx.fillStyle = fallback;
  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  return [r, g, b];
}

function paint(ctx, image, colours, time) {
  const { shade, deep, light, warm } = colours;
  const data = image.data;
  for (let y = 0; y < H; y += 1) {
    for (let x = 0; x < W; x += 1) {
      const px = ((x / W) * TAU * 1.6) % TAU - 250;
      const py = ((y / H) * TAU * 0.9) % TAU - 250;
      let ix = px;
      let iy = py;
      let c = 1;
      for (let n = 0; n < 4; n += 1) {
        const t = time * (1 - 3.5 / (n + 1));
        const nx = px + Math.cos(t - ix) + Math.sin(t + iy);
        const ny = py + Math.sin(t - iy) + Math.cos(t + ix);
        ix = nx;
        iy = ny;
        const dx = px / (Math.sin(ix + t) / 0.005);
        const dy = py / (Math.cos(iy + t) / 0.005);
        c += 1 / Math.sqrt(dx * dx + dy * dy);
      }
      c /= 4;
      c = 1.17 - Math.pow(c, 1.4);
      const glow = Math.min(1, Math.pow(Math.abs(c), 7));
      const depth = y / H;
      const k = (y * W + x) * 4;
      const seam = Math.max(0, glow - 0.72) * 2.4;
      for (let ch = 0; ch < 3; ch += 1) {
        const base = shade[ch] + (deep[ch] - shade[ch]) * depth * 0.55;
        const lit = base + (light[ch] - base) * glow;
        data[k + ch] = lit + (warm[ch] - lit) * seam * 0.35;
      }
      data[k + 3] = 255;
    }
  }
  ctx.putImageData(image, 0, 0);
}

export default function WaterLight({ className = '', still = false }) {
  const figureRef = useRef(null);
  const canvasRef = useRef(null);
  const [held, setHeld] = useState(false);
  const [reduced, setReduced] = useState(false);
  const heldRef = useRef(false);

  useEffect(() => {
    heldRef.current = held;
  }, [held]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const figure = figureRef.current;
    if (!canvas || !figure) return undefined;
    const ctx = canvas.getContext('2d');
    const image = ctx.createImageData(W, H);
    const colours = {
      shade: tokenRgb('--color-shade', 'rgb(180, 220, 228)'),
      deep: tokenRgb('--color-shade-2', 'rgb(120, 180, 200)'),
      light: tokenRgb('--color-light', 'rgb(254, 254, 252)'),
      warm: tokenRgb('--spec-2', 'rgb(240, 230, 140)'),
    };
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(motion.matches);
    let visible = false;
    let frame = 0;
    let last = 0;
    let clock = 18;
    paint(ctx, image, colours, clock);
    if (still) return undefined;

    const tick = now => {
      frame = 0;
      if (!visible || heldRef.current || motion.matches) return;
      const step = last ? Math.min(now - last, 100) : 0;
      if (!last || now - last > 45) {
        clock += step / 1000 * 0.42;
        last = now;
        paint(ctx, image, colours, clock);
    if (still) return undefined;
      }
      frame = requestAnimationFrame(tick);
    };
    const start = () => {
      if (!frame && visible && !heldRef.current && !motion.matches) {
        last = 0;
        frame = requestAnimationFrame(tick);
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
    });
    observer.observe(figure);
    const onMotion = () => { setReduced(motion.matches); start(); };
    motion.addEventListener('change', onMotion);
    figure.waterStart = start;
    return () => {
      observer.disconnect();
      motion.removeEventListener('change', onMotion);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [still]);

  useEffect(() => {
    if (!held) figureRef.current?.waterStart?.();
  }, [held]);

  return (
    <figure ref={figureRef} className={`water-light ${className}`} data-loop={still ? undefined : true} aria-hidden={still ? 'true' : undefined}>
      <canvas ref={canvasRef} width={W} height={H} aria-hidden="true" />
      {!reduced && !still && <button className="btn btn--clear btn--small water-light__toggle" type="button" aria-pressed={held} onClick={() => setHeld(value => !value)}>{held ? 'Play the water' : 'Pause the water'}</button>}
    </figure>
  );
}
