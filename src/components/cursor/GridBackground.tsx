import React from 'react';
import { useCursorPosition } from '../../hooks/useCursorPosition';

const GridBackground = () => {
  const position = useCursorPosition(10);

  return (
    <>
      <div className="grid-background" />
      <div
        className="grid-spotlight"
        style={{
          left: position.x,
          top: position.y,
        }}
      />
    </>
  );
};

export default GridBackground;