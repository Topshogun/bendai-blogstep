import { useEffect, useRef } from 'react';

interface ParallaxOptions {
  intensity?: number;
  reverse?: boolean;
}

export const useParallax = (options: ParallaxOptions = {}) => {
  const { intensity = 20, reverse = false } = options;
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = element.getBoundingClientRect();
      
      const x = (clientX - left - width / 2) / (width / 2);
      const y = (clientY - top - height / 2) / (height / 2);
      
      const multiplier = reverse ? -1 : 1;
      const translateX = x * intensity * multiplier;
      const translateY = y * intensity * multiplier;

      element.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;
    };

    const handleMouseLeave = () => {
      element.style.transform = 'translate3d(0, 0, 0)';
    };

    window.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [intensity, reverse]);

  return elementRef;
};