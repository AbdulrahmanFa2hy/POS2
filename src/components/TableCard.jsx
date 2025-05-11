import { FaChair } from "react-icons/fa";

const TableCard = ({ table, isSelected, onSelect }) => {
  // Determine border color based on status
  const getBorderColor = () => {
    if (isSelected) return "border-primary-600";

    switch (table.status) {
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
      {/* Table border visualization */}
      {/* Top chairs visualization */}
      <div className="flex justify-center gap-8 mb-2">
        {Array.from({ length: table.chairs }).map((_, index) => (
          <div key={index} className="w-10 h-1 bg-primary-600 rounded" />
        ))}
      </div>

      {/* Table card */}
      <button
        className={`border-2 ${getBorderColor()} rounded-lg p-6 transition-all duration-200 
          hover:shadow-card-hover ${
            isSelected ? "ring-2 ring-primary-600 ring-opacity-50" : ""
          }
          ${table.status === "free" ? "hover:border-free" : ""}
          ${table.status === "inProgress" ? "hover:border-inProgress" : ""}
          ${table.status === "completed" ? "hover:border-completed" : ""}
        `}
        onClick={onSelect}
      >
        <h3 className="text-xl font-medium text-center text-neutral-800">
          {table.name}
        </h3>
      </button>

      {/* Bottom chairs visualization */}
      <div className="flex justify-center gap-8 mt-2">
        {Array.from({ length: table.chairs }).map((_, index) => (
          <div key={index} className="w-10 h-1 bg-primary-600 rounded" />
        ))}
      </div>
    </div>
  );
};

export default TableCard;
