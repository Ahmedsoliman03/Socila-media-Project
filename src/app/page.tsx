"use client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Home(){
  let {push} = useRouter()
  useEffect(()=>{
    if(!localStorage.getItem("token")){
      push("/login")
    }
  })
  return (
    <>
    <h1>Home page</h1>
    </>
  )
}