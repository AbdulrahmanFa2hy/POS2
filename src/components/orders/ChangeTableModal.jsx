import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeOrderTable } from "../../store/orderSlice";

const ChangeTableModal = ({ 
  isOpen, 
  onClose, 
  orderId, 
  availableTables 
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedTable, setSelectedTable] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedTable) return;

    try {
      await dispatch(changeOrderTable({
        orderId,
        newTableNumber: parseInt(selectedTable, 10)  // Convert to number
      })).unwrap();
      
      // Close modal and navigate to the new table's order details
      onClose();
      navigate(`/table/${selectedTable}`);
    } catch (error) {
      console.error("Failed to change table:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Change Table</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700">
              Select New Table
            </label>
            <select
              value={selectedTable}
              onChange={(e) => setSelectedTable(e.target.value)}
              className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              required
            >
              <option value="">Choose a table...</option>
              {availableTables.map((table) => (
                <option key={table._id} value={table.number}>
                  Table {table.number}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-neutral-300 rounded-md text-neutral-700 hover:bg-neutral-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!selectedTable}
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Change Table
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangeTableModal; 