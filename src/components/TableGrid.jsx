import { useState } from "react";
import TableCard from "./TableCard";

const TableGrid = ({ tables, onSelectTable }) => {
  const [selectedTable, setSelectedTable] = useState(null);

  const handleSelectTable = (tableId) => {
    setSelectedTable(tableId);
    onSelectTable(tableId);
  };

  return (
    <div className="px-4 sm:px-8 py-4 relative h-full">
      {/* Table Grid - 3 rows of 3 tables */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10  ">
        {tables.map((table) => (
          <TableCard
            key={table.id}
            table={table}
            isSelected={selectedTable === table.id}
            onSelect={() => handleSelectTable(table.id)}
          />
        ))}
      </div>

      <div className="flex flex-col justify-center sm:flex-row  sm:justify-between items-center flex-wrap pt-10 pb-4">
        {/* Status Legend */}
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 sm:w-6 sm:h-6 rounded bg-free"></div>
            <span className="text-sm">Free</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 sm:w-6 sm:h-6 rounded bg-inProgress"></div>
            <span className="text-sm">In Progress</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 sm:w-6 sm:h-6 rounded bg-completed"></div>
            <span className="text-sm">Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-4 sm:w-6 sm:h-6 flex items-center justify-center border border-primary-600 rounded">
              <div className="w-3 h-1 bg-primary-600 rounded"></div>
            </div>
            <span className="text-sm">Number of chairs</span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 md:mt-0 flex justify-center md:justify-end gap-4">
          <button className="btn btn-primary text-sm">Reservation</button>
          <button className="btn btn-secondary text-sm">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default TableGrid;
