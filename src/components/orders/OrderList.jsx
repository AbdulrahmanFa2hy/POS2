import { format } from "date-fns";

const OrderList = ({ orders, selectedOrderId, onOrderClick }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 h-[98vh] overflow-y-auto [scrollbar-width:none] [::-webkit-scrollbar]:hidden">
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className={`p-4 rounded-lg border cursor-pointer transition-all ${
              selectedOrderId === order._id
                ? "border-primary-800 bg-primary-50 shadow-lg"
                : "border-gray-200 hover:border-primary-800"
            }`}
            onClick={() => onOrderClick(order)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg text-primary-800 flex items-center gap-2">
                  <span className="inline-block px-2 py-1 bg-primary-100 text-primary-800 rounded-full text-xs font-bold">
                    {order.orderCode}
                  </span>
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  <span className="font-bold capitalize">{order.type}</span>
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {format(new Date(order.createdAt), "MMM dd, yyyy HH:mm")}
                </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="font-bold text-lg text-primary-800">
                  ${order.totalPrice.toFixed(2)}
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderList;
