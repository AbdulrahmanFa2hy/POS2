import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import tableReducer from "./tableSlice";
import mealReducer from "./mealSlice";
import orderReducer from "./orderSlice";
import paymentReducer from "./paymentSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    table: tableReducer,
    meals: mealReducer,
    order: orderReducer,
    payment: paymentReducer,
  },
});

export default store;
