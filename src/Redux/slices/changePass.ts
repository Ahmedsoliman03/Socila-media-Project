import { ChangePass } from './../../app/interfaces/changePass';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios';


const initialState = {
    password: "",
    newPassword: "",
    isloading: false,
    error: "",
    message: "",
}
 
export const ChangePassword = createAsyncThunk("pass/ChangePassword", async (values: ChangePass) => {
    try {
        const { data } = await axios.patch("https://linked-posts.routemisr.com/users/change-password", values, {
              headers:{
            token:localStorage.getItem("token")
        }
        })
        return data;

        
    }
    catch(err : any) {
        console.log(err.message);
        
    }
})


const ChangePasswordSlice = createSlice({
    name: "pass",
    initialState,
    reducers: {},
    extraReducers: (builder) => { 
        builder.addCase(ChangePassword.pending, (state) => { 
            state.isloading = true;
        })
        builder.addCase(ChangePassword.rejected, (state) => {
            state.isloading = false;
        })
        builder.addCase(ChangePassword.fulfilled, (state, action) => {
              if (action.payload?.token) {
        localStorage.setItem('token', action.payload.token);
    }
    state.isloading = false;
            state.message = action.payload.message

         })
    }
})
export const PassReducer = ChangePasswordSlice.reducer
