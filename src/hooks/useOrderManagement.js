import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllOrders,
  setSelectedOrder,
  processPayment,
  updateOrderDiscount,
  deleteMealFromOrder,
  addMealToOrder,
} from '../store/orderSlice';
import { fetchMeals } from '../store/mealSlice';

export const useOrderManagement = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.order);
  const { meals } = useSelector((state) => state.meals);

  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [discount, setDiscount] = useState(0);
  const [showAddMeal, setShowAddMeal] = useState(false);
  const [addMealId, setAddMealId] = useState("");
  const [addMealQty, setAddMealQty] = useState(1);

  useEffect(() => {
    dispatch(fetchAllOrders());
    dispatch(fetchMeals());
  }, [dispatch]);

  const handleOrderClick = (order) => {
    setSelectedOrderId(order._id);
    dispatch(setSelectedOrder(order));
    setDiscount(order.discount || 0);
  };

  const handlePayment = async () => {
    if (selectedOrderId) {
      const order = orders.find((o) => o._id === selectedOrderId);
      await dispatch(
        processPayment({
          orderId: selectedOrderId,
          paymentMethod,
          amount: order.totalPrice,
        })
      );
      setShowPaymentModal(false);
    }
  };

  const handleDiscountChange = (value) => {
    setDiscount(value);
    dispatch(updateOrderDiscount(value));
  };

  const handleDeleteMeal = async (mealId) => {
    if (selectedOrderId && mealId) {
      await dispatch(deleteMealFromOrder({ orderId: selectedOrderId, mealId }));
      dispatch(fetchAllOrders());
    }
  };

  const handleAddMeal = async () => {
    if (selectedOrderId && addMealId && addMealQty > 0) {
      await dispatch(
        addMealToOrder({
          orderId: selectedOrderId,
          mealId: addMealId,
          quantity: addMealQty,
        })
      );
      setShowAddMeal(false);
      setAddMealId("");
      setAddMealQty(1);
      dispatch(fetchAllOrders());
    }
  };

  const selectedOrder = orders.find((o) => o._id === selectedOrderId);

  return {
    // State
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

    // Setters
    setShowPaymentModal,
    setPaymentMethod,
    setShowAddMeal,
    setAddMealId,
    setAddMealQty,

    // Handlers
    handleOrderClick,
    handlePayment,
    handleDiscountChange,
    handleDeleteMeal,
    handleAddMeal,
  };
}; 