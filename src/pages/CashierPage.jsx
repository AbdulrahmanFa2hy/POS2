import { useState, useEffect, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { FaArrowLeft, FaTimes } from "react-icons/fa";
import CategoryTabs from "../components/common/CategoryTabs";
import PaymentSection from "../components/cashier/paymentSection/PaymentSection";
import SearchInput from "../components/common/SearchInput";
import MenuGrid from "../components/menu/MenuGrid";
import SelectedOrderData from "../components/cashier/SelectedOrderData";
import CashierSidebar from "../components/cashier/CashierSidebar";
import CashierHeader from "../components/cashier/CashierHeader";
import Loading from "../components/common/Loading";
import { fetchMeals } from "../store/mealSlice";
import {
  fetchAllOrders,
  setSelectedOrder,
  addMealToOrder,
  deleteMealFromOrder,
} from "../store/orderSlice";

// Food categories
const categories = [
  { id: "pizza", name: "pizza" },
  { id: "main dishes", name: "main dishes" },
  { id: "appetizers", name: "appetizers" },
  { id: "drinks", name: "drinks" },
  { id: "dinner", name: "dinner" },
];

// Role-based permissions
const ROLES = {
  MANAGER: "manager",
  CASHIER: "cashier",
  WAITER: "waiter",
};

const hasPermission = (userRole, requiredRoles) => {
  return requiredRoles.includes(userRole);
};

function CashierPage() {
  const dispatch = useDispatch();
  const location = useLocation();

  // Get table number from URL parameters
  const queryParams = new URLSearchParams(location.search);
  const tableNumberFromUrl = queryParams.get("table");

  // Redux state
  const { meals, loading: mealsLoading } = useSelector((state) => state.meals);
  const { user } = useSelector((state) => state.auth);
  const {
    orders,
    currentOrder,
    loading: ordersLoading,
  } = useSelector((state) => state.order);

  // Local state
  const [activeCategory, setActiveCategory] = useState("pizza");
  const [filteredItems, setFilteredItems] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cashierSidebarOpen, setCashierSidebarOpen] = useState(
    window.innerWidth >= 1024
  );

  // Per-order state management
  const [orderStates, setOrderStates] = useState({});
  const [mealOperationLoading, setMealOperationLoading] = useState(false);

  // Get current order's state
  const currentOrderState = useMemo(() => {
    if (!currentOrder?._id) return { tax: "", discount: "" };
    return orderStates[currentOrder._id] || { tax: "", discount: "" };
  }, [currentOrder?._id, orderStates]);

  // Update order state
  const updateOrderState = useCallback((orderId, updates) => {
    setOrderStates((prev) => ({
      ...prev,
      [orderId]: { ...prev[orderId], ...updates },
    }));
  }, []);

  // Role-based permissions
  const userRole = user?.role?.toLowerCase();
  const canDeleteMeals = hasPermission(userRole, [ROLES.MANAGER]);
  const canAccessPayment = hasPermission(userRole, [
    ROLES.MANAGER,
    ROLES.CASHIER,
  ]);
  const canDecreaseQuantity = hasPermission(userRole, [ROLES.MANAGER]);

  // Fetch data on component mount
  useEffect(() => {
    dispatch(fetchMeals());
    dispatch(fetchAllOrders());
  }, [dispatch]);

  // Handle responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      setCashierSidebarOpen(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (window.innerWidth < 1024) {
      setCashierSidebarOpen(false);
    }
  }, []);

  // Toggle sidebar
  const toggleCashierSidebar = () => {
    setCashierSidebarOpen(!cashierSidebarOpen);
  };

  // Auto-select order when orders are loaded, prioritizing table from URL
  useEffect(() => {
    if (orders && orders.length > 0 && !currentOrder) {
      let selectedOrder = null;

      // If table number is provided in URL, find the order for that table
      if (tableNumberFromUrl) {
        const tableNumber = parseInt(tableNumberFromUrl, 10);
        selectedOrder = orders.find(
          (order) =>
            order.tableNumber === tableNumber && order.type === "dine_in"
        );

        // If no order found for the specific table, log a message for debugging
        if (!selectedOrder) {
          console.log(`No active order found for table ${tableNumber}`);
        }
      }

      // If no specific table order found, use default selection logic
      if (!selectedOrder) {
        // Sort orders: pending first, then by creation date (latest first)
        const sortedOrders = [...orders].sort((a, b) => {
          // First, sort by status (pending first)
          if (a.status === "pending" && b.status !== "pending") return -1;
          if (a.status !== "pending" && b.status === "pending") return 1;

          // Then by creation date (latest first)
          return new Date(b.createdAt) - new Date(a.createdAt);
        });

        // Select the first dine-in order, or first order if no dine-in
        const dineInOrder = sortedOrders.find(
          (order) => order.type === "dine_in"
        );
        selectedOrder = dineInOrder || sortedOrders[0];
      }

      if (selectedOrder) {
        dispatch(setSelectedOrder(selectedOrder));
      }
    }
  }, [orders, currentOrder, dispatch, tableNumberFromUrl]);

  // Update orderItems when currentOrder changes
  useEffect(() => {
    if (currentOrder && currentOrder.orderItems) {
      const formattedItems = currentOrder.orderItems.map((item) => {
        let mealData = null;

        if (
          currentOrder.orderItemsData &&
          currentOrder.orderItemsData.length > 0
        ) {
          mealData = currentOrder.orderItemsData.find(
            (meal) => meal._id === item.mealId
          );
        }

        if (!mealData && item.meal) {
          mealData = item.meal;
        }

        if (!mealData) {
          console.warn(`No meal data found for mealId: ${item.mealId}`);
          mealData = {
            _id: item.mealId,
            name: `Meal ${item.mealId}`,
            price: item.price,
            category: "unknown",
            currency: "AED",
          };
        }

        return {
          id: mealData._id,
          name: mealData.name,
          price: item.price,
          quantity: item.quantity,
          category: mealData.category,
          currency: mealData.currency || "AED",
        };
      });
      setOrderItems(formattedItems);
    } else {
      setOrderItems([]);
    }
  }, [currentOrder]);

  // Filter food items based on active category and search term
  useEffect(() => {
    if (meals && meals.length > 0) {
      setFilteredItems(
        meals.filter(
          (item) =>
            item.category === activeCategory &&
            (searchTerm === "" ||
              item.name.toLowerCase().includes(searchTerm.toLowerCase()))
        )
      );
    }
  }, [activeCategory, meals, searchTerm]);

  // Add item to order with loading state
  const addToOrder = useCallback(
    async (item) => {
      if (!currentOrder) {
        console.warn("No current order selected");
        return;
      }

      setMealOperationLoading(true);
      try {
        const existingOrderItem = currentOrder.orderItems?.find(
          (orderItem) => orderItem.mealId === item._id
        );

        let newQuantity = 1;
        if (existingOrderItem) {
          newQuantity = existingOrderItem.quantity + 1;
        }

        await dispatch(
          addMealToOrder({
            orderId: currentOrder._id,
            mealId: item._id,
            quantity: newQuantity,
          })
        ).unwrap();

        toast.success(`${item.name} added to order`, {
          duration: 2000,
        });
      } catch (error) {
        console.error("Failed to add meal to order:", error);
        toast.error("Failed to add meal to order", {
          duration: 3000,
        });
      } finally {
        setMealOperationLoading(false);
      }
    },
    [currentOrder, dispatch]
  );

  // Remove item from order with loading state
  const removeFromOrder = useCallback(
    async (id) => {
      if (!currentOrder) {
        console.warn("No current order selected");
        return;
      }

      if (!canDeleteMeals) {
        console.warn("User does not have permission to delete meals");
        return;
      }

      setMealOperationLoading(true);
      try {
        await dispatch(
          deleteMealFromOrder({
            orderId: currentOrder._id,
            mealId: id,
          })
        ).unwrap();

        toast.success("Meal removed from order", {
          duration: 2000,
          icon: "❌",
        });
      } catch (error) {
        console.error("Failed to remove meal from order:", error);
        toast.error("Failed to remove meal", {
          duration: 3000,
        });
      } finally {
        setMealOperationLoading(false);
      }
    },
    [currentOrder, dispatch, canDeleteMeals]
  );

  // Update item quantity with loading state
  const updateQuantity = useCallback(
    async (id, quantity) => {
      if (!currentOrder) {
        console.warn("No current order selected");
        return;
      }

      if (quantity <= 0) {
        if (canDeleteMeals) {
          removeFromOrder(id);
        }
        return;
      }

      setMealOperationLoading(true);
      try {
        await dispatch(
          addMealToOrder({
            orderId: currentOrder._id,
            mealId: id,
            quantity: quantity,
          })
        ).unwrap();

        toast.success("Quantity updated", {
          duration: 2000,
        });
      } catch (error) {
        console.error("Failed to update meal quantity:", error);
        toast.error("Failed to update quantity", {
          duration: 3000,
        });
      } finally {
        setMealOperationLoading(false);
      }
    },
    [currentOrder, dispatch, canDeleteMeals, removeFromOrder]
  );

  // Calculate totals
  const calculateSubtotal = useCallback(() => {
    return orderItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }, [orderItems]);

  const calculateDiscount = useCallback(() => {
    const discount = parseFloat(currentOrderState.discount) || 0;
    return (calculateSubtotal() * discount) / 100;
  }, [calculateSubtotal, currentOrderState.discount]);

  // Handle search
  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  // Handle print
  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  // Handle order selection from sidebar
  const handleSelectOrder = useCallback(
    (order) => {
      dispatch(setSelectedOrder(order));
    },
    [dispatch]
  );

  // Handle tax/discount changes for current order
  const handleTaxChange = useCallback(
    (tax) => {
      if (currentOrder?._id) {
        updateOrderState(currentOrder._id, { tax });
      }
    },
    [currentOrder?._id, updateOrderState]
  );

  const handleDiscountChange = useCallback(
    (discount) => {
      if (currentOrder?._id) {
        updateOrderState(currentOrder._id, { discount });
      }
    },
    [currentOrder?._id, updateOrderState]
  );

  if (mealsLoading || ordersLoading) {
    return <Loading />;
  }

  return (
    <div className="h-full flex relative">
      {/* Overlay for mobile sidebar */}
      {cashierSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleCashierSidebar}
        />
      )}

      {/* Main content area */}
      <div className="flex-1 overflow-y-auto [scrollbar-width:none] [::-webkit-scrollbar]:hidden">
        <div className="w-full px-2 sm:px-3 lg:px-1 xl:px-3 py-4">
          <CashierHeader />

          {/* Search and Add Meal Button */}
          <div className="flex items-center gap-2 sm:gap-4 mb-6">
            <div className="flex-1">
              <SearchInput value={searchTerm} onChange={handleSearch} />
            </div>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="btn bg-primary-700 text-white hover:bg-primary-800 whitespace-nowrap text-sm sm:text-base px-2 sm:px-4 py-2"
            >
              {isMenuOpen ? "Close Menu" : "Add Meal"}
            </button>
          </div>

          {/* Collapsible Menu Section */}
          {isMenuOpen && (
            <div className="mb-6 animate-fade-in">
              <CategoryTabs
                categories={categories}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
              />
              <MenuGrid menuItems={filteredItems} addToCart={addToOrder} />
            </div>
          )}

          {/* Loading overlay for meal operations */}
          {mealOperationLoading && (
            <div className="fixed inset-0 bg-black bg-opacity-45 flex justify-center items-center z-50">
              <div className="bg-white rounded-lg p-4 shadow-lg">
                <div className="flex items-center justify-center w-full h-full space-x-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-700"></div>
                  <span className="text-gray-700">Updating order...</span>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6">
            <SelectedOrderData
              orderItems={orderItems}
              updateQuantity={updateQuantity}
              removeFromOrder={removeFromOrder}
              canDeleteMeals={canDeleteMeals}
              canDecreaseQuantity={canDecreaseQuantity}
            />

            {/* Payment Section - Role-based visibility */}
            {canAccessPayment ? (
              <div className="mt-6">
                <PaymentSection
                  tax={currentOrderState.tax}
                  setTax={handleTaxChange}
                  discount={currentOrderState.discount}
                  setDiscount={handleDiscountChange}
                  subtotal={calculateSubtotal()}
                  discountAmount={calculateDiscount()}
                  handlePrint={handlePrint}
                />
              </div>
            ) : (
              // Show only total for waiters
              <div className="mt-6 bg-white rounded-lg shadow-card p-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-primary-700">
                      {calculateSubtotal().toFixed(2)} AED
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar toggle button */}
      <button
        onClick={toggleCashierSidebar}
        className="fixed top-[22%] right-0 z-10 bg-white h-16 p-[5px] text-lg border border-primary-200 rounded-tl-lg rounded-bl-lg shadow-xl text-primary-800"
      >
        {cashierSidebarOpen ? <FaTimes /> : <FaArrowLeft />}
      </button>

      {/* Orders List Sidebar */}
      <div
        className={`
          ${cashierSidebarOpen ? "translate-x-0" : "translate-x-full"} 
          lg:translate-x-0 
          fixed lg:relative lg:block 
          w-96 max-w-[80vw] lg:max-w-none lg:w-80
          bg-white border-l border-neutral-200
          right-0 h-full z-40
          transition-transform duration-300 ease-in-out
        `}
      >
        <CashierSidebar
          selectedOrder={currentOrder}
          onSelectOrder={handleSelectOrder}
        />
      </div>
    </div>
  );
}

export default CashierPage;
