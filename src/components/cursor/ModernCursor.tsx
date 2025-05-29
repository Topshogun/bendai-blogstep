import React from 'react';
import { useCursorPosition } from '../../hooks/useCursorPosition';
import GridOverlay from './GridOverlay';
import CursorSpotlight from './CursorSpotlight';

const ModernCursor = () => {
  const position = useCursorPosition();

  return (
    <>
      <GridOverlay />
      <CursorSpotlight />
      <div
        className="custom-cursor"
        style={{
          left: position.x,
          top: position.y,
        }}
      />
    </>
  );
};

export default ModernCursor;