import { useState } from "react";
import TableCard from "./TableCard";

const TableGrid = ({ tables, onSelectTable }) => {
  const [selectedTable, setSelectedTable] = useState(null);

  const handleSelectTable = (tableId) => {
    setSelectedTable(tableId);
    onSelectTable(tableId);
  };

  return (
    <div className="px-8 py-4 relative h-full">
      {/* Table Grid - 3 rows of 3 tables */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:h-[85%] ">
        {tables.map((table) => (
          <TableCard
            key={table.id}
            table={table}
            isSelected={selectedTable === table.id}
            onSelect={() => handleSelectTable(table.id)}
          />
        ))}
      </div>

      <div className="flex justify-between flex-wrap">
        {/* Status Legend */}
        <div className="mt-8 flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-free"></div>
            <span>Free</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-inProgress"></div>
            <span>In Progress</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-completed"></div>
            <span>Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 flex items-center justify-center border border-primary-600 rounded">
              <div className="w-4 h-1 bg-primary-600 rounded"></div>
            </div>
            <span>Number of chairs</span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex justify-end gap-4">
          <button className="btn btn-primary">Reservation</button>
          <button className="btn btn-secondary">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default TableGrid;
