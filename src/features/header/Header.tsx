import { AppBar, Button, LinearProgress, Toolbar, Typography } from "@mui/material";
import s from "./Header.module.css";
import React from "react";
import { useAppSelector } from "common/hooks";
import defaultAvatar from "assets/images/defaultAvatar.png";
import { NavLink } from "react-router-dom";

export const Header = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const userName = useAppSelector((state) => state.auth.profile?.name);

  return (
    <header className={s.header}>
      <AppBar position="static" color={"transparent"}>
        <Toolbar className={s.toolbar}>
          <Typography variant={"inherit"}>Study cards</Typography>
          {!isLoggedIn ? (
            <Button
              color="primary"
              variant="contained"
              type="submit"
              style={{
                borderRadius: "30px",
                padding: "6px 28px",
                textTransform: "none",
                fontFamily: `'Montserrat', 'sans-serif'`,
                fontSize: "16px",
              }}
            >
              <NavLink to={"/login"}>Sign in</NavLink>
            </Button>
          ) : (
            <div className={s.headerUserInfo}>
              <NavLink to={"/profile"}>{userName}</NavLink>
              <img src={defaultAvatar} className={s.headerUserPhoto} />
            </div>
          )}
        </Toolbar>
      </AppBar>
    </header>
  );
};
