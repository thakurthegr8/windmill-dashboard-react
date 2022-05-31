import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const fetchURL = "https://hirebus-backend.herokuapp.com/getData";

export const getUsersData = createAsyncThunk(
  "user_data/getUsersData",
  async () => {
    try {
      const response = await axios.post(fetchURL);
      const userData = await response.data;
      if (userData) {
        return userData;
      }
    } catch (error) {
      console.log(error);
    }
  }
);

const userDataSlice = createSlice({
  name: "user_data",
  initialState: {
    numberValue: 0,
    data: [],
    status: null,
    flag: null,
  },
  extraReducers: {
    [getUsersData.pending]: (state) => {
      state.status = "pending";
    },
    [getUsersData.fulfilled]: (state, action) => {
      const result = action.payload;
      state.numberValue = result.number;
      if (result.number % 2 === 0) {
        state.data = result.data;
        state.flag = "new data";
      } else {
        state.flag = "old data";
      }
      if (state.data.length === 0) {
        state.data = result.data;
      }
      state.status = "success";
    },
    [getUsersData.rejected]: (state) => {
      state.status = "failed";
    },
  },
});

export default userDataSlice.reducer;
