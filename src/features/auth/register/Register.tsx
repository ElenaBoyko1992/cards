import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
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
import { FormikProvider, useFormik } from "formik";
import { NavLink, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export const Register = () => {
  const dispatch = useAppDispatch();
  const isRegistered = useAppSelector((state) => state.auth.isRegistered);
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
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        return {
          email: "Invalid email address",
        };
      }
      if (!values.password) {
        return {
          password: "Password is required",
        };
      } else if (values.password.length <= 7) {
        return {
          password: "Password must be more than 7 characters",
        };
      }
      if (!values.confirmPassword) {
        return {
          confirmPassword: "Please repeat password",
        };
      } else if (values.confirmPassword !== values.password) {
        return {
          confirmPassword: "Password is not equal",
        };
      }
    },
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: (values, formikHelpers) => {
      dispatch(authThunks.register(values));
    },
  });

  useEffect(() => {
    if (isRegistered) {
      return navigate("/login");
    }
  }, [isRegistered]);

  return (
    <Grid container justifyContent={"center"} alignItems={"center"} className={s.container}>
      <Paper className={s.authWindow}>
        <h1>Sign Up</h1>
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

            <FormControl variant="standard" margin={"normal"}>
              <InputLabel htmlFor="outlined-adornment-password">Confirm password</InputLabel>
              <Input
                id="standard-adornment-password"
                {...formik.getFieldProps("confirmPassword")}
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
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className={s.formError}>{formik.errors.confirmPassword}</div>
            ) : null}

            <Button
              variant="contained"
              type="submit"
              style={{
                borderRadius: "30px",
                margin: "60px 0 30px 0",
                textTransform: "none",
                fontFamily: `'Montserrat', 'sans-serif'`,
                fontSize: "16px",
              }}
            >
              Sign Up
            </Button>
            <div className={s.haveAccount}>Already have an account?</div>
            <NavLink to={"/login"} className={s.registerLink}>
              Sign In
            </NavLink>
          </form>
        </FormikProvider>
      </Paper>
    </Grid>
  );
};
