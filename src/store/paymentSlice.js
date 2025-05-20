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

const initialState = {
  payments: [],
  loading: false,
  error: null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
      });
  },
});

export default paymentSlice.reducer;
