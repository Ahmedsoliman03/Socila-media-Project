import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoginData } from "@/app/interfaces/login";
import axios from "axios";

let initialState = {
    token:localStorage.getItem('token') , 
    isLoading:false,
    error:'',
    isSuccess:false
}

export let login = createAsyncThunk('auth/login'  , async(values : LoginData)=>{
    try{
        let {data} = await axios.post('https://linked-posts.routemisr.com/users/signin', values)
        return data
    }
 catch(err: any){
return err.response.data.error;
 }
})

let authSlice = createSlice({
    name: "auth",
    initialState ,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.pending , (state , action)=>{
          state.isLoading = true 
        })
        builder.addCase(login.rejected , (state , action)=>{
          state.isLoading = false       
        })
        builder.addCase(login.fulfilled , (state , action)=>{
          state.isLoading = false , 
          state.isSuccess = true , 
          state.token = action.payload.token
          localStorage.setItem('token' , action.payload.token)
          state.error = action.payload
          console.log(action.payload)
          


        })
    },
})
export let authReducer = authSlice.reducer 