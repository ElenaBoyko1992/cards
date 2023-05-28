import { useAppDispatch } from "app/hooks";
import { authThunks } from "features/auth/auth.slice";
import s from "features/auth/login/Login.module.css";
import { Button, Checkbox, FormControlLabel, Grid, Paper, TextField } from "@mui/material";
import { Field, Form, FormikHelpers, useFormik } from "formik";

export const Login = () => {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    // validate: (values) => {
    //   if (!values.email) {
    //     return {
    //       email: 'Email is required'
    //     }
    //   }
    //   if (!values.password) {
    //     return {
    //       password: 'Password is required'
    //     }
    //   }
    //
    // },
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    onSubmit: async () => {
      await dispatch(authThunks.login({ email: "2Boyko@mail.ru", password: "1qazxcvBG", rememberMe: true }));
    },
  });

  const loginHandler = () => {
    dispatch(authThunks.login({ email: "2Boyko@mail.ru", password: "1qazxcvBG", rememberMe: true }));
  };

  return (
    // <div className={s.container}>
    //   <h1>Sign in</h1>
    //   <button onClick={loginHandler}>login</button>
    // </div>
    <Grid container justifyContent={"center"} alignItems={"center"} className={s.container}>
      <Grid item xs={4}>
        <Paper elevation={3}>
          <h1>Sign in</h1>
          <Form>
            <Field type="email" name="email" placeholder="Email" />
            <Field type="password" name="password" placeholder="Password" />
            <label>
              <Field type="checkbox" name="rememberMe" />
              {`Remember me`}
            </label>
            <button type="submit">Submit</button>
          </Form>
        </Paper>
      </Grid>
    </Grid>
  );
};
