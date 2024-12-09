import React from 'react'
import "./loading.css"
import { Box, Typography } from '@mui/material'
export default function Loading() {
  return (
    <Box sx={{display:"flex" , justifyContent:"center" , alignItems:"center"}}>
    <Typography sx={{fontSize:"50px"}} className="loader">Loading</Typography>   
    
        </Box>
  )
}
