import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { createBrowserRouter, createHashRouter, redirect, RouterProvider } from "react-router-dom";
import { Register } from "features/auth/register/Register";
import { Login } from "features/auth/login/Login";
import { ForgotPassword } from "features/auth/forgotPassword/ForgotPassword";
import { useAppSelector } from "app/hooks";
import { SetNewPassword } from "features/auth/forgotPassword/SetNewPassword";
import { CheckEmail } from "features/auth/forgotPassword/CheckEmail";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/check-email",
    element: <CheckEmail />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/set-new-password/:token",
    element: <SetNewPassword />,
  },
  {
    path: "/packs",
    element: <h1>packs</h1>,
  },
  {
    path: "/cards",
    element: <h1>cards</h1>,
  },
]);

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
    {/*<App />*/}
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
