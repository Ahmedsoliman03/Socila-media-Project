"use client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { storeDispatch, storeState } from '@/Redux/store';
import { getPostts } from "@/Redux/slices/allPosts";
import Loading from "./loading";

export default function Home(){
  let {posts , isloading}= useSelector((state:storeState)=>state.postReducer)
  let {push} = useRouter()
  let dispatch = useDispatch<storeDispatch>()
  useEffect(()=>{
    if(!localStorage.getItem("token")){
      push("/login")
    }
    else{
      dispatch(getPostts())
    }
  },[])
  return (
    <>
    {isloading? <Loading/> :  <h1>Home page</h1>}
   
    </>
  )
}