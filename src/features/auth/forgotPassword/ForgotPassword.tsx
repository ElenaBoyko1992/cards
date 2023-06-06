import React from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { authThunks } from "features/auth/auth.slice";
import { FormikProvider, useFormik } from "formik";
import { Button, Grid, Paper, TextField } from "@mui/material";
import s from "features/auth/login/Auth.module.css";
import { NavLink } from "react-router-dom";
import { CheckEmail } from "features/auth/forgotPassword/CheckEmail";

export const ForgotPassword = () => {
  const dispatch = useAppDispatch();
  const changePasswordInstructionsWereSend = useAppSelector((state) => state.auth.changePasswordInstructionsWereSend);

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
      const res = await dispatch(authThunks.forgotPassword(values.email));
      // альтернативный код при отказе от глобальной переменной changePasswordInstructionsWereSend в store
      // if (res.type === "auth/forgotPassword/fulfilled") {
      //   return navigate("/check-email");
      // }
    },
  });

  // useEffect(() => {
  //   if (changePasswordInstructionsWereSend) {
  //     //return navigate("/check-email");
  //     return <CheckEmail />
  //   }
  // }, [changePasswordInstructionsWereSend]);

  return (
    <>
      {changePasswordInstructionsWereSend ? (
        <CheckEmail email={formik.values.email} />
      ) : (
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
                <Button
                  variant="contained"
                  type="submit"
                  style={{
                    borderRadius: "30px",
                    margin: "65px 0 30px",
                    textTransform: "none",
                    fontFamily: `'Montserrat', 'sans-serif'`,
                    fontSize: "16px",
                  }}
                >
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
      )}
    </>
  );
};
