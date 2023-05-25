import { useAppDispatch } from "app/hooks";
import { authThunks } from "features/auth/auth.slice";
import s from "features/auth/login/Login.module.css";

export const Login = () => {
  const dispatch = useAppDispatch();

  const loginHandler = () => {
    dispatch(authThunks.login({ email: "2Boyko@mail.ru", password: "1qazxcvBG", rememberMe: true }));
  };

  return (
    <div className={s.container}>
      <h1>Login</h1>
      <button onClick={loginHandler}>login</button>
    </div>
  );
};
