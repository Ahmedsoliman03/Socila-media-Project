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
 
export const ChangePassword = createAsyncThunk("pass/ChangePassword", async (values: ChangePass , {rejectWithValue}) => {
    try {
        const { data } = await axios.patch("https://linked-posts.routemisr.com/users/change-password", values, {
              headers:{
            token:localStorage.getItem("token")
        }
        })
        return data;

        
    }
    catch (error:any) {        
        return rejectWithValue(error.response.data.error)
    }
})


const ChangePasswordSlice = createSlice({
    name: "pass",
    initialState,
    reducers: {},
    extraReducers: (builder) => { 
        builder.addCase(ChangePassword.pending, (state) => { 
            state.isloading = true;
            state.error = "";
        })
        builder.addCase(ChangePassword.rejected, (state , action) => {
            state.error = action.payload
                        state.isloading = false;
        })
        builder.addCase(ChangePassword.fulfilled, (state, action) => {
              if (action.payload?.token) {
        localStorage.setItem('token', action.payload.token);
    }
            state.message = action.payload.message
            console.log(action.payload.message)
                state.isloading = false;


         })
    }
})
export const PassReducer = ChangePasswordSlice.reducer
