import { FaTimes } from "react-icons/fa";

const ConfirmOrder = ({
  isOpen,
  onClose,
  onSendToKitchen,
  onSendToCashier,
  cart,
  orderNumber,
  orderType,
  customerName,
  selectedTable,
  totalAmount,
}) => {
  if (!isOpen) return null;

  // Extract table number from selectedTable (e.g., "Table 1" → "1")
  const tableNumber = selectedTable.replace(/[^\d]/g, "");

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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
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
              <div className="bg-primary-700 text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold">
                T{tableNumber}
              </div>

              <div>
                <h2 className="text-lg font-semibold">{customerName}</h2>
                <p className="text-xs text-neutral-500">
                  order {orderNumber.replace("#", "")} /{" "}
                  {orderType === "dine-in" ? "dine in" : "takeaway"}
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
                  key={item.id}
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

          <div className="flex gap-1 text-sm">
            <button
              className="flex-1 bg-[#EEAA42] text-white py-2 rounded hover:bg-[#bf8021] transition-colors"
              onClick={onSendToKitchen}
            >
              Send kitchen
            </button>
            <button
              className="flex-1 bg-[#09AE94] text-white py-2 rounded hover:bg-[#219483] transition-colors"
              onClick={onSendToCashier}
            >
              Send cashier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrder;
