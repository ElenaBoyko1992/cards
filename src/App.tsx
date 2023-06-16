import React from "react";
import "./App.css";
import { LinearProgress } from "@mui/material";
import { useAppSelector } from "common/hooks";

export const App = () => {
  const isLoading = useAppSelector((state) => state.app.isLoading);

  return <div className="App">{isLoading && <LinearProgress />} </div>;
};

export default App;
