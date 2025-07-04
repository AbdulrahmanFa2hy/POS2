import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaTimes } from "react-icons/fa";
import {
  createOrder,
  clearOrderSuccess,
  clearOrderError,
} from "../../store/orderSlice";

const ConfirmOrder = ({
  isOpen,
  onClose,
  onSendToKitchen,
  cart,
  type,
  customerName,
  selectedTable,
  totalAmount,
}) => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.order);

  // Reset success state when component unmounts or modal closes
  useEffect(() => {
    return () => {
      if (success) {
        dispatch(clearOrderError());
        dispatch(clearOrderSuccess());
      }
    };
  }, [dispatch, success]);

  if (!isOpen) return null;

  // Extract table number from selectedTable (e.g., "Table 1" → "1")
  const tableNumber = parseInt(selectedTable.replace(/[^\d]/g, ""), 10);

  // Current date and time formatting
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const formattedTime = currentDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const handleCreateOrder = async () => {
    // Prepare order items
    const orderItems = cart.map((item) => ({
      mealId: item._id,
      quantity: item.quantity,
    }));

    try {
      const orderData = {
        orderItems,
        type: type === "dine-in" ? "dine_in" : "takeaway",
        ...(type === "dine-in" ? { tableNumber } : {}),
      };

      await dispatch(createOrder(orderData)).unwrap();
      onSendToKitchen();
    } catch (err) {
      console.error("Failed to create order:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-h-[100vh] overflow-auto">
        <div className="relative p-2 sm:p-3">
          <button
            className="absolute top-4 right-4 text-neutral-500 hover:text-neutral-700"
            onClick={onClose}
            aria-label="Close"
          >
            <FaTimes />
          </button>

          <div className="text-center mb-6">
            <div className="flex justify-center items-center gap-4">
              {type === "dine-in" && (
                <div className="bg-primary-700 text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold">
                  T{tableNumber}
                </div>
              )}

              <div>
                <h2 className="text-lg font-semibold">{customerName}</h2>
                <p className="text-xs text-neutral-500">
                  {type === "dine-in" ? "dine in" : "takeaway"}
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center text-xs text-neutral-500 mt-4">
              <div>{formattedDate}</div>
              <div>{formattedTime}</div>
            </div>
          </div>

          <div className="mb-4">
            <div className="text-sm grid grid-cols-3 gap-4 font-medium text-neutral-700 pb-2 border-b">
              <div>Items</div>
              <div className="text-center">Quantity</div>
              <div className="text-right">Price</div>
            </div>

            <div className="max-h-[45vh] overflow-y-auto [scrollbar-width:none] [::-webkit-scrollbar]:hidden">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="grid grid-cols-3 gap-4 py-2 border-b border-neutral-100"
                >
                  <div className="text-xs text-blue-600 truncate">
                    {item.name}
                  </div>
                  <div className="text-xs text-center">{item.quantity}</div>
                  <div className="text-xs text-right">{item.price} AED</div>
                </div>
              ))}
            </div>

            <div className="text-sm flex justify-between items-center pt-3 font-semibold">
              <div>Total</div>
              <div className="text-right">{totalAmount} AED</div>
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm mb-4 text-center">{error}</div>
          )}

          <div className="flex gap-1 text-sm">
            <button
              className={`flex-1 bg-[#EEAA42] text-white py-2 rounded hover:bg-[#bf8021] transition-colors ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleCreateOrder}
              disabled={loading}
            >
              {loading ? "Processing..." : "Prepare order"}
            </button>
            <button
              className={`flex-1 bg-white border border-neutral-300 text-neutral-700 py-2 rounded hover:bg-neutral-50 transition-colors`}
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrder;
