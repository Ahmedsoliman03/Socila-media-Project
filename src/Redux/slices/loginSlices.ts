import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoginData } from "@/app/interfaces/login";
import axios from "axios";

const initialState = {
    token:localStorage.getItem('token') , 
    isLoading:false,
    error:'',
    isSuccess:false,
    checkStatus : "",
}

export const login = createAsyncThunk('auth/login'  , async(values : LoginData)=>{
    try{
        const {data} = await axios.post('https://linked-posts.routemisr.com/users/signin', values)
        console.log(data.message);
        
        return data
    }
 catch{
return null;
 }
})

const authSlice = createSlice({
    name: "auth",
    initialState ,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.pending , (state )=>{
          state.isLoading = true 
        })
        builder.addCase(login.rejected , (state )=>{
          state.isLoading = false       
        })
        builder.addCase(login.fulfilled , (state , action)=>{
          state.isLoading = false , 
          state.isSuccess = true , 
          state.token = action.payload.token
          state.checkStatus = action.payload.message; // Storing message
          console.log("Login successful:", action.payload.message);
          localStorage.setItem('token' , action.payload.token)
          state.error = action.payload
          console.log(action.payload)
          


        })
    },
})
export const authReducer = authSlice.reducer 