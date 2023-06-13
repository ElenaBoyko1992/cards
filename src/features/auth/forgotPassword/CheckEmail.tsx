import React from "react";
import { Button, Grid, Paper } from "@mui/material";
import s from "features/auth/login/Auth.module.css";
import icon from "assets/images/checkEmailIcon.png";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "app/hooks";

export const CheckEmail = () => {
  const email = useAppSelector((state) => state.auth.emailForInstructions);
  return (
    <Grid container justifyContent={"center"} alignItems={"center"} className={s.container}>
      <Paper className={s.authWindow}>
        <h1>Check Email</h1>
        <div className={s.img}>
          <img src={icon} />
        </div>
        <div className={`${s.forgotPasswordInstructionsText} ${s.checkEmail}`}>
          We've sent an Email with instructions to <br />
          {email}
        </div>
        <Button
          variant="contained"
          type="submit"
          style={{
            borderRadius: "30px",
            margin: "41px 0 8px",
            textTransform: "none",
            fontFamily: `'Montserrat', 'sans-serif'`,
            fontSize: "16px",
            width: "347px",
          }}
        >
          <NavLink to={"/login"} className={s.checkEmailNavlink}>
            Back to login
          </NavLink>
        </Button>
      </Paper>
    </Grid>
  );
};
