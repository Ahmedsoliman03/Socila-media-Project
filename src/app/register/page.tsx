"use client"
import React, { useState } from 'react'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import { TextField, Typography, Button, Box, IconButton, InputAdornment, RadioGroup, FormControlLabel, Radio, FormLabel } from '@mui/material'
import { useFormik } from 'formik'
import * as yup from "yup"
import CircularProgress from '@mui/material/CircularProgress'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useTranslation } from 'next-i18next'
import dayjs from 'dayjs'

export default function Register() {
  const [showPass, setShowPass] = useState(false)
  const [showRePass, setShowRePass] = useState(false)
  const [t] = useTranslation()

  let initialValues = {
    name: '',
    email: '',
    password: '',
    rePassword: '',
    dateOfBirth: '', // Date of birth managed by Formik
    gender: ''
  }

  let validationSchema = yup.object().shape({
    name: yup.string()
      .matches(/^[a-zA-Z\s]+$/, "Please enter a valid name using only letters and spaces.")
      .required(t('name is required')),
    email: yup.string()
      .email(t('please enter a valid email'))
      .required('email is required'),
    password: yup.string()
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Password must be at least 8 characters and include at least one uppercase letter, one lowercase letter, one number, and one special character"
      )
      .required("Password is required"),
    rePassword: yup.string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required("Repassword is required"),
    dateOfBirth: yup.string()
      .required(t('date of birth is required')),
    gender: yup.string()
      .required(t('gender is required'))
  })

  let formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
        console.log(values);

      }
      
  })

  const togglePasswordVisibility = () => setShowPass(!showPass)
  const toggleRePasswordVisibility = () => setShowRePass(!showRePass)

  return (
    <>
      <Container maxWidth="sm">
        <Paper elevation={5} sx={{ p: 2, my: 2 }}>
          <Typography component="h1" sx={{ my: 2, fontSize: "30px", fontWeight: "bold", textAlign: "center" }}>
            Register Now
          </Typography>
          <form  onSubmit={formik.handleSubmit}  style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* Name */}
            <TextField
              value={formik.values.name}
              onChange={formik.handleChange}
              id="name"
              label="Name"
              type='text'
              variant="standard"
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              fullWidth
            />
            {/* Email */}
            <TextField
              value={formik.values.email}
              onChange={formik.handleChange}
              id="email"
              label="Email"
              type='text'
              variant="standard"
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              fullWidth
            />
            {/* Password */}
            <Box>
              <TextField
                value={formik.values.password}
                onChange={formik.handleChange}
                id="password"
                label="Password"
                type={showPass ? "text" : "password"}
                variant="standard"
                fullWidth
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility} edge="end">
                        {showPass ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            {/* Confirm Password */}
            <Box>
              <TextField
                value={formik.values.rePassword}
                onChange={formik.handleChange}
                id="rePassword"
                label="Repassword"
                type={showRePass ? "text" : "password"}
                variant="standard"
                fullWidth
                onBlur={formik.handleBlur}
                error={formik.touched.rePassword && Boolean(formik.errors.rePassword)}
                helperText={formik.touched.rePassword && formik.errors.rePassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={toggleRePasswordVisibility} edge="end">
                        {showRePass ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            {/* Date of Birth */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
  <DatePicker
    label="Date of Birth"
    value={formik.values.dateOfBirth ? dayjs(formik.values.dateOfBirth) : null}
    onChange={(newValue) => {
      formik.setFieldValue('dateOfBirth', newValue ? newValue.toISOString() : '');
    }}
    onBlur={formik.handleBlur} // Explicitly set touched
    renderInput={(params) => (
      <TextField    
        {...params}
        fullWidth
        error={formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)}
        helperText={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
      />
    )}
  />
</LocalizationProvider>
{/* Gender */}
<FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
<RadioGroup
    aria-labelledby="demo-radio-buttons-group-label"
    name="radio-buttons-group"
    aria-label='Gender'
    row
    onBlur={() => formik.setFieldTouched('gender', true)} // Explicitly set touched

  >
        <FormControlLabel value="male" control={<Radio />} label="Male" onChange={(e)=>   formik.setFieldValue('gender',e.target.value)}/>
    <FormControlLabel value="female" control={<Radio />} label="Female" onChange={(e)=>   formik.setFieldValue('gender',e.target.value)}/>
  </RadioGroup>
  {formik.touched.gender && formik.errors.gender && (
  <Typography color="error">{formik.errors.gender}</Typography>
)}

            <Button  type='submit'  variant="contained" sx={{ my: 2 }}>
            Register
                        </Button>
          </form>
        </Paper>
      </Container>
    </>
  )
}
