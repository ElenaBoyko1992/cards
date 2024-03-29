import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { Register } from "features/auth/register/Register";
import { Login } from "features/auth/login/Login";
import { ForgotPassword } from "features/auth/forgotPassword/ForgotPassword";
import { SetNewPassword } from "features/auth/forgotPassword/SetNewPassword";
import { Profile } from "features/auth/profile/Profile";
import "react-toastify/dist/ReactToastify.css";
import { GlobalError } from "components/GlobalError/GlobalError";
import App from "App";
import { CheckEmail } from "features/auth/forgotPassword/CheckEmail";
import { Packs } from "features/packs/Packs";
import { Cards } from "features/cards/Cards";
import { StudyCards } from "features/cards/studyCards/StudyCards";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/profile",
        element: <Profile />,
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
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/set-new-password/:token",
        element: <SetNewPassword />,
      },
      {
        path: "/packs",
        element: <Packs />,
      },
      {
        path: "/cards/:packId",
        element: <Cards />,
      },
      {
        path: "/cards/:packId/studyСards",
        element: <StudyCards />,
      },
    ],
  },
]);

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    {/*<App />*/}
    <RouterProvider router={router} />
    <GlobalError />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
