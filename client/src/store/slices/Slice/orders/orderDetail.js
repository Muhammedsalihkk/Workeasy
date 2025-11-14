import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// Fetch single order by id
export const fetchOrderById = createAsyncThunk(
  'order_detail/fetchById',
  async (id, thunkAPI) => {
    try {
      const res = await axios.get(`http://localhost/api/orders/${id}`,{withCredentials:true})
      console.log(res.data);
      
      return res.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message)
    }
  }
)

// Update order
export const updateOrder = createAsyncThunk(
  'order_detail/update',
  async ({ id, payload }, thunkAPI) => {
    try {
      const res = await axios.put(`http://localhost/api/orders/${id}`, payload,{withCredentials:true})
      return res.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message)
    }
  }
)

// Delete order
export const deleteOrder = createAsyncThunk(
  'order_detail/delete',
  async (id, thunkAPI) => {
    try {
      const res = await axios.delete(`http://localhost/api/orders/${id}`)
      return res.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message)
    }
  }
)

const slice = createSlice({
  name: 'order_detail',
  initialState: {
    order: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false
        state.order = action.payload
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(updateOrder.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.loading = false
        state.order = action.payload
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false
        // mark as deleted locally
        if (state.order && state.order._id === action.meta.arg) {
          state.order.isDelete = true
        }
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default slice.reducer
