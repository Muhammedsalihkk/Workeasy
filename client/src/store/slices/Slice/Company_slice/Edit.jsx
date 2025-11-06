import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const edit_Company_Profile = createAsyncThunk("company/editProfile", async (formData, thunkAPI) => {
  try {
    console.log("form",formData);
    
    const response = await axios.put(`http://localhost/api/companies`,formData, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data || "Something went wrong");
  }
});

const Company_edit_slice = createSlice({
  name: "company_profile",
  initialState: {
    Editloading: false,
    error: null,
    edit_response: null, 
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(edit_Company_Profile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(edit_Company_Profile.fulfilled, (state, action) => {
        state.edit_response = action.payload;
        state.loading = false;
      })
      .addCase(edit_Company_Profile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default Company_edit_slice.reducer;
