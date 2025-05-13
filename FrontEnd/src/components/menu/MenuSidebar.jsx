import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaMinus, FaPlus, FaChevronDown, FaUser, FaEdit } from "react-icons/fa";
import ConfirmOrder from "./ConfirmOrder";
import { reserveTable, clearSelectedTable } from "../../store/tableSlice";

const MenuSidebar = ({
  cart,
  selectedTable,
  availableTables,
  orderNumber,
  orderType,
  updateQuantity,
  setSelectedTable,
  calculateTotal,
  showTableDropdown,
  setShowTableDropdown,
  setOrderType,
  generateNewOrder,
  setCart,
  customerName,
  setCustomerName,
  fromTableReservation = false,
}) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showCustomerNameInput, setShowCustomerNameInput] = useState(false);
  const [tempCustomerName, setTempCustomerName] = useState(customerName);
  const total = calculateTotal();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Extract table ID from selectedTable (e.g., "Table 1" → "1")
  const tableId = selectedTable.replace(/[^\d]/g, "");

  const handleDone = () => {
    if (cart.length > 0) {
      setShowConfirmation(true);
    }
  };

  const handleSendToKitchen = () => {
    if (fromTableReservation) {
      // Create order details from cart
      const orderDetails = {
        items: cart.map((item) => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          note: item.note || "",
        })),
        total: total,
        orderType: orderType,
        orderNumber: orderNumber,
      };

      // Dispatch reserve table action
      dispatch(
        reserveTable({
          tableId,
          customerName,
          orderDetails,
        })
      );

      // Clear selected table
      dispatch(clearSelectedTable());
    }

    // Logic to send order to kitchen
    setShowConfirmation(false);
    generateNewOrder();
    setCart([]);

    // If this was from a table reservation, navigate back to tables page
    if (fromTableReservation) {
      navigate("/table");
    }
  };

  const handleSendToCashier = () => {
    if (fromTableReservation) {
      // Create order details from cart
      const orderDetails = {
        items: cart.map((item) => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          note: item.note || "",
        })),
        total: total,
        orderType: orderType,
        orderNumber: orderNumber,
      };

      // Dispatch reserve table action
      dispatch(
        reserveTable({
          tableId,
          customerName,
          orderDetails,
        })
      );

      // Clear selected table
      dispatch(clearSelectedTable());
    }

    // Logic to send order to cashier
    setShowConfirmation(false);
    generateNewOrder();
    setCart([]);

    // If this was from a table reservation, navigate back to tables page
    if (fromTableReservation) {
      navigate("/table");
    }
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  const handleSaveCustomerName = () => {
    setCustomerName(tempCustomerName);
    setShowCustomerNameInput(false);
  };

  const handleGoBack = () => {
    if (fromTableReservation) {
      // Clear selected table when navigating back
      dispatch(clearSelectedTable());
      navigate("/table");
    } else {
      setCart([]);
    }
  };

  return (
    <div className="px-4 py-2 sm:py-3 h-full flex flex-col">
      <div className="flex justify-between">
        <div className="relative">
          <button
            className="font-medium flex items-center gap-1"
            onClick={() => setShowTableDropdown(!showTableDropdown)}
            disabled={fromTableReservation} // Disable table selection if from reservation
          >
            {selectedTable}{" "}
            <FaChevronDown
              className={`text-xs ${fromTableReservation ? "hidden" : ""}`}
            />
          </button>

          {showTableDropdown && !fromTableReservation && (
            <div className="absolute z-10 mt-1 bg-white border border-neutral-200 rounded-lg shadow-lg w-40">
              {availableTables.map((table) => (
                <button
                  key={table}
                  className={`w-full text-left px-3 py-2 hover:bg-neutral-50 ${
                    selectedTable === table
                      ? "font-medium text-primary-600"
                      : ""
                  }`}
                  onClick={() => {
                    setSelectedTable(table);
                    setShowTableDropdown(false);
                  }}
                >
                  {table}
                </button>
              ))}
            </div>
          )}
        </div>
        {/* Customer name input */}
        <div className="">
          <button
            className="text-sm font-medium flex items-center gap-1"
            onClick={() => setShowCustomerNameInput(true)}
          >
            {customerName || "Guest"}
            <FaEdit className="text-xs text-primary-600" />
          </button>
          {showCustomerNameInput && (
            <div className="absolute left-12 z-20 mt-1 flex flex-col gap-2 bg-white border border-neutral-200 rounded-lg shadow-lg p-2">
              <input
                type="text"
                value={tempCustomerName}
                onChange={(e) => setTempCustomerName(e.target.value)}
                className="border border-neutral-300 rounded-lg px-2 py-2 text-sm focus:outline-primary-500"
                placeholder="Customer name"
              />
              <button
                className="bg-primary-600 text-white px-2 py-2 rounded-lg text-sm"
                onClick={handleSaveCustomerName}
              >
                Save
              </button>
            </div>
          )}
        </div>
        <p className="text-sm text-neutral-500">{orderNumber}</p>
      </div>

      <div className="flex gap-3 mt-2 mb-4">
        <button
          className={`flex-1 py-1 rounded-lg transition-colors ${
            orderType === "dine-in"
              ? "bg-danger-600 text-white"
              : "bg-white border border-primary-500 text-primary-700"
          }`}
          onClick={() => setOrderType("dine-in")}
          disabled={fromTableReservation} // Disable order type change if from reservation
        >
          Dine-in
        </button>
        <button
          className={`flex-1 py-1 rounded-lg transition-colors ${
            orderType === "takeaway"
              ? "bg-danger-600 text-white"
              : "bg-white border border-primary-500 text-primary-700"
          }`}
          onClick={() => setOrderType("takeaway")}
          disabled={fromTableReservation} // Disable order type change if from reservation
        >
          Takeaway
        </button>
      </div>

      <div className="flex-1 overflow-y-auto [scrollbar-width:none] [::-webkit-scrollbar]:hidden">
        {cart.length > 0 ? (
          <div className="space-y-4 mb-6">
            {cart.map((item) => (
              <div key={item.id} className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-xl">
                    {item.category === "pizza"
                      ? "🍕"
                      : item.category === "main"
                      ? "🍽️"
                      : item.category === "appetizers"
                      ? "🥗"
                      : item.category === "drinks"
                      ? "🥤"
                      : "🍴"}
                  </span>
                </div>

                <div className="flex-1">
                  <div className="flex justify-between">
                    <h4 className="font-medium text-primary-600">
                      {item.name}
                    </h4>
                  </div>
                  {item.note && (
                    <p className="text-sm text-neutral-500">
                      Note: {item.note}
                    </p>
                  )}
                  <p className="font-medium">
                    {item.price} {item.currency}
                  </p>
                  <div className="flex items-center gap-3 mt-1">
                    <button
                      className="w-6 h-6 rounded-full border border-neutral-300 flex items-center justify-center"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      <FaMinus className="text-xs" />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="w-6 h-6 rounded-full border border-neutral-300 flex items-center justify-center"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      <FaPlus className="text-xs" />
                    </button>
                    <button className="w-6 h-6 rounded-full border border-neutral-300 flex items-center justify-center ml-auto">
                      <FaUser className="text-xs" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-full flex flex-col justify-center items-center">
            <p className="sm:text-xl text-neutral-500">Your order is empty</p>
            <p className="text-sm text-neutral-400">Add items from the menu</p>
            {fromTableReservation && (
              <p className="mt-2 text-sm text-primary-600">{selectedTable}</p>
            )}
          </div>
        )}
      </div>

      <div className="mt-auto border-t border-neutral-200 pt-4">
        {cart.length > 0 && (
          <div className="mb-4">
            <div className="flex justify-between">
              <span className="font-medium">Total</span>
              <span className="font-bold">{calculateTotal()} AED</span>
            </div>
          </div>
        )}
        <div className="flex gap-3">
          <button
            className={`flex-1 py-2 rounded-lg transition-colors ${
              cart.length === 0
                ? "bg-neutral-300 text-neutral-500 cursor-not-allowed"
                : "bg-primary-600 text-white hover:bg-primary-700"
            }`}
            disabled={cart.length === 0}
            onClick={handleDone}
          >
            Done
          </button>
          <button
            className={`flex-1 py-2 border rounded-lg transition-colors border-neutral-300 hover:bg-neutral-50`}
            onClick={handleGoBack}
          >
            {fromTableReservation ? "Back" : "Cancel"}
          </button>
        </div>
      </div>

      {/* Order Confirmation Popup Component */}
      <ConfirmOrder
        isOpen={showConfirmation}
        onClose={handleCancel}
        onSendToKitchen={handleSendToKitchen}
        onSendToCashier={handleSendToCashier}
        cart={cart}
        orderNumber={orderNumber}
        orderType={orderType}
        customerName={customerName}
        selectedTable={selectedTable}
        totalAmount={total}
      />
    </div>
  );
};

export default MenuSidebar;
