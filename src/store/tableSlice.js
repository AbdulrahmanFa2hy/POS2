import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";
import { API_ENDPOINTS } from "../utils/constants";

// Async thunk for fetching tables
export const fetchTables = createAsyncThunk(
  "table/fetchTables",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(API_ENDPOINTS.TABLES);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch tables" }
      );
    }
  }
);

// Async thunk for reserving a table
export const reserveTable = createAsyncThunk(
  "table/reserveTable",
  async ({ tableId, customerName, orderDetails }, { rejectWithValue }) => {
    try {
      // In a real app, you would make an API call here
      // For now, we're just simulating success
      return {
        success: true,
        tableId,
        customerName,
        orderDetails,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to reserve table" }
      );
    }
  }
);

// Initial state
const initialState = {
  tables: [],
  loading: false,
  error: null,
  selectedTable: null,
  reservations: [],
  reservationLoading: false,
  reservationError: null,
};

// Table slice
const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    selectTable: (state, action) => {
      state.selectedTable = action.payload;
    },
    clearTableError: (state) => {
      state.error = null;
    },
    clearSelectedTable: (state) => {
      state.selectedTable = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch tables
      .addCase(fetchTables.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTables.fulfilled, (state, action) => {
        state.loading = false;
        state.tables = action.payload.data || [];
      })
      .addCase(fetchTables.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch tables";
      })

      // Reserve table
      .addCase(reserveTable.pending, (state) => {
        state.reservationLoading = true;
        state.reservationError = null;
      })
      .addCase(reserveTable.fulfilled, (state, action) => {
        state.reservationLoading = false;

        // If a real API implementation, you might want to update the table status here
        // For now, we'll just add to reservations array
        state.reservations.push({
          tableId: action.payload.tableId,
          customerName: action.payload.customerName,
          orderDetails: action.payload.orderDetails,
          timestamp: new Date().toISOString(),
        });

        // Update the table status to inProgress or similar in a real implementation
        const tableIndex = state.tables.findIndex(
          (table) =>
            table.id === action.payload.tableId ||
            table._id === action.payload.tableId
        );

        if (tableIndex !== -1) {
          state.tables[tableIndex].status = "inProgress";
        }
      })
      .addCase(reserveTable.rejected, (state, action) => {
        state.reservationLoading = false;
        state.reservationError =
          action.payload?.message || "Failed to reserve table";
      });
  },
});

// Export actions and reducer
export const { selectTable, clearTableError, clearSelectedTable } =
  tableSlice.actions;
export default tableSlice.reducer;
