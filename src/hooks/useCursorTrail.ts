import { useState, useEffect, useRef } from 'react';

interface Point {
  id: number;
  x: number;
  y: number;
  timestamp: number;
}

export const useCursorTrail = (maxPoints: number = 10, fadeTime: number = 500) => {
  const [trail, setTrail] = useState<Point[]>([]);
  const nextIdRef = useRef(0);

  useEffect(() => {
    const updateTrail = (e: MouseEvent) => {
      const now = Date.now();
      const newPoint = {
        id: nextIdRef.current++,
        x: e.clientX,
        y: e.clientY,
        timestamp: now
      };
      
      setTrail(currentTrail => {
        // Remove old points
        const validTrail = currentTrail.filter(point => 
          now - point.timestamp < fadeTime
        );
        
        return [...validTrail, newPoint].slice(-maxPoints);
      });
    };

    window.addEventListener('mousemove', updateTrail);
    return () => window.removeEventListener('mousemove', updateTrail);
  }, [maxPoints, fadeTime]);

  return trail;
};