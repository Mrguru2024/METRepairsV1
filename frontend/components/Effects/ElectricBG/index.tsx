'use client';
/* global globalThis */
import { useEffect, useRef } from 'react';

export default function ElectricBG() {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const mouse = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvasEl = ref.current;
    if (!canvasEl) return;
    const canvas: HTMLCanvasElement = canvasEl;
    const rawContext = canvas.getContext('2d');
    if (!rawContext) return;
    const ctx: CanvasRenderingContext2D = rawContext;

    let raf = 0;

    const getDpr = () => Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    let dpr = getDpr();
    function resize() {
      const parent = canvas.parentElement ?? document.body;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect.width));
      const h = Math.max(1, Math.floor(rect.height));
      dpr = getDpr();
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    globalThis.addEventListener('resize', resize);

    const sparks: { x: number; y: number; vx: number; vy: number; life: number }[] = [];

    function spawn(x: number, y: number) {
      for (let i = 0; i < 10; i++) {
        const a = Math.random() * Math.PI * 2;
        const s = 0.4 + Math.random() * 1.2;
        sparks.push({
          x,
          y,
          vx: Math.cos(a) * s,
          vy: Math.sin(a) * s,
          life: 30 + Math.random() * 20,
        });
      }
    }

    let tick = 0;
    let sx = 0;
    let sy = 0;
    function step() {
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.clearRect(0, 0, w, h);
      // Soft base glow so effect is always visible
      const rg = ctx.createRadialGradient(w * 0.3, h * 0.2, 20, w * 0.3, h * 0.2, Math.max(w, h));
      rg.addColorStop(0, 'rgba(11,65,228,0.12)');
      rg.addColorStop(1, 'rgba(11,65,228,0.0)');
      ctx.fillStyle = rg;
      ctx.fillRect(0, 0, w, h);

      // Subtle grid glow
      ctx.globalAlpha = 0.18;
      ctx.strokeStyle = '#0B41E4';
      ctx.lineWidth = 1;
      const gap = 48;
      for (let x = 0; x < w; x += gap) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += gap) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Lightning segments near mouse
      if (mouse.current) {
        const { x, y } = mouse.current;
        // Smooth follow
        sx += (x - sx) * 0.1;
        sy += (y - sy) * 0.1;
        ctx.globalAlpha = 0.45;
        ctx.strokeStyle = '#4AE66C';
        ctx.lineWidth = 2;
        for (let i = 0; i < 3; i++) {
          const len = 140 + Math.random() * 80;
          let px = sx + (Math.random() - 0.5) * 40;
          let py = sy + (Math.random() - 0.5) * 40;
          ctx.beginPath();
          ctx.moveTo(px, py);
          const segments = 12;
          for (let s = 0; s < segments; s++) {
            px += (len / segments) * (0.9 + Math.random() * 0.2);
            py += (Math.random() - 0.5) * 16;
            ctx.lineTo(px, py);
          }
          ctx.stroke();
        }
        spawn(sx, sy);
      } else {
        // Idle subtle arcs drifting across
        tick++;
        if (tick % 3 === 0) {
          ctx.globalAlpha = 0.15;
          ctx.strokeStyle = '#4AE66C';
          ctx.lineWidth = 1.5;
          const startY = (Date.now() / 40) % h;
          let px = 0;
          let py = startY + (Math.random() - 0.5) * 50;
          ctx.beginPath();
          ctx.moveTo(px, py);
          const segments = 16;
          for (let s = 0; s < segments; s++) {
            px += w / segments;
            py += (Math.random() - 0.5) * 20;
            ctx.lineTo(px, py);
          }
          ctx.stroke();
        }
      }

      // Sparks
      ctx.globalAlpha = 0.6;
      ctx.fillStyle = '#FFB020';
      for (let i = sparks.length - 1; i >= 0; i--) {
        const p = sparks[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.98;
        p.vy = p.vy * 0.98 + 0.03;
        p.life -= 1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
        ctx.fill();
        if (p.life <= 0) sparks.splice(i, 1);
      }

      raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);

    function move(e: MouseEvent) {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }
    function leave() {
      mouse.current = null;
    }
    globalThis.addEventListener('mousemove', move);
    globalThis.addEventListener('mouseout', leave);

    return () => {
      globalThis.removeEventListener('resize', resize);
      globalThis.removeEventListener('mousemove', move);
      globalThis.removeEventListener('mouseout', leave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="pointer-events-none absolute inset-0 z-10 opacity-80 dark:opacity-60"
      tabIndex={-1}
      aria-hidden
    />
  );
}
