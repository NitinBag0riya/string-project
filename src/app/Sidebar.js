import React from 'react';
import DraggableItem from './components/DraggableItem';
import './Sidebar.css';

const Sidebar = ({ data, addNewString }) => {
  return (
    <div className="sidebar">
      <button onClick={addNewString}  type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-3 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add New String</button>
      <h2>Tables</h2>
      {data.tables.map((table) => (
        <DraggableItem key={table.id} item={table} type="table" />
      ))}
      <h2>Clients</h2>
      {data.clients.map((client) => (
        <DraggableItem key={client.id} item={client} type="client" />
      ))}
    </div>
  );
};

export default Sidebar;
