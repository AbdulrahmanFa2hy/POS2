import { useState } from "react";
import { useDispatch } from "react-redux";
import { addMealToOrder } from "../../store/orderSlice";

const AddMealModal = ({ isOpen, onClose, orderId }) => {
  const dispatch = useDispatch();
  const [mealDetails, setMealDetails] = useState({
    mealId: "",
    quantity: 1,
    notes: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addMealToOrder({ 
        orderId,
        mealId: mealDetails.mealId,
        quantity: mealDetails.quantity
      })).unwrap();
      onClose();
    } catch (error) {
      console.error("Failed to add meal:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add Meal to Order</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700">
              Meal ID
            </label>
            <input
              type="text"
              value={mealDetails.mealId}
              onChange={(e) => setMealDetails({ ...mealDetails, mealId: e.target.value })}
              className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700">
              Quantity
            </label>
            <input
              type="number"
              min="1"
              value={mealDetails.quantity}
              onChange={(e) => setMealDetails({ ...mealDetails, quantity: parseInt(e.target.value) })}
              className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700">
              Notes
            </label>
            <textarea
              value={mealDetails.notes}
              onChange={(e) => setMealDetails({ ...mealDetails, notes: e.target.value })}
              className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              rows="3"
            />
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
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
            >
              Add Meal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMealModal; 