import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import style from "features/auth/login/Auth.module.css";
import s from "features/profile/Profile.module.css";
import { Button, Grid, Paper } from "@mui/material";
import defaultAvatar from "assets/images/defaultAvatar.png";
import photoIcon from "assets/images/photo-camera-photocamera-svgrepo-com.svg";
import pencilIcon from "assets/images/pencil-line-svgrepo-com.svg";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { EditableSpan } from "components/EditableSpan";
import { authThunks } from "features/auth/auth.slice";

export const Profile = () => {
  const dispatch = useAppDispatch();
  const name = useAppSelector((state) => state.auth.profile?.name);
  const mail = useAppSelector((state) => state.auth.profile?.email);
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
  useEffect(() => {
    dispatch(authThunks.initializeApp());
  }, []);
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
        >
          Log out
        </Button>
      </Paper>
    </Grid>
  );
};
