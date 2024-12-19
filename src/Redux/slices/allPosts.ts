import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Post } from './../../app/interfaces/allPosts';
import axios from "axios";

const initialState:{posts:Post[] , isloading:boolean} = {
    posts:[],
    isloading:false,
}
export const getPostts = createAsyncThunk('posts/getPosts' , async()=>{
    const {data} = await axios.get("https://linked-posts.routemisr.com/posts?limit=20" , {
        headers:{
            token:localStorage.getItem("token")
        }
    })
    console.log(data.posts)
    return data.posts;
})
const allPosts = createSlice({
name:"posts",
initialState,
reducers:{},
extraReducers(builder){
builder.addCase(getPostts.pending , (state)=>{
    state.isloading= true
})
builder.addCase(getPostts.fulfilled , (state , action)=>{
    state.isloading= false
    state.posts= action.payload
})
}
})
export const postReducer = allPosts.reducer