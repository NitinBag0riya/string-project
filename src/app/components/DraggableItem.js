import React from 'react';
import { useDrag } from 'react-dnd';

const DraggableItem = ({ item, type }) => {
  const [{ isDragging }, drag] = useDrag({
    type: type.toUpperCase(),
    item: { ...item, type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} className={type === 'table' ? 'draggable-item-table' : 'draggable-item-client'} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {item.name}
    </div>
  );
};

export default DraggableItem;

