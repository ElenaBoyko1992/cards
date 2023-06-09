import React, { useEffect, useState } from "react";
import { useAppDispatch } from "common/hooks";
import { authThunks } from "features/auth/auth.slice";
import s from "features/auth/login/Auth.module.css";
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Paper,
  TextField,
} from "@mui/material";
import { Field, FormikProvider, useFormik } from "formik";
import { NavLink, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAppSelector } from "common/hooks";

export const Login = () => {
  const dispatch = useAppDispatch();

  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();

  //code for password field
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const formik = useFormik({
    validate: (values) => {
      if (!values.email) {
        return {
          email: "Email is required",
        };
      }
      if (!values.password) {
        return {
          password: "Password is required",
        };
      }
    },
    initialValues: {
      email: "2Boyko@mail.ru",
      password: "1qazxcvBG",
      rememberMe: false,
    },
    onSubmit: (values, formikHelpers) => {
      //email: "2Boyko@mail.ru", password: "1qazxcvBG"
      dispatch(authThunks.login(values));
    },
  });

  useEffect(() => {
    if (isLoggedIn) {
      return navigate("/packs");
    }
  }, [isLoggedIn]);

  return (
    <Grid container justifyContent={"center"} alignItems={"center"} className={s.container}>
      <Paper className={s.authWindow}>
        <h1>Sign in</h1>
        <FormikProvider value={formik}>
          <form action="" onSubmit={formik.handleSubmit} className={s.form}>
            <TextField variant="standard" {...formik.getFieldProps("email")} label={"Email"} margin="normal" />
            {formik.touched.email && formik.errors.email ? (
              <div className={s.formError}>{formik.errors.email}</div>
            ) : null}

            <FormControl variant="standard" margin={"normal"}>
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <Input
                id="standard-adornment-password"
                {...formik.getFieldProps("password")}
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            {formik.touched.password && formik.errors.password ? (
              <div className={s.formError}>{formik.errors.password}</div>
            ) : null}
            <label className={s.checkbox}>
              <Field type="checkbox" name="rememberMe" />
              <span>{`Remember me`}</span>
            </label>
            <NavLink to={"/forgot-password"} className={s.forgotPassword}>
              Forgot Password?
            </NavLink>
            <Button
              variant="contained"
              type="submit"
              style={{
                borderRadius: "30px",
                marginBottom: "30px",
                textTransform: "none",
                fontFamily: `'Montserrat', 'sans-serif'`,
                fontSize: "16px",
              }}
            >
              Sign In
            </Button>
            <div className={s.haveAccount}>Don`t have an account?</div>
            <NavLink to={"/register"} className={s.registerLink}>
              Sign Up
            </NavLink>
          </form>
        </FormikProvider>
      </Paper>
    </Grid>
  );
};
