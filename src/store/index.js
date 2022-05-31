import { configureStore } from "@reduxjs/toolkit";
import userDataReducer from "../slices/userDataSlice";

const store = configureStore({
  reducer: {
    userData: userDataReducer,
  },
});
export default store;