import React from 'react';
import { useGridEffect } from '../../hooks/useGridEffect';

const GridOverlay = () => {
  const activeCell = useGridEffect();

  return (
    <div className="fixed inset-0 pointer-events-none">
      <div className="grid-pattern" />
      {activeCell && (
        <div
          className="grid-cell-highlight"
          style={{
            left: `${activeCell.x}px`,
            top: `${activeCell.y}px`,
            opacity: activeCell.intensity * 0.2
          }}
        />
      )}
    </div>
  );
};

export default GridOverlay;