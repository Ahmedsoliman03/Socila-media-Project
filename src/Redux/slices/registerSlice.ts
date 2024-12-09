import { RegisterData } from "@/app/interfaces/register"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

let initialState = {
    isLoading:false,
    error:'',
    isSuccess:false,
}

export let signup = createAsyncThunk('auth/signup' , async(values: RegisterData)=>{
    try{
        const {data} = await axios.post('https://linked-posts.routemisr.com/users/signup' , values )
        console.log(data);
        return data
        
    //     toast.success(data.message)
    // //     setTimeout(() => {
    // // router.push('/login')
    // //     },5000)
      }
      catch(err : any){
console.log(err.response?.data?.error)
    }
})
let authSlice = createSlice({
    name: "auth",
    initialState ,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(signup.pending , (state , action)=>{
          state.isLoading = true 
        })
        builder.addCase(signup.rejected , (state , action)=>{
          state.isLoading = false       
        })
        builder.addCase(signup.fulfilled , (state , action)=>{
          state.isLoading = false , 
          state.isSuccess = true , 
          state.error = action.payload
          console.log(action.payload)
          


        })
    },
})
export let authReducer = authSlice.reducer 