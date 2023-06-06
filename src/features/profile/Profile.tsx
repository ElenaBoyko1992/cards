import React from "react";
import { useAppDispatch } from "app/hooks";
import style from "features/auth/login/Auth.module.css";
import s from "features/profile/Profile.module.css";
import { Button, Grid, Paper } from "@mui/material";
import defaultAvatar from "assets/images/defaultAvatar.png";
import photoIcon from "assets/images/photo-camera-photocamera-svgrepo-com.svg";
import pencilIcon from "assets/images/pencil-line-svgrepo-com.svg";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { grey } from "@mui/material/colors";

export const Profile = () => {
  const dispatch = useAppDispatch();

  return (
    <Grid container justifyContent={"center"} alignItems={"center"} className={style.container}>
      <Paper className={s.window}>
        <h1>Personal Information</h1>
        <div className={s.profilePhoto}>
          <img src={defaultAvatar} />
          <img src={photoIcon} className={s.photoIcon} />
        </div>
        <div className={s.name}>
          <span>Helen</span>
          <img src={pencilIcon} />
        </div>
        <div className={s.email}>bionka@inbox.ru</div>
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
