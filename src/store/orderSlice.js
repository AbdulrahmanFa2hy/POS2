import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";
import { API_ENDPOINTS } from "../utils/constants";

// Async thunk for creating an order
export const createOrder = createAsyncThunk(
  "order/createOrder",
  async ({ tableNumber, orderItems, type }, { rejectWithValue }) => {
    try {
      const orderPayload = {
        orderItems,
        type,
        ...(type === "dine_in" ? { tableNumber } : {}),
      };

      const response = await api.post(API_ENDPOINTS.ORDER, orderPayload);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to create order" }
      );
    }
  }
);

// Async thunk for fetching all orders
export const fetchAllOrders = createAsyncThunk(
  "order/fetchAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(API_ENDPOINTS.ORDER);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch orders" }
      );
    }
  }
);

// Async thunk for updating order
export const updateOrder = createAsyncThunk(
  "order/updateOrder",
  async ({ orderId, updates }, { rejectWithValue }) => {
    try {
      const response = await api.patch(
        `${API_ENDPOINTS.ORDER}/${orderId}`,
        updates
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to update order" }
      );
    }
  }
);

// Async thunk for completing order
export const completeOrder = createAsyncThunk(
  "order/completeOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await api.patch(
        `${API_ENDPOINTS.ORDER}/${orderId}/complete`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to complete order" }
      );
    }
  }
);

// Async thunk for payment
export const processPayment = createAsyncThunk(
  "order/processPayment",
  async ({ orderId, paymentMethod, amount }, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `${API_ENDPOINTS.ORDER}/${orderId}/payment`,
        {
          paymentMethod,
          amount,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to process payment" }
      );
    }
  }
);

// Async thunk for deleting a meal from an order
export const deleteMealFromOrder = createAsyncThunk(
  "order/deleteMealFromOrder",
  async ({ orderId, mealId }, { rejectWithValue, getState }) => {
    try {
      // Get the auth token from the state
      const token = getState().auth.token;

      // Set the authorization header
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const response = await api.delete(`${API_ENDPOINTS.ORDER}/${orderId}`, {
        data: { mealId },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to delete meal from order" }
      );
    }
  }
);

// Async thunk for adding a meal to an order
export const addMealToOrder = createAsyncThunk(
  "order/addMealToOrder",
  async ({ orderId, mealId, quantity }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`${API_ENDPOINTS.ORDER}/${orderId}`, {
        mealId,
        quantity,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to add meal to order" }
      );
    }
  }
);

// Async thunks for fetching order by table number
export const fetchOrderByTable = createAsyncThunk(
  "order/fetchOrderByTable",
  async (tableNumber, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `${API_ENDPOINTS.ORDER}/get-by-table/${tableNumber}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch order by table" }
      );
    }
  }
);

// Async thunks for change order table
export const changeOrderTable = createAsyncThunk(
  "order/changeOrderTable",
  async ({ orderId, newTableNumber }, { rejectWithValue }) => {
    try {
      const response = await api.patch(
        `${API_ENDPOINTS.ORDER}/${orderId}/change-table`,
        {
          tableNumber: newTableNumber,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to change table" }
      );
    }
  }
);

// Initial state
const initialState = {
  currentOrder: null,
  orders: [],
  loading: false,
  error: null,
  success: false,
};

// Order slice
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearOrderError: (state) => {
      state.error = null;
    },
    clearOrderSuccess: (state) => {
      state.success = false;
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
      state.error = null;
    },
    setSelectedOrder: (state, action) => {
      state.currentOrder = action.payload;
    },
    addItemToOrder: (state, action) => {
      if (state.currentOrder) {
        state.currentOrder.orderItems.push(action.payload);
        // Recalculate totals
        state.currentOrder.subtotalPrice = state.currentOrder.orderItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        state.currentOrder.totalPrice =
          state.currentOrder.subtotalPrice - state.currentOrder.discount;
      }
    },
    removeItemFromOrder: (state, action) => {
      if (state.currentOrder) {
        state.currentOrder.orderItems = state.currentOrder.orderItems.filter(
          (item) => item._id !== action.payload
        );
        // Recalculate totals
        state.currentOrder.subtotalPrice = state.currentOrder.orderItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        state.currentOrder.totalPrice =
          state.currentOrder.subtotalPrice - state.currentOrder.discount;
      }
    },
    updateOrderDiscount: (state, action) => {
      if (state.currentOrder) {
        state.currentOrder.discount = action.payload;
        state.currentOrder.totalPrice =
          state.currentOrder.subtotalPrice - state.currentOrder.discount;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Order Cases
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload.data;
        state.success = true;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to create order";
        state.success = false;
      })
      // Fetch All Orders Cases
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.data;
        state.error = null;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch orders";
      })
      // Update Order Cases
      .addCase(updateOrder.fulfilled, (state, action) => {
        const updatedOrder = action.payload.data;
        state.orders = state.orders.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order
        );
        if (state.currentOrder?._id === updatedOrder._id) {
          state.currentOrder = updatedOrder;
        }
      })
      // Complete Order Cases
      .addCase(completeOrder.fulfilled, (state, action) => {
        const updatedOrder = action.payload.data;
        state.orders = state.orders.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order
        );
        if (state.currentOrder?._id === updatedOrder._id) {
          state.currentOrder = updatedOrder;
        }
      })
      // Process Payment Cases
      .addCase(processPayment.fulfilled, (state, action) => {
        const updatedOrder = action.payload.data;
        state.orders = state.orders.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order
        );
        if (state.currentOrder?._id === updatedOrder._id) {
          state.currentOrder = updatedOrder;
        }
      })
      // Fetch order by table
      .addCase(fetchOrderByTable.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderByTable.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload.data;
      })
      .addCase(fetchOrderByTable.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to fetch order by table";
      })
      // Change table
      .addCase(changeOrderTable.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changeOrderTable.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload.data;
        // Update the order in the orders array as well
        const updatedOrder = action.payload.data;
        state.orders = state.orders.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order
        );
      })
      .addCase(changeOrderTable.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to change table";
      })
      // Add meal to order
      .addCase(addMealToOrder.fulfilled, (state, action) => {
        // Update the current order with the new data
        state.currentOrder = action.payload.data;
        // Update the order in the orders array as well
        const updatedOrder = action.payload.data;
        state.orders = state.orders.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order
        );
      })
      .addCase(addMealToOrder.rejected, (state, action) => {
        state.error = action.payload?.message || "Failed to add meal to order";
      })
      // Delete meal from order
      .addCase(deleteMealFromOrder.fulfilled, (state, action) => {
        // Update the current order with the new data
        state.currentOrder = action.payload.data;
        // Update the order in the orders array as well
        const updatedOrder = action.payload.data;
        state.orders = state.orders.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order
        );
      })
      .addCase(deleteMealFromOrder.rejected, (state, action) => {
        state.error =
          action.payload?.message || "Failed to delete meal from order";
      });
  },
});

export const {
  clearOrderError,
  clearOrderSuccess,
  clearCurrentOrder,
  setSelectedOrder,
  addItemToOrder,
  removeItemFromOrder,
  updateOrderDiscount,
} = orderSlice.actions;
export default orderSlice.reducer;
