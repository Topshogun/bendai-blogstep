import { useState, useEffect } from 'react';

interface GridCell {
  x: number;
  y: number;
  intensity: number;
}

export const useGridEffect = (gridSize: number = 40) => {
  const [activeCell, setActiveCell] = useState<GridCell | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = Math.floor(e.clientX / gridSize) * gridSize;
      const y = Math.floor(e.clientY / gridSize) * gridSize;
      const intensity = 1;

      setActiveCell({ x, y, intensity });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [gridSize]);

  return activeCell;
};