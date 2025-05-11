import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    // Add more reducers here as your app grows
  },
  // Redux Thunk is included by default in configureStore
});

export default store;
