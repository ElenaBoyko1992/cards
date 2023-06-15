import React from "react";
import "./App.css";
import { useAppSelector } from "common/hooks";
import { LinearProgress } from "@mui/material";

export const App = () => {
  const isLoading = useAppSelector((state) => state.app.isLoading);

  return <div className="App">{isLoading && <LinearProgress />} </div>;
};

export default App;
