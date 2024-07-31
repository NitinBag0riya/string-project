import React from 'react';
import { useDrop, useDrag } from 'react-dnd';
import DraggableItem from './DraggableItem';

const TableComponent = ({ table, stringId, onDrop }) => {
  const isBreakTable = table.name === 'Break';

  const [{ isDragging }, drag] = useDrag({
    type: 'TABLE',
    item: { ...table, stringId, type: 'table' },
    canDrag: () => !isBreakTable, // Disable drag if it's a Break table
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ['TABLE', 'CLIENT'],
    drop: (item) => {
      if (item.type === 'client') {
        onDrop(item, stringId, table.id);
      } else if (item.type === 'table' && !isBreakTable) {
        onDrop(item, stringId, table.id);
      }
    },
  });

  return (
    <div ref={node => !isBreakTable ? drag(drop(node)) : drop(node)} className="table-component" style={{ opacity: isDragging ? 0.5 : 1 }}>
      <div>{table.name}</div>
      {table.clients && table.clients.map((client) => (
        <DraggableItem key={client.id} item={client} type="client" />
      ))}
    </div>
  );
};

export default TableComponent;
