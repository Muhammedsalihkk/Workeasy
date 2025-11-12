import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllUsers = createAsyncThunk(
  "user/getall",
  async ({ search, status, department, role, page, limit } = {}, thunkAPI) => {
    try {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (status) params.append("status", status);
      if (department) params.append("department", department);
      console.log(role);
      
      if (role) params.append("company_role", role);
      if (page) params.append("page", page.toString());
      if (limit) params.append("limit", limit.toString());

      const response = await axios.get(
        `http://localhost/auth/user/getall?${params.toString()}`,
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        (error.response && error.response.data) || "Failed to fetch users"
      );
    }
  }
);

const getAllUsersSlice = createSlice({
  name: "user_getall",
  initialState: {
    users: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default getAllUsersSlice.reducer;
