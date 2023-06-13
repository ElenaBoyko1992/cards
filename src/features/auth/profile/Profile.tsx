import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import style from "features/auth/login/Auth.module.css";
import s from "features/auth/profile/Profile.module.css";
import { Button, Grid, Paper } from "@mui/material";
import defaultAvatar from "assets/images/defaultAvatar.png";
import photoIcon from "assets/images/photo-camera-photocamera-svgrepo-com.svg";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { EditableSpan } from "components/EditableSpan";
import { authThunks } from "features/auth/auth.slice";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const profile = useAppSelector((state) => state.auth.profile);
  const name = useAppSelector((state) => state.auth.profile?.name);
  const mail = useAppSelector((state) => state.auth.profile?.email);
  // const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  // const [editMode, setEditMode] = useState(false);
  // const enableEditMode = () => {
  //   setEditMode(true);
  // };
  // const disableEditMode = () => {
  //   setEditMode(false);
  // };
  const nameChangeHandler = (name: string) => {
    dispatch(authThunks.changeProfileData({ name }));
  };
  const logoutHandler = () => {
    dispatch(authThunks.logout());
  };

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      if (!profile) {
        const resultAction = await dispatch(authThunks.initializeApp());
        if (authThunks.initializeApp.rejected.match(resultAction)) {
          return navigate("/login");
        }
      }
    };
    // call the function
    fetchData();
  }, []);

  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     return navigate("/login");
  //   }
  // }, [isLoggedIn]);
  return (
    <Grid container justifyContent={"center"} alignItems={"center"} className={style.container}>
      <Paper className={s.window}>
        <h1>Personal Information</h1>
        <div className={s.profilePhoto}>
          <img src={defaultAvatar} />
          <img src={photoIcon} className={s.photoIcon} />
        </div>
        <EditableSpan value={name ? name : ""} onChange={nameChangeHandler} />
        <div className={s.email}>{mail}</div>
        <Button
          color="inherit"
          variant="outlined"
          startIcon={<LogoutOutlinedIcon />}
          style={{
            border: "none",
            borderRadius: "30px",
            boxShadow: "0px 2px 10px rgba(109, 109, 109, 0.25), inset 0px 1px 0px rgba(255, 255, 255, 0.3)",
          }}
          onClick={logoutHandler}
        >
          Log out
        </Button>
      </Paper>
    </Grid>
  );
};
