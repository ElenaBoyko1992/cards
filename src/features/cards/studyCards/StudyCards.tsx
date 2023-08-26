import React, { useRef, useState } from "react";
import { Button, FormControl, FormControlLabel, FormLabel, Grid, Paper, Radio, RadioGroup } from "@mui/material";
import s from "./StudyCards.module.css";
import { useAppSelector } from "common/hooks";
import { BackToPacksList } from "features/cards/BackToPacksList";
import { CSSTransition } from "react-transition-group";

export const StudyCards = () => {
  const packName = useAppSelector((state) => state.cards.packName);
  const [showTheAnswer, setShowTheAnswer] = useState(false);

  const nodeRef = useRef(null);

  return (
    <div className={s.studyCardsContainer}>
      <BackToPacksList />
      <Grid container justifyContent={"center"} alignItems={"center"}>
        <div className={s.studyCardsWrapper}>
          <h1>Learn "{packName}"</h1>
          <Paper className={s.paper}>
            <div className={s.question}>
              <b>Question:</b> How "This" works in JavaScript?
            </div>
            {showTheAnswer && (
              <CSSTransition nodeRef={nodeRef} in={showTheAnswer} timeout={300} classNames="my-node" unmountOnExit>
                <div ref={nodeRef} className={s.showTheAnswerBlock}>
                  <div className={s.answer}>
                    <b>Answer:</b> This is how "This" works in JavaScript
                  </div>
                  <FormControl className={s.radioGroup}>
                    <FormLabel id="demo-radio-buttons-group-label">Rate yourself:</FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="knewTheAnswer"
                      name="radio-buttons-group"
                    >
                      <FormControlLabel value="didNotKnow" control={<Radio />} label="Did not know" />
                      <FormControlLabel value="forgot" control={<Radio />} label="Forgot" />
                      <FormControlLabel value="aLotOfThought" control={<Radio />} label="A lot of thought" />
                      <FormControlLabel value="confused" control={<Radio />} label="Сonfused" />
                      <FormControlLabel value="knewTheAnswer" control={<Radio />} label="Knew the answer" />
                    </RadioGroup>
                  </FormControl>
                </div>
              </CSSTransition>
            )}

            <Button
              type={"button"}
              variant="contained"
              size={"small"}
              style={{
                borderRadius: "30px",
                textTransform: "none",
                fontFamily: `'Montserrat', 'sans-serif'`,
                fontSize: "16px",
                width: "100%",
              }}
              onClick={() => setShowTheAnswer(!showTheAnswer)}
            >
              Show answer
            </Button>
          </Paper>
        </div>
      </Grid>
    </div>
  );
};

//test comment
