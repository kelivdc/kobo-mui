"use client";
import MuiLayout from "@/components/MuiLayout";
import {
  Alert,
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { signIn } from 'next-auth/react'
import { useRouter } from "next/navigation";

function Login() {
  const [errMessage, setErrMessage] = useState('')
  const router = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    setLoading(true);
    setErrMessage('');
    try {
      const hasil = await signIn('credentials', {
        username: data.username,
        password: data.password,
        redirect: false
      })
      if (hasil.error) {
        setErrMessage('Wrong username or password')
        setLoading(false)
      } else {
        router.push('/cms/dashboard')
      }
    } catch (error) {
      alert(error)
    }
  };
  const [loading, setLoading] = useState(false);
  return (
    <MuiLayout>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Card
          sx={{
            minWidth: "250px",
            maxWidth: "350px",
            padding: "15px",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
          }}
        >
          <Typography
            textAlign="center"
            variant="h6"
            sx={{
              paddingY: "10px",
            }}
          >
            LOGIN
          </Typography>
          <CardContent>
            <Box
              component="form"
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit(onSubmit)}
            >
              <TextField
                sx={{ mb: 2 }}
                label="Username"
                fullWidth
                required
                size="small"
                error={!!errors["username"]}
                helperText={
                  errors["username"] ? errors["username"].message : ""
                }
                {...register("username", { required: true })}
              />
              <TextField
                sx={{ mb: 2 }}
                label="Password"
                fullWidth
                required
                size="small"
                type="password"
                error={!!errors["password"]}
                helperText={
                  errors["password"] ? errors["password"].message : ""
                }
                {...register("password", { required: true })}
              />
              <LoadingButton
                type="submit"
                variant="contained"
                loading={loading}
                sx={{ mt: "1rem" }}
                fullWidth
              >
                Login
              </LoadingButton>
            </Box>
            {errMessage && (
              <Alert sx={{mt: 4}} severity="error">{errMessage}</Alert>
            )}
          </CardContent>
        </Card>
      </Box>
    </MuiLayout>
  );
}

export default Login;
