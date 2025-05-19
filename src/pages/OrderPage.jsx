import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useDispatch } from "react-redux";
import { completeOrder } from "../store/orderSlice";
import { useOrderManagement } from "../hooks/useOrderManagement";
import OrderList from "../components/orders/OrderList";
import OrderDetails from "../components/orders/OrderDetails";
import AddMealModal from "../components/orders/AddMealModal";
import PaymentModal from "../components/orders/PaymentModal";

const OrderPage = () => {
  const dispatch = useDispatch();
  const {
    orders,
    loading,
    error,
    meals,
    selectedOrderId,
    selectedOrder,
    showPaymentModal,
    paymentMethod,
    discount,
    showAddMeal,
    addMealId,
    addMealQty,
    setShowPaymentModal,
    setPaymentMethod,
    setShowAddMeal,
    setAddMealId,
    setAddMealQty,
    handleOrderClick,
    handlePayment,
    handleDiscountChange,
    handleDeleteMeal,
    handleAddMeal,
  } = useOrderManagement();

  const receiptRef = useRef();

  const handlePrintReceipt = useReactToPrint({
    content: () => receiptRef.current,
    onAfterPrint: () => {
      if (selectedOrderId) {
        dispatch(completeOrder(selectedOrderId));
      }
    },
    removeAfterPrint: true,
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-2 py-2">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        <OrderList
          orders={orders}
          selectedOrderId={selectedOrderId}
          onOrderClick={handleOrderClick}
        />

        <div className="bg-white rounded-2xl shadow-lg p-4 border border-primary-100">
          <div ref={receiptRef}>
            <OrderDetails
              selectedOrder={selectedOrder}
              meals={meals}
              discount={discount}
              onDiscountChange={handleDiscountChange}
              onDeleteMeal={handleDeleteMeal}
              onAddMeal={() => setShowAddMeal(true)}
              onPay={() => setShowPaymentModal(true)}
              onPrint={handlePrintReceipt}
            />
          </div>
        </div>
      </div>

      <AddMealModal
        isOpen={showAddMeal}
        onClose={() => setShowAddMeal(false)}
        onAdd={handleAddMeal}
        meals={meals}
        mealId={addMealId}
        setMealId={setAddMealId}
        quantity={addMealQty}
        setQuantity={setAddMealQty}
      />

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onConfirm={handlePayment}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
      />
    </div>
  );
};

export default OrderPage;
