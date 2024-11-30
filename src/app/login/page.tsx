"use client"
import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import { TextField, Typography , Button } from '@mui/material'
import { useFormik } from 'formik'
import { LoginData } from './../interfaces/login';
import * as yup from "yup";
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'
import { login } from '@/Redux/slices/loginSlices'
import { storeDispatch, storeState } from '@/Redux/store'
import { useRouter } from 'next/navigation'

export default function Login() {
  let initialValues :LoginData =  {
    email:"", 
    password:""
  }
  let validationSchema = yup.object().shape({
    email: yup.string().email("email is invalid").required("email is required"),
    password:yup.string().matches(
       /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Password must be at least 8 characters and include at least one uppercase letter, one lowercase letter, one number, and one special character"
    ).required("repassword is required")
  })
const dispatch = useDispatch<storeDispatch>()
let {isLoading , isSuccess , error , token}=useSelector((state : storeState)=>state.authReducer)
let {push} = useRouter()
  let formik= useFormik({
    initialValues ,
    onSubmit : async (values)=>{
      await dispatch(login(values))
      if(localStorage.getItem('token') == "undefined"){
        toast.error(error)
      }
if(isSuccess && localStorage.getItem('token') !== "undefined"){
push('/')
}
else{
  push('/login')
}
    } , 
    validationSchema ,
  })

  useEffect(()=>{
if(localStorage.getItem('token') ){
  push('/')
}
  },[])
  return (
    <>
    <Container maxWidth="sm">
      <Paper elevation={5} sx={{p:2 , my:2}}>
      <Typography component="h1" sx={{my:2 , fontSize:"30px" , fontWeight:"bold" , textAlign:"center"}}>Login Now</Typography>
<form onSubmit={formik.handleSubmit} style={{display:"flex" , flexDirection:"column" , gap:"20px"}}>
<TextField 
value={formik.values.email} 
onChange={formik.handleChange} 
id="email" 
label="email" 
type='text' 
variant="standard" 
onBlur={formik.handleBlur}
      error={formik.touched.email && Boolean(formik.errors.email)}
      helperText={formik.touched.email && formik.errors.email}
fullWidth />

      <TextField value={formik.values.password} 
      onChange={formik.handleChange} 
      id="password" 
      label="password" 
      type='password' 
      variant="standard" 
      fullWidth
      onBlur={formik.handleBlur}
      error={formik.touched.password && Boolean(formik.errors.password)}
      helperText={formik.touched.password && formik.errors.password}
      
      />
      <Button disabled={isLoading} type='submit' variant="contained" sx={{my:2}}>
        {isLoading?<CircularProgress color="inherit"/> : "Login"}
      </Button>

</form>
      </Paper>
    </Container>
    </>
  )
}
