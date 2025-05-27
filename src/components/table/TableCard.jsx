import { useNavigate } from "react-router-dom";

const TableCard = ({ table, isSelected, onSelect }) => {
  const navigate = useNavigate();

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

  const handleTableClick = () => {
    if (isAvailable) {
      onSelect();
    } else {
      // Navigate to cashier page with table number to auto-select the order
      navigate(`/cashier?table=${tableNumber}`);
    }
  };

  return (
    <div className="flex flex-col">
      <button
        className={`border-4 ${getBorderColor()} rounded-lg p-6 transition-all duration-200 
          ${
            isAvailable
              ? "hover:border-green-600 hover:shadow-card-hover"
              : "hover:border-danger-800 hover:shadow-card-hover"
          }
        `}
        onClick={handleTableClick}
        title={
          isAvailable
            ? "Click to order for this table"
            : "Go to cashier to process payment"
        }
      >
        <h3 className="text-xl font-medium text-center text-neutral-800">
          {tableNumber}
        </h3>
      </button>
    </div>
  );
};

export default TableCard;
