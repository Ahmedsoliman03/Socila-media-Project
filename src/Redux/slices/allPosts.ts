import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Post } from './../../app/interfaces/allPosts';
import axios from "axios";

let initialState:{posts:Post[] , isloading:boolean} = {
    posts:[],
    isloading:false,
}
export let getPostts = createAsyncThunk('posts/getPosts' , async()=>{
    let {data} = await axios.get("https://linked-posts.routemisr.com/posts?limit=50" , {
        headers:{
            token:localStorage.getItem("token")
        }
    })
    console.log(data.posts)
    return data.posts;
})
let allPosts = createSlice({
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
export let postReducer = allPosts.reducer