import React, { useEffect, useState } from "react";
import { useAppDispatch } from "common/hooks";
import { authThunks } from "features/auth/auth.slice";
import { useNavigate, useParams } from "react-router-dom";
import { FormikProvider, useFormik } from "formik";
import { Button, FormControl, Grid, IconButton, Input, InputAdornment, InputLabel, Paper } from "@mui/material";
import s from "features/auth/login/Auth.module.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAppSelector } from "common/hooks";

export const SetNewPassword = () => {
  const dispatch = useAppDispatch();
  const passwordWasChanged = useAppSelector((state) => state.auth.passwordWasChanged);
  const navigate = useNavigate();
  const { token } = useParams();

  //code for password field
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const formik = useFormik({
    validate: (values) => {
      if (!values.password) {
        return {
          password: "Password is required",
        };
      } else if (values.password.length <= 7) {
        return {
          password: "Password must be more than 7 characters",
        };
      }
    },
    initialValues: {
      password: "",
    },
    onSubmit: (values, formikHelpers) => {
      if (token) {
        dispatch(authThunks.setNewPassword({ password: values.password, resetPasswordToken: token }));
      }
    },
  });

  useEffect(() => {
    if (passwordWasChanged) {
      return navigate("/login");
    }
  }, [passwordWasChanged]);

  return (
    <Grid container justifyContent={"center"} alignItems={"center"} className={s.container}>
      <Paper className={s.authWindow}>
        <h1>Create new password</h1>
        <FormikProvider value={formik}>
          <form action="" onSubmit={formik.handleSubmit} className={s.form}>
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
            <div className={s.forgotPasswordInstructionsText}>
              Create new password and we will send you further instructions to email
            </div>
            <Button
              variant="contained"
              type="submit"
              style={{
                borderRadius: "30px",
                margin: "42px 0 8px 0",
                textTransform: "none",
                fontFamily: `'Montserrat', 'sans-serif'`,
                fontSize: "16px",
              }}
            >
              Create new password
            </Button>
          </form>
        </FormikProvider>
      </Paper>
    </Grid>
  );
};
