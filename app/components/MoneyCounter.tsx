'use client';

import { useState, useEffect, useRef } from 'react';

export default function MoneyCounter({ target }: { target: number }) {
  const [current, setCurrent] = useState(0);
  const ref = useRef<number | null>(null);

  useEffect(() => {
    const duration = 2000;
    const startTime = Date.now();

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(eased * target));

      if (progress < 1) {
        ref.current = requestAnimationFrame(tick);
      }
    };

    ref.current = requestAnimationFrame(tick);
    return () => {
      if (ref.current) cancelAnimationFrame(ref.current);
    };
  }, [target]);

  return (
    <span>${current.toLocaleString()}</span>
  );
}
