import { useState, useMemo, useCallback, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaUserEdit } from "react-icons/fa";
import MenuSidebarItem from "./MenuSidebarItem";
import { clearSelectedTable } from "../../store/tableSlice";

// Lazy load the ConfirmOrder component since it's not needed immediately
const ConfirmOrder = lazy(() => import("./ConfirmOrder"));

const MenuSidebar = ({
  cart,
  selectedTable,
  updateQuantity,
  updateItemNote,
  calculateTotal,
  setCart,
  fromTableReservation = false,
}) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [customerName, setCustomerName] = useState("Guest");
  const [showCustomerNameInput, setShowCustomerNameInput] = useState(false);
  const [tempCustomerName, setTempCustomerName] = useState(customerName);
  const [orderType, setOrderType] = useState(
    `${fromTableReservation && selectedTable ? "dine-in" : "takeaway"}`
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Memoize total calculation to prevent unnecessary recalculations
  const total = useMemo(() => calculateTotal(), [calculateTotal]);

  // Memoize the table display status
  const tableDisplayStatus = useMemo(() => {
    if (!selectedTable) return { text: "No table", isDisabled: true };
    return {
      text: selectedTable,
      isDisabled: orderType === "takeaway",
    };
  }, [selectedTable, orderType]);

  const handleDone = useCallback(() => {
    if (cart.length > 0) {
      setShowConfirmation(true);
    }
  }, [cart.length]);

  const handleSendToKitchen = useCallback(() => {
    if (fromTableReservation) {
      dispatch(clearSelectedTable());
    }

    setShowConfirmation(false);
    setCart([]);

    if (fromTableReservation) {
      navigate("/table");
    }
  }, [fromTableReservation, dispatch, setCart, navigate]);

  const handleCancel = useCallback(() => {
    setShowConfirmation(false);
  }, []);

  const handleSaveCustomerName = useCallback(() => {
    setCustomerName(tempCustomerName);
    setShowCustomerNameInput(false);
  }, [tempCustomerName, setCustomerName]);

  const handleGoBack = useCallback(() => {
    if (fromTableReservation) {
      dispatch(clearSelectedTable());
      navigate("/table");
    } else {
      setCart([]);
    }
  }, [fromTableReservation, dispatch, navigate, setCart]);

  const handleDineInClick = useCallback(() => {
    if (!selectedTable) {
      navigate("/table");
    } else {
      setOrderType("dine-in");
    }
  }, [selectedTable, navigate, setOrderType]);

  const handleTakeawayClick = useCallback(() => {
    setOrderType("takeaway");
    if (fromTableReservation) {
      dispatch(clearSelectedTable());
    }
  }, [setOrderType, fromTableReservation, dispatch]);

  const handleCustomerNameChange = useCallback((e) => {
    setTempCustomerName(e.target.value);
  }, []);

  // Memoize the cart items rendering
  const cartItems = useMemo(() => {
    if (cart.length === 0) {
      return (
        <div className="h-full flex flex-col justify-center items-center">
          <p className="sm:text-xl text-neutral-500">Your order is empty</p>
          <p className="text-sm text-neutral-400">Add items from the menu</p>
          {fromTableReservation && (
            <p className="mt-2 text-sm text-primary-600">{selectedTable}</p>
          )}
        </div>
      );
    }

    return (
      <div className="space-y-1 mb-6">
        {cart.map((item) => (
          <MenuSidebarItem
            key={item._id}
            item={item}
            updateQuantity={updateQuantity}
            updateItemNote={updateItemNote}
          />
        ))}
      </div>
    );
  }, [
    cart,
    fromTableReservation,
    selectedTable,
    updateQuantity,
    updateItemNote,
  ]);

  return (
    <div className="px-4 py-2 sm:py-3 h-full flex flex-col">
      <div className="flex justify-between items-center gap-8">
        <div>
          <span
            className={`font-medium ${
              tableDisplayStatus.isDisabled
                ? "text-neutral-400 line-through"
                : ""
            }`}
          >
            {tableDisplayStatus.text}
          </span>
        </div>
        {/* Customer name input */}
        <div>
          <button
            className="text-sm font-medium flex items-center gap-1"
            onClick={() => setShowCustomerNameInput(true)}
          >
            {customerName || "Guest"}
            <FaUserEdit className="text-sm text-primary-800" />
          </button>
          {showCustomerNameInput && (
            <div className="absolute left-6 sm:left-20 z-20 mt-1 flex flex-col gap-2 bg-white border border-neutral-200 rounded-lg shadow-lg p-2">
              <input
                type="text"
                value={tempCustomerName}
                onChange={handleCustomerNameChange}
                className="border border-neutral-300 rounded-lg px-2 py-2 text-sm focus:outline-primary-800"
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
      </div>

      <div className="flex gap-3 mt-2 mb-4">
        <button
          className={`flex-1 py-1 rounded-lg transition-colors ${
            orderType === "dine-in"
              ? "bg-danger-500 text-white"
              : "bg-white border border-primary-800 text-primary-800"
          }`}
          onClick={handleDineInClick}
        >
          Dine-in
        </button>
        <button
          className={`flex-1 py-1 rounded-lg transition-colors ${
            orderType === "takeaway"
              ? "bg-danger-500 text-white"
              : "bg-white border border-primary-800 text-primary-800"
          }`}
          onClick={handleTakeawayClick}
        >
          Takeaway
        </button>
      </div>

      <div className="flex-1 overflow-y-auto [scrollbar-width:none] [::-webkit-scrollbar]:hidden">
        {cartItems}
      </div>

      <div className="mt-auto border-t border-neutral-200 pt-4">
        {cart.length > 0 && (
          <div className="mb-4">
            <div className="flex justify-between">
              <span className="font-medium">Total</span>
              <span className="font-bold">{total} AED</span>
            </div>
          </div>
        )}
        <div className="flex gap-3">
          <button
            className={`flex-1 py-2 rounded-lg transition-colors ${
              cart.length === 0
                ? "bg-neutral-300 text-neutral-500 cursor-not-allowed"
                : "bg-primary-800 text-white hover:bg-primary-900"
            }`}
            disabled={cart.length === 0}
            onClick={handleDone}
          >
            Done
          </button>
          <button
            className={`flex-1 py-2 border rounded-lg text-primary-800 transition-colors border-neutral-300 bg-neutral-100 hover:bg-neutral-200`}
            onClick={handleGoBack}
          >
            {fromTableReservation ? "Back" : "Cancel"}
          </button>
        </div>
      </div>

      {/* Order Confirmation Popup Component */}
      <Suspense fallback={<div>Loading...</div>}>
        {showConfirmation && (
          <ConfirmOrder
            isOpen={showConfirmation}
            onClose={handleCancel}
            onSendToKitchen={handleSendToKitchen}
            cart={cart}
            type={orderType}
            customerName={customerName}
            selectedTable={selectedTable}
            totalAmount={total}
          />
        )}
      </Suspense>
    </div>
  );
};

export default MenuSidebar;
