import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TableCard from "./TableCard";
import TableBottom from "./TableBottom";

const TableGrid = ({ tables = [], onSelectTable, seatingType }) => {
  const [selectedTable, setSelectedTable] = useState(null);
  const navigate = useNavigate();

  const handleSelectTable = (tableId) => {
    setSelectedTable(tableId);
    onSelectTable(tableId);
    // Navigate directly to menu page with selected table info
    navigate(`/menu?table=${tableId}`);
  };

  // Filter tables based on seating type
  const filteredTables = tables.filter(
    (table) => table.location === seatingType
  );
  // Filter tables based on availability
  const freeTables = tables.filter((table) => table.isAvailable);
  const occupiedTables = tables.filter((table) => table.isAvailable == false);

  return (
    <div className="px-4 sm:px-8 py-4 relative h-full">
      {/* Table Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {filteredTables.map((table) => (
          <TableCard
            key={table._id}
            table={table}
            isSelected={selectedTable === table._id}
            onSelect={() => handleSelectTable(table._id)}
          />
        ))}
      </div>
      <TableBottom freeTables={freeTables} occupiedTables={occupiedTables} />
    </div>
  );
};

export default TableGrid;
