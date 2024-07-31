import React from 'react';
import TableComponent from './TableComponent';
import DropZone from './DropZone';

const StringComponent = ({ string, onDrop }) => {
  return (
    <div className="string-component">
      {string.tables.map((table, index) => (
        <React.Fragment key={table.id}>
          <TableComponent table={table} stringId={string.id} onDrop={onDrop} />
          {index === string.tables.length - 1 && <DropZone stringId={string.id} onDrop={onDrop} />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StringComponent;
