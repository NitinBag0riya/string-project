"use client"
import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import StringComponent from './components/StringComponent';
import Sidebar from './Sidebar';
import './globals.css';

const initialData = [
  { id: 1, tables: [{ id: 't1', name: 'Break', clients: [] }, { id: 't2', name: 'Assignment 1', clients: [{ id: 'c1', name: 'Client 1' }] }, { id: 't3', name: 'Assignment 2', clients: [{ id: 'c2', name: 'Client 2' }] }] },
  { id: 2, tables: [{ id: 't4', name: 'Break', clients: [] }, { id: 't5', name: 'Assignment 4', clients: [] }] },
];

const sidebarData = {
  tables: [{ id: 't6', name: 'Assignment 6', clients: [] }, { id: 't7', name: 'Assignment 7', clients: [] }],
  clients: [{ id: 'c3', name: 'Client 3' }, { id: 'c4', name: 'Client 4' }]
};

function App() {
  const [strings, setStrings] = useState(initialData);
  const [sidebar, setSidebar] = useState(sidebarData);

  const handleDrop = (item, targetStringId, targetTableId) => {
    const sourceString = strings.find(string => string.tables.some(table => table.id === item.id));
    const targetString = strings.find(string => string.id === targetStringId);

    if (item.type === 'table') {
      const tableToMove = { ...item, clients: item.clients || [] };

      if (sourceString) {
        const sourceTableIndex = sourceString.tables.findIndex(table => table.id === item.id);
        sourceString.tables.splice(sourceTableIndex, 1);
      } else {
        const sidebarTableIndex = sidebar.tables.findIndex(table => table.id === item.id);
        sidebar.tables.splice(sidebarTableIndex, 1);
        setSidebar({ ...sidebar });
      }

      if (targetTableId) {
        const targetTableIndex = targetString.tables.findIndex(table => table.id === targetTableId);
        const targetTable = targetString.tables[targetTableIndex];

        // Swap the tables if target location already has a table
        targetString.tables[targetTableIndex] = tableToMove;

        if (sourceString) {
          sourceString.tables.push(targetTable);
        } else {
          sidebar.tables.push(targetTable);
          setSidebar({ ...sidebar });
        }
      } else {
        targetString.tables.push(tableToMove);
      }

      setStrings([...strings]);
    } else if (item.type === 'client') {
      if (sourceString) {
        const sourceTable = sourceString.tables.find(table => table.clients.some(client => client.id === item.id));
        const sourceClientIndex = sourceTable.clients.findIndex(client => client.id === item.id);
        sourceTable.clients.splice(sourceClientIndex, 1);
      }

      const targetTable = targetString.tables.find(table => table.id === targetTableId);
      targetTable.clients.push(item);

      setStrings([...strings]);
    }
  };

  const addNewString = () => {
    const newString = {
      id: strings.length + 1,
      tables: [{ id: `t${strings.length + 1}b`, name: 'Break', clients: [] }]
    };
    setStrings([...strings, newString]);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='flex w-full justify-center items-center gap-6 mt-5'>          
          <p className="text-white-400 hover:text-sky-400">1. Add Table : Drag on Drop Here Block</p>
          <p className="text-white-400 hover:text-sky-400">2. Replace Table : Drag on existing table</p>
        </div>
      <div className="App p-10">
        

        <div className='w-full flex items-center justify-between'>
          <div className="strings-container">
            {strings.map((string) => (
              <StringComponent key={string.id} string={string} onDrop={handleDrop} />
            ))}
          </div>
          <Sidebar data={sidebar} addNewString={addNewString} />
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
