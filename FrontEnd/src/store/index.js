import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import tableReducer from "./tableSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    table: tableReducer,
    // Add more reducers here as your app grows
  },
  // Redux Thunk is included by default in configureStore
});

export default store;
