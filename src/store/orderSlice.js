import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";
import { API_ENDPOINTS } from "../utils/constants";

// Async thunk for creating an order
export const createOrder = createAsyncThunk(
  "order/createOrder",
  async ({ tableNumber, orderItems, orderType }, { rejectWithValue }) => {
    try {
      const orderPayload = {
        orderItems,
        orderType,
        ...(orderType === "dine-in" ? { tableNumber } : {}),
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

// Initial state
const initialState = {
  currentOrder: null,
  loading: false,
  error: false,
  success: false,
};

// Order slice
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearOrderError: (state) => {
      state.error = false;
    },
    clearOrderSuccess: (state) => {
      state.success = false;
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
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
      });
  },
});

export const { clearOrderError, clearOrderSuccess, clearCurrentOrder } =
  orderSlice.actions;
export default orderSlice.reducer;
