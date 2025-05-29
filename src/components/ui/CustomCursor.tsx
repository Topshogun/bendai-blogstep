import React, { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updatePosition);

    return () => window.removeEventListener('mousemove', updatePosition);
  }, []);

  return (
    <>
      <div
        className="custom-cursor"
        style={{ left: position.x, top: position.y }}
      />
      <div
        className="cursor-glow"
        style={{ left: position.x, top: position.y }}
      />
    </>
  );
};

export default CustomCursor;