import { format } from "date-fns";
import mealImage from "../../assets/img1.jpeg";

const OrderDetails = ({
  selectedOrder,
  meals,
  discount,
  onDiscountChange,
  onDeleteMeal,
  onAddMeal,
  onPay,
  onPrint,
}) => {
  if (!selectedOrder) {
    return (
      <div className="flex items-center justify-center h-[400px] text-center text-gray-500 text-lg font-semibold bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
        <div>
          <p>Select an order to view details</p>
          <p className="text-sm text-gray-400 mt-2">No order selected</p>
        </div>
      </div>
    );
  }

  const getMealDetails = (mealId) => meals.find((m) => m._id === mealId) || {};

  return (
    <div className="flex flex-col h-[92vh] relative">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between mb-8">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-primary-50 rounded-full">
              <span className="text-sm font-bold text-primary-700">{selectedOrder.orderCode}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full">
              <span className="text-sm font-medium text-gray-600">Table:</span>
              <span className="text-sm font-bold text-gray-700">{selectedOrder.tableNumber}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full">
              <span className="text-sm text-gray-700">
                {format(new Date(selectedOrder.createdAt), "MMM dd, yyyy HH:mm")}
              </span>
            </div>
      </div>
        
      {/* Items List */}
      <div className="flex-grow overflow-auto [scrollbar-width:none] [::-webkit-scrollbar]:hidden">
        <div className="space-y-4 mb-8">
          {selectedOrder.orderItems.map((item) => {
            const meal = getMealDetails(item.mealId);
            return (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-gray-50 rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200"
              >
                <img
                  src={meal.image || mealImage}
                  alt={meal.name}
                  className="w-full sm:w-16 h-32 sm:h-16 object-cover rounded-lg border"
                />
                <div className="flex-1 min-w-0 w-full">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="font-bold text-primary-700 text-lg truncate">
                        {meal.name || item.mealId}
                      </h4>
                      <p className="text-sm text-gray-500 mt-1">
                        Quantity: <span className="font-semibold">{item.quantity}</span>
                      </p>
                    </div>
                    <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2">
                      <p className="font-bold text-lg text-primary-700">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-400">
                        ${item.price.toFixed(2)} each
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => onDeleteMeal(item.mealId)}
                  className="w-full sm:w-auto px-3 py-2 sm:py-1.5 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 font-semibold shadow-sm transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary Section */}
      <div className="border-t border-gray-200 pt-2 mt-2 mb-4">
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 items-center text-sm">
          <span className="text-gray-600">Subtotal:</span>
          <span className="text-right font-medium text-gray-900">
            ${selectedOrder.subtotalPrice.toFixed(2)}
          </span>
          
          <span className="text-gray-600">Discount:</span>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
              <span className="text-gray-400 text-xs">$</span>
            </div>
            <input
              type="number"
              value={discount}
              onChange={(e) => onDiscountChange(parseFloat(e.target.value) || 0)}
              className="w-full pl-5 pr-8 py-1 text-right text-sm border border-gray-200 rounded focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              placeholder="0.00"
              min="0"
              step="0.01"
            />
            <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
              <span className="text-gray-400 text-xs">USD</span>
            </div>
          </div>

          <span className="text-gray-900 font-medium pt-2 border-t">Total:</span>
          <span className="text-right font-bold text-primary-700 pt-2 border-t">
            ${selectedOrder.totalPrice.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 w-full lg:w-auto justify-around ">
          <button
            onClick={onAddMeal}
            className="w-[30%] px-4 py-2.5 bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 border border-primary-200 font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Meal
          </button>
          <button
            onClick={onPay}
            className="w-[30%] px-4 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            Pay
          </button>
          <button
            onClick={onPrint}
            className="w-[30%] px-4 py-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" />
            </svg>
            Print
          </button>
        </div>
    </div>
  );
};

export default OrderDetails; 