import { useState, useEffect } from 'react';

interface CursorPosition {
  x: number;
  y: number;
}

export const useCursorPosition = (delay: number = 0) => {
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });

  useEffect(() => {
    let timeoutId: number;

    const updatePosition = (e: MouseEvent) => {
      if (delay) {
        clearTimeout(timeoutId);
        timeoutId = window.setTimeout(() => {
          setPosition({ x: e.clientX, y: e.clientY });
        }, delay);
      } else {
        setPosition({ x: e.clientX, y: e.clientY });
      }
    };

    window.addEventListener('mousemove', updatePosition);
    return () => {
      window.removeEventListener('mousemove', updatePosition);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [delay]);

  return position;
};