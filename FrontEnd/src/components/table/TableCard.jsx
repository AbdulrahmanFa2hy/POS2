const TableCard = ({ table, isSelected, onSelect }) => {
  // Check if table data exists
  if (!table) return null;

  // Get table properties, handling both API and mock data formats
  const tableId = table.id || table._id || "";
  const tableName = table.name || table.number || tableId || "";
  const tableStatus = table.status || "free";
  const tableChairs = table.chairs || table.capacity || 2;

  // Determine border color based on status
  const getBorderColor = () => {
    if (isSelected) return "border-primary-600";

    switch (tableStatus) {
      case "free":
        return "border-free";
      case "inProgress":
        return "border-inProgress";
      case "completed":
        return "border-completed";
      default:
        return "border-neutral-300";
    }
  };

  return (
    <div className="flex flex-col">
      {/* Top chairs visualization */}
      <div className="flex justify-center gap-8 mb-2">
        {Array.from({ length: tableChairs }).map((_, index) => (
          <div key={index} className="w-10 h-1 bg-primary-600 rounded" />
        ))}
      </div>

      {/* Table card */}
      <button
        className={`border-2 ${getBorderColor()} rounded-lg p-6 transition-all duration-200 
          hover:shadow-card-hover ${
            isSelected ? "ring-2 ring-primary-600 ring-opacity-50" : ""
          }
          ${tableStatus === "free" ? "hover:border-free" : ""}
          ${tableStatus === "inProgress" ? "hover:border-inProgress" : ""}
          ${tableStatus === "completed" ? "hover:border-completed" : ""}
        `}
        onClick={onSelect}
      >
        <h3 className="text-xl font-medium text-center text-neutral-800">
          {tableName}
        </h3>
      </button>

      {/* Bottom chairs visualization */}
      <div className="flex justify-center gap-8 mt-2">
        {Array.from({ length: tableChairs }).map((_, index) => (
          <div key={index} className="w-10 h-1 bg-primary-600 rounded" />
        ))}
      </div>
    </div>
  );
};

export default TableCard;
