import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";
import { API_ENDPOINTS } from "../utils/constants";

// Async thunk for fetching all payments
export const fetchAllPayments = createAsyncThunk(
  "payment/fetchAllPayments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(API_ENDPOINTS.PAYMENT);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch payments" }
      );
    }
  }
);

// Async thunk for processing payment
export const processPayment = createAsyncThunk(
  "payment/processPayment",
  async ({ orderId, paymentMethods, tax, discount }, { rejectWithValue }) => {
    try {
      const response = await api.post(API_ENDPOINTS.PAYMENT, {
        orderId,
        paymentMethods,
        tax,
        discount,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to process payment" }
      );
    }
  }
);

const initialState = {
  payments: [],
  loading: false,
  error: null,
  success: false,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    clearPaymentError: (state) => {
      state.error = null;
    },
    clearPaymentSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All Payments
      .addCase(fetchAllPayments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = action.payload.data || [];
      })
      .addCase(fetchAllPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch payments";
      })
      // Process Payment
      .addCase(processPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(processPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        // Add the new payment to the payments array
        if (action.payload.data) {
          state.payments.push(action.payload.data);
        }
      })
      .addCase(processPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to process payment";
        state.success = false;
      });
  },
});

export const { clearPaymentError, clearPaymentSuccess } = paymentSlice.actions;
export default paymentSlice.reducer;
