import React from 'react';
import { useDrop } from 'react-dnd';

const DropZone = ({ stringId, onDrop }) => {
  const [, drop] = useDrop({
    accept: 'TABLE',
    drop: (item) => onDrop(item, stringId),
  });

  return <div ref={drop} className="drop-zone">Drop here</div>;
};

export default DropZone;
