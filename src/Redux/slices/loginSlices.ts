import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoginData } from "@/app/interfaces/login";
import axios from "axios";

const initialState = {
    token:localStorage.getItem('token') , 
    isLoading:false,
    error:"",
    isSuccess:false,
    checkStatus : "",
}

export const login = createAsyncThunk('auth/login'  , async(values : LoginData , { rejectWithValue })=>{
    try{
        const {data} = await axios.post('https://linked-posts.routemisr.com/users/signin', values)
        console.log(data.message);
        
        return data
    }
    catch (err:any) {
      return rejectWithValue(err.response?.data.error);
      
 }
})

const authSlice = createSlice({
    name: "auth",
    initialState ,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.pending , (state )=>{
          state.isLoading = true;
          state.isSuccess = false;
          state.error = "";
        })
        builder.addCase(login.rejected , (state , action )=>{
          state.isLoading = false;
          state.isSuccess = false;
          state.error = action.payload || "incorrect email or password";       
        })
        builder.addCase(login.fulfilled , (state , action)=>{
         state.isLoading = false;
        state.isSuccess = true;
        state.token = action.payload.token;
        state.checkStatus = action.payload.message;
        localStorage.setItem('token', action.payload.token);
          state.error = "";          


        })
    },
})
export const authReducer = authSlice.reducer 