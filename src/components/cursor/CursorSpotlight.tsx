import React from 'react';
import { useCursorTrail } from '../../hooks/useCursorTrail';

const CursorSpotlight = () => {
  const trail = useCursorTrail();

  return (
    <>
      {trail.map((point) => (
        <div
          key={point.id}
          className="cursor-spotlight"
          style={{
            left: point.x,
            top: point.y,
            opacity: (trail.indexOf(point) / trail.length) * 0.3
          }}
        />
      ))}
    </>
  );
};

export default CursorSpotlight;