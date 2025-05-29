import React from 'react';
import { useCursorPosition } from '../../hooks/useCursorPosition';
import GridBackground from './GridBackground';

const CustomCursor = () => {
  const position = useCursorPosition();

  return (
    <>
      <GridBackground />
      <div
        className="cursor"
        style={{
          left: position.x,
          top: position.y,
        }}
      />
    </>
  );
};

export default CustomCursor;