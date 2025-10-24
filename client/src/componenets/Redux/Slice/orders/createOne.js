// src/redux/slices/ordersSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// API URL
const API_URL = 'http://localhost/api/orders/neworders';

// Async thunk to create a new order
export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, orderData,{withCredentials:true});
      return response.data;
    } catch (err) {
        console.log(err.response.data);
        
      return rejectWithValue(err.response?.data || 'Something went wrong');
    }
  }
);

// Initial state
const initialState = {
  orders: [],
  loading: false,
  error: null,
  success: false,
};

// Slice
const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.push(action.payload);
        state.success = true;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetStatus } = ordersSlice.actions;
export default ordersSlice.reducer;
