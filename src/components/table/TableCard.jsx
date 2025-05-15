const TableCard = ({ table, isSelected, onSelect }) => {
  // Check if table data exists
  if (!table) return null;

  // Get table properties from the backend data structure
  const tableNumber = table.number || "";
  const isAvailable = table.isAvailable;

  // Determine border color based on availability
  const getBorderColor = () => {
    if (isSelected) return "border-primary-600";
    return isAvailable ? "border-green-500" : "border-red-500";
  };

  return (
    <div className="flex flex-col">
      <button
        className={`border-4 ${getBorderColor()} rounded-lg p-6 transition-all duration-200 
          ${
            isAvailable
              ? "hover:shadow-card-hover"
              : "cursor-not-allowed opacity-70"
          } 
          ${isSelected ? "ring-2 ring-primary-600 ring-opacity-50" : ""}
          ${isAvailable ? "hover:border-green-600" : "hover:border-red-600"}
        `}
        onClick={() => isAvailable && onSelect()}
        disabled={!isAvailable}
        title={isAvailable ? "Select table" : "Table not available"}
      >
        <h3 className="text-xl font-medium text-center text-neutral-800">
          T{tableNumber}
        </h3>
      </button>
    </div>
  );
};

export default TableCard;
