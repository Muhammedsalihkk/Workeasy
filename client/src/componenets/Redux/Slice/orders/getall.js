import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to get all orders
export const get_all_orders = createAsyncThunk(
  "order/getAll",
  async (query, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost/api/orders/getAllorders",{withCredentials:true,params: query});
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const order_slice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(get_all_orders.pending, (state) => {
        state.loading = true;
      })
      .addCase(get_all_orders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(get_all_orders.rejected, (state, action) => {
        state.loading = false;
       
        
        state.error = action.payload;
      });
  },
});

export default order_slice.reducer;
