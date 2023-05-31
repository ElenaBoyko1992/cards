import React from "react";
import { useAppDispatch } from "app/hooks";
import { authThunks } from "features/auth/auth.slice";
import { FormikProvider, useFormik } from "formik";
import { Button, Grid, Paper, TextField } from "@mui/material";
import s from "features/auth/login/Auth.module.css";
import { NavLink } from "react-router-dom";

export const ForgotPassword = () => {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    validate: (values) => {
      if (!values.email) {
        return {
          email: "Email is required",
        };
      }
    },
    initialValues: {
      email: "",
    },
    onSubmit: async (values, formikHelpers) => {
      dispatch(authThunks.forgotPassword(values.email));
    },
  });

  return (
    <Grid container justifyContent={"center"} alignItems={"center"} className={s.container}>
      <Paper className={s.authWindow}>
        <h1>Forgot your password?</h1>
        <FormikProvider value={formik}>
          <form action="" onSubmit={formik.handleSubmit} className={s.form}>
            <TextField variant="standard" {...formik.getFieldProps("email")} label={"Email"} margin="normal" />
            {formik.touched.email && formik.errors.email ? (
              <div className={s.formError}>{formik.errors.email}</div>
            ) : null}
            <div className={s.forgotPasswordInstructionsText}>
              Enter your email address and we will send you further instructions
            </div>
            <Button variant="contained" type="submit" style={{ borderRadius: "30px", marginBottom: "30px" }}>
              Send instructions
            </Button>
            <div className={s.haveAccount}>Did you remember your password?</div>
            <NavLink to={"/login"} className={s.registerLink}>
              Try logging in
            </NavLink>
          </form>
        </FormikProvider>
      </Paper>
    </Grid>
  );
};
