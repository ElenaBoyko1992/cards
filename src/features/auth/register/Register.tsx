import { useAppDispatch } from "app/hooks";
import { authThunks } from "features/auth/auth.slice";
import s from "./Register.module.css";

export const Register = () => {
  const dispatch = useAppDispatch();

  const registerHandler = () => {
    dispatch(authThunks.register({ email: "2Boyko@mail.ru", password: "1qazxcvBG" }));
  };

  return (
    <div className={s.container}>
      <h1>Register</h1>
      <button onClick={registerHandler}>register</button>
    </div>
  );
};
