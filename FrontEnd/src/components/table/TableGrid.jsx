import { useState } from "react";
import TableCard from "./TableCard";
import TableBottom from "./TableBottom";

const TableGrid = ({ tables = [], onSelectTable }) => {
  const [selectedTable, setSelectedTable] = useState(null);

  const handleSelectTable = (tableId) => {
    setSelectedTable(tableId);
    onSelectTable(tableId);
  };

  return (
    <div className="px-4 sm:px-8 py-4 relative h-full">
      {/* Table Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {tables.map((table) => (
          <TableCard
            key={table.id || table._id}
            table={table}
            isSelected={selectedTable === (table.id || table._id)}
            onSelect={() => handleSelectTable(table.id || table._id)}
          />
        ))}
      </div>
      <TableBottom />
    </div>
  );
};

export default TableGrid;
