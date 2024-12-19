"use client";
import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import {
  TextField,
  Typography,
  Button,
  Box,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useFormik } from "formik";
import { LoginData } from "./../interfaces/login";
import * as yup from "yup";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/Redux/slices/loginSlices";
import { storeDispatch, storeState } from "@/Redux/store";
import { useRouter } from "next/navigation";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Link from "next/link";
import Cookies from "universal-cookie";

export default function Login() {
  const [showPass, setShowPass] = useState(false);
  const cookies = new Cookies();

  const name = cookies.get("name");

  const initialValues: LoginData = {
    email: "",
    password: "",
  };
  const validationSchema = yup.object().shape({
    email: yup.string().email("email is invalid").required("email is required"),
    password: yup
      .string()
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Password must be at least 8 characters and include at least one uppercase letter, one lowercase letter, one number, and one special character"
      )
      .required("repassword is required"),
  });
  const dispatch = useDispatch<storeDispatch>();
  const { isLoading } = useSelector((state: storeState) => state.authReducer);
  const { push } = useRouter();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      push("/");
    } else {
      push("/login");
    }
  }, [push]);
  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      await dispatch(login(values));
      if (localStorage.getItem("token") == "undefined") {
        push("/login");
        toast.error("Email or password is incorrect");
      } else if (!cookies.get("name")) {
        toast.success(`Welcome`);
        push("/");
      } else {
        toast.success(`Welcome ${name}`);
        push("/");
      }
    },
    validationSchema,
  });

  const togglePasswordVisibility = () => {
    setShowPass(!showPass);
  };
  return (
    <>
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
            Login Now
          </Typography>
          <form
            onSubmit={formik.handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <TextField
              value={formik.values.email}
              onChange={formik.handleChange}
              id="email"
              label="email"
              type="text"
              variant="standard"
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              fullWidth
            />
            <Box>
              <TextField
                value={formik.values.password}
                onChange={formik.handleChange}
                id="password"
                label="password"
                type={showPass ? "text" : "password"}
                variant="standard"
                fullWidth
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
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
            <Button
              disabled={isLoading}
              type="submit"
              variant="contained"
              sx={{ my: 2 }}
            >
              {isLoading ? <CircularProgress color="inherit" /> : "Login"}
            </Button>
            {/* <h1>{t('welcome')}</h1> */}
            <Link href="/register">
              <Typography sx={{ color: "#09c", textDecoration: "underline" }}>
                Register
              </Typography>
            </Link>
          </form>
        </Paper>
      </Container>
    </>
  );
}
