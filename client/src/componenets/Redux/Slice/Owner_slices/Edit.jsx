import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const Owner_edit = createAsyncThunk("Owner/edit", async (data,thunkAPI) => {
    try {
        console.log(data);
        
        const response = await axios.put(`http://localhost/auth/owner/edit_profile`,data, {
            withCredentials: true
        })
        return response.data
    }
    catch(error){
        console.log(error.response.data);
        
        return thunkAPI.rejectWithValue(error.response.data||"somthing wrong")
    }
})

const Owner_edit_slice=createSlice({
    name:"owner_login",
    initialState:{
        owner_Edit_response:"",
        Editloading:false,
        Editerror:null
    },
    reducers:{
        clearerror:(state)=>{
            state.Editerror=""
        }
    },
    extraReducers:(builder)=>{
            builder
                .addCase(Owner_edit.pending,(state)=>{
                    state.loading=true
                })
                .addCase(Owner_edit.fulfilled,(state,action)=>{
                    state.owner_Edit_response=action.payload,
                    state.Editloading=false
                })
                .addCase(Owner_edit.rejected,(state,action)=>{
                    state.Editerror=action.payload,
                    state.Editloading=false
                })
         }   
})

export const {clearerror}=Owner_edit_slice.actions
export default Owner_edit_slice.reducer