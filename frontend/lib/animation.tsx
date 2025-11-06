'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';

export function useAnimationPref() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('animations') : null;
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    if (stored === 'on') setEnabled(true);
    else if (stored === 'off') setEnabled(false);
    else setEnabled(!prefersReduced && !isMobile);
  }, []);

  const toggle = useCallback(() => {
    setEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('animations', next ? 'on' : 'off');
      } catch {}
      return next;
    });
  }, []);

  const Toggle = useMemo(() => {
    return function Toggle() {
      return (
        <button
          type="button"
          aria-label="Toggle animations"
          onClick={toggle}
          className="fixed bottom-4 right-4 z-50 rounded-md border border-black/10 bg-white/80 px-3 py-2 text-xs shadow-sm backdrop-blur hover:bg-white dark:border-white/10 dark:bg-neutral-900/70"
        >
          Animations: {enabled ? 'On' : 'Off'}
        </button>
      );
    };
  }, [enabled, toggle]);

  return { enabled, setEnabled, toggle, Toggle } as const;
}

