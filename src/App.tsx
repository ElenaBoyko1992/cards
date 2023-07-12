import React, { useEffect } from "react";
import s from "./App.module.css";
import { AppBar, Button, CircularProgress, IconButton, LinearProgress, Menu, Toolbar, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { Header } from "features/header/Header";
import { Outlet, useNavigate } from "react-router-dom";
import { authThunks } from "features/auth/auth.slice";

export const App = () => {
  const isLoading = useAppSelector((state) => state.app.isLoading);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.auth.profile);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const isInitialized = useAppSelector((state) => state.auth.isInitialized);

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      if (!profile) {
        const resultAction = await dispatch(authThunks.initializeApp());
        if (authThunks.initializeApp.rejected.match(resultAction)) {
          return navigate("/login");
        } else {
          return navigate("/packs");
        }
      }
    };
    /*    const fetchData = async () => {
      if (!isLoggedIn) {
        return navigate("/login");
      } else {
        const resultAction = await dispatch(authThunks.initializeApp());
        if (authThunks.initializeApp.rejected.match(resultAction)) {
          return navigate("/login");
        } else {
          return navigate("/packs");
        }
      }
    };*/
    // call the function
    fetchData();
  }, []);

  if (!isInitialized) {
    return (
      <div style={{ position: "fixed", top: "30%", textAlign: "center", width: "100%" }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      <div className="App">{isLoading && <LinearProgress />} </div>
      <Header />
      <Outlet />
    </>
  );
};

export default App;
