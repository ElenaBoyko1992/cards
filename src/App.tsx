import React, { useEffect } from "react";
import s from "./App.module.css";
import { AppBar, Button, IconButton, LinearProgress, Menu, Toolbar, Typography } from "@mui/material";
import { useAppSelector } from "common/hooks";
import { Header } from "features/header/Header";
import { Outlet } from "react-router-dom";
import { authThunks } from "features/auth/auth.slice";

export const App = () => {
  const isLoading = useAppSelector((state) => state.app.isLoading);

  return (
    <>
      <div className="App">{isLoading && <LinearProgress />} </div>
      <Header />
      <Outlet />
    </>
  );
};

export default App;
