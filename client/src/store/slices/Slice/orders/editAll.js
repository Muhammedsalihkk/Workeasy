// Redux/Slice/orders/massEdit.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for bulk update
export const massEditTransactions = createAsyncThunk(
  "orders/massEditTransactions",
  async ({ ids, updates }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        "http://localhost/api/orders/orderBulk",
        { ids, updates },
        { withCredentials: true }
      );
      return response.data; // whatever your backend returns
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const massEditSlice = createSlice({
  name: "massEdit",
  initialState: {
    loading: false,
    success: false,
    error: null,
    data: null,
  },
  reducers: {
    resetMassEdit: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(massEditTransactions.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(massEditTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.data = action.payload;
      })
      .addCase(massEditTransactions.rejected, (state, action) => {
        console.log(action.payload);
        
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { resetMassEdit } = massEditSlice.actions;
export default massEditSlice.reducer;
