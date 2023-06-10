import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { TextField } from "@mui/material";
import pencilIcon from "assets/images/pencil-line-svgrepo-com.svg";
import s from "./EditableSpan.module.css";

type EditableSpanPropsType = {
  value: string;
  onChange: (newValue: string) => void;
};

export const EditableSpan = React.memo(function (props: EditableSpanPropsType) {
  let [editMode, setEditMode] = useState(false);
  let [title, setTitle] = useState(props.value);

  const activateEditMode = () => {
    setEditMode(true);
    setTitle(props.value);
  };
  const activateViewMode = () => {
    setEditMode(false);
    props.onChange(title);
  };
  const activateViewModeKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      setEditMode(false);
      props.onChange(title);
    }
  };
  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  return (
    <div className={s.editableSpanWrapper}>
      {editMode ? (
        <TextField
          value={title}
          onChange={changeTitle}
          autoFocus
          onBlur={activateViewMode}
          placeholder={title}
          onKeyUp={activateViewModeKeyPress}
        />
      ) : (
        <div>
          <span className={s.name}>{props.value}</span>
          <button onClick={activateEditMode} className={s.button}>
            <img src={pencilIcon} />
          </button>
        </div>
      )}
    </div>
  );
});
