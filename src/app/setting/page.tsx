"use client";
import { ChangePassword } from "@/Redux/slices/changePass";
import { storeState } from "@/Redux/store";
import * as yup from "yup";
import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChangePass } from "../interfaces/changePass";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { Visibility, VisibilityOff } from "@mui/icons-material";
export default function CreateNewPassword() {
  const [showPass, setShowPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);

  const dispatch = useDispatch();
  const { isloading, message, error } = useSelector(
    (state: storeState) => state.PassReducer
  );
  const initialValues: ChangePass = {
    password: "",
    newPassword: "",
  };
  const validationSchema = yup.object().shape({
    newPassword: yup
      .string()
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Password must be at least 8 characters and include at least one uppercase letter, one lowercase letter, one number, and one special character"
      )
      .required("repassword is required"),
  });
  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      await dispatch(ChangePassword(values));
      if (message == "success") {
        toast.success(" correct");
      } else {
        toast.error(error || "Current Password is incorrect");
      }
    },
    validationSchema,
  });
  const togglePasswordVisibility = () => {
    setShowPass(!showPass);
  };
  const toggleNewPasswordVisibility = () => {
    setShowNewPass(!showNewPass);
  };
  return (
    <div>
      <Container maxWidth="sm">
        <Paper elevation={5} sx={{ p: 2, my: 2 }}>
          <Typography
            component="h1"
            sx={{
              my: 2,
              fontSize: "30px",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Change Your Password
          </Typography>
          <form
            onSubmit={formik.handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <TextField
              value={formik.values.password}
              onChange={formik.handleChange}
              id="password"
              label="Current Password"
              type={showPass ? "text" : "password"}
              variant="standard"
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              fullWidth
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
            <Box>
              <TextField
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                id="newPassword"
                label="New Password"
                type={showNewPass ? "text" : "password"}
                variant="standard"
                fullWidth
                onBlur={formik.handleBlur}
                error={
                  formik.touched.newPassword &&
                  Boolean(formik.errors.newPassword)
                }
                helperText={
                  formik.touched.newPassword && formik.errors.newPassword
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={toggleNewPasswordVisibility}
                        edge="end"
                      >
                        {showNewPass ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Button
              disabled={isloading}
              type="submit"
              variant="contained"
              sx={{ my: 2 }}
            >
              Change Password
            </Button>
            {/* <h1>{t('welcome')}</h1> */}
            {/* <Link href="/register">
              <Typography sx={{ color: "#09c", textDecoration: "underline" }}>
                Register
              </Typography>
            </Link> */}
          </form>
        </Paper>
      </Container>
    </div>
  );
}
