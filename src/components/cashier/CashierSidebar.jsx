import { useState, useMemo, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";

function CashierSidebar({ selectedOrder, onSelectOrder }) {
  const [activeTab, setActiveTab] = useState("dine_in");

  // Get orders from Redux store
  const { orders } = useSelector((state) => state.order);

  // Update active tab based on selected order type
  useEffect(() => {
    if (selectedOrder?.type) {
      setActiveTab(selectedOrder.type);
    }
  }, [selectedOrder?.type]);

  // Memoize filtered and formatted orders with improved sorting
  const { dineInOrders, takeawayOrders } = useMemo(() => {
    if (!orders || orders.length === 0) {
      return { dineInOrders: [], takeawayOrders: [] };
    }

    const formatOrder = (order) => ({
      id: order._id,
      table: order.tableNumber ? `Table ${order.tableNumber}` : null,
      orderCode: order.orderCode,
      total: order.totalPrice.toFixed(2) || 0,
      status: order.status || "pending",
      itemCount: order.orderItems ? order.orderItems.length : 0,
      createdAt: order.createdAt,
      type: order.type,
    });

    const dineIn = [];
    const takeaway = [];

    orders.forEach((order) => {
      const formattedOrder = formatOrder(order);
      if (order.type === "dine_in") {
        dineIn.push(formattedOrder);
      } else if (order.type === "takeaway") {
        takeaway.push(formattedOrder);
      }
    });

    // Improved sorting: pending first, then completed, both sorted by newest first
    const sortOrders = (ordersList) => {
      return ordersList.sort((a, b) => {
        // First, sort by status (pending first)
        if (a.status === "pending" && b.status !== "pending") return -1;
        if (a.status !== "pending" && b.status === "pending") return 1;

        // Within same status, sort by creation date (newest first)
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
    };

    return {
      dineInOrders: sortOrders(dineIn),
      takeawayOrders: sortOrders(takeaway),
    };
  }, [orders]);

  // Memoize status color function
  const getStatusColor = useCallback((status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "completed":
        return "bg-green-100 text-green-700";
      case "paid":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  }, []);

  // Memoize current orders to prevent unnecessary re-renders
  const currentOrders = useMemo(() => {
    return activeTab === "dine_in" ? dineInOrders : takeawayOrders;
  }, [activeTab, dineInOrders, takeawayOrders]);

  // Memoize order selection handler
  const handleOrderSelect = useCallback(
    (orderId) => {
      const order = orders.find((o) => o._id === orderId);
      if (order) {
        onSelectOrder(order);
      }
    },
    [orders, onSelectOrder]
  );

  // Handle tab change
  const handleTabChange = useCallback((tabType) => {
    setActiveTab(tabType);
  }, []);

  return (
    <div className="bg-white h-full overflow-hidden p-4 flex flex-col">
      <div className="flex gap-2 mb-4">
        <button
          className={`flex-1 py-2 px-4 rounded-md transition-all ${
            activeTab === "dine_in"
              ? "bg-primary-700 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
          onClick={() => handleTabChange("dine_in")}
        >
          Dine In ({dineInOrders.length})
        </button>
        <button
          className={`flex-1 py-2 px-4 rounded-md transition-all ${
            activeTab === "takeaway"
              ? "bg-primary-700 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
          onClick={() => handleTabChange("takeaway")}
        >
          Takeaway ({takeawayOrders.length})
        </button>
      </div>

      <div className="space-y-2 overflow-y-auto flex-1 scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {currentOrders.length > 0 ? (
          currentOrders.map((order) => (
            <button
              key={order.id}
              className={`w-full p-4 rounded-lg border-2 border-gray-200 transition-all ease-in-out duration-200 ${
                selectedOrder?.id === order.id ||
                selectedOrder?._id === order.id
                  ? "bg-primary-50 border-primary-700"
                  : "bg-gray-50 hover:bg-gray-100"
              }`}
              onClick={() => handleOrderSelect(order.id)}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">
                  {activeTab === "dine_in" ? order.table : order.orderCode}
                </span>
                <span className="text-primary-700 font-bold">
                  {order.total} AED
                </span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-gray-500">
                  Items: {order.itemCount}
                </span>
                <span
                  className={`text-sm px-2 py-1 rounded-full ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </div>
              <div className="text-xs text-gray-400 mt-1">
                {new Date(order.createdAt).toLocaleTimeString()}
              </div>
            </button>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">
              No {activeTab === "dine_in" ? "dine-in" : "takeaway"} orders found
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CashierSidebar;
