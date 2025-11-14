import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for fetching user profile
export const user_profile_get = createAsyncThunk(
  "user_profile/get",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost/auth/user/get_profile", {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message || "Failed to fetch profile"
      );
    }
  }
);

const user_profile_slice = createSlice({
  name: "user_profile",
  initialState: {
    user_profile_response: "",
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(user_profile_get.pending, (state) => {
        state.loading = true;
      })
      .addCase(user_profile_get.fulfilled, (state, action) => {
        state.user_profile_response = action.payload;
        state.loading = false;
      })
      .addCase(user_profile_get.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default user_profile_slice.reducer;
