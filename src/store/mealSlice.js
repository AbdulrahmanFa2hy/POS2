import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";
import { API_ENDPOINTS } from "../utils/constants";

// Async thunk for fetching meals
export const fetchMeals = createAsyncThunk(
  "meals/fetchMeals",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_ENDPOINTS.MEALS}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch meals" }
      );
    }
  }
);

// Initial state
const initialState = {
  meals: [],
  loading: false,
  error: null,
  selectedMeal: null,
};

// Meals slice
const mealSlice = createSlice({
  name: "meals",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchMeals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMeals.fulfilled, (state, action) => {
        state.loading = false;
        state.meals = action.payload.data || [];
      })
      .addCase(fetchMeals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch meals";
      });
  },
});

export const { selectMeal, clearMealError } = mealSlice.actions;
export default mealSlice.reducer;
