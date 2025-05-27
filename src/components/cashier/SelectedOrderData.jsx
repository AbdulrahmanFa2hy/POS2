import { MdDeleteOutline } from "react-icons/md";

function SelectedOrderData({
  orderItems,
  updateQuantity,
  removeFromOrder,
  canDeleteMeals,
  canDecreaseQuantity,
}) {
  if (orderItems.length === 0) {
    return (
      <div className="bg-white rounded-lg p-8 text-center shadow-md mt-4">
        <p className="text-gray-500">No items in your order yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-card transition-all duration-200 overflow-hidden animate-fade-in">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-700 text-center text-sm sm:text-base">
            <tr>
              <th className="py-3 px-4 font-semibold">Num</th>
              <th className="py-3 px-4 font-semibold">Items</th>
              <th className="py-3 px-4 font-semibold">Quantity</th>
              <th className="py-3 px-4 font-semibold">Price</th>
              <th className="py-3 px-4 font-semibold">Total</th>
              {canDeleteMeals && (
                <th className="py-3 px-4 font-semibold w-10"></th>
              )}
            </tr>
          </thead>
          <tbody className="text-center text-sm sm:text-base">
            {orderItems.map((item, index) => (
              <tr
                key={item.id}
                className="border-t border-gray-200 hover:bg-gray-50"
              >
                <td className="py-3 px-4 text-primary-700">{index + 1}</td>
                <td className="py-3 px-4 text-primary-700 min-w-[200px]">
                  {item.name}
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center w-full justify-center">
                    <button
                      className={`w-8 h-8 flex items-center justify-center rounded-full ${
                        canDecreaseQuantity
                          ? "bg-gray-100 text-gray-600 hover:bg-gray-200 cursor-pointer"
                          : "bg-gray-50 text-gray-300 cursor-not-allowed"
                      }`}
                      onClick={() => {
                        if (canDecreaseQuantity) {
                          updateQuantity(item.id, item.quantity - 1);
                        }
                      }}
                      disabled={!canDecreaseQuantity}
                      title={
                        !canDecreaseQuantity
                          ? "Only managers can decrease quantity"
                          : "Decrease quantity"
                      }
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      title="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="py-3 px-4 text-primary-700">
                  {item.price}{" "}
                  <span className="hidden sm:inline-block">
                    {item.currency || "AED"}
                  </span>
                </td>
                <td className="py-3 px-4 text-primary-700 font-semibold">
                  {(item.price * item.quantity).toFixed(2)}{" "}
                  <span className="hidden sm:inline-block">
                    {item.currency || "AED"}
                  </span>
                </td>
                {canDeleteMeals && (
                  <td className="py-3 px-4">
                    <button
                      className="text-danger-400 hover:text-danger-500 text-lg text-center"
                      onClick={() => removeFromOrder(item.id)}
                      title="Delete item (Manager only)"
                    >
                      <MdDeleteOutline />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SelectedOrderData;
