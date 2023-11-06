import React, { useContext } from "react";
import Question from "./components/Question/Question";
import Simulation from "./components/Simulation/Simulation";
import { useNavigate } from "react-router";
import { Context } from "../../store/Context";
import api from "../../api/api";

const Exercise = ({ exercise }) => {
  const navigate = useNavigate();

  const context = useContext(Context);
  const { state, setState } = context;

  function onSubmitAnswer(submitedAnswer) {
    if (submitedAnswer == exercise.answer) {
      let auxExerciseData = state.exerciseData;
      auxExerciseData[exercise.groupKey][exercise.key].completed = true;
      setState({ ...state, exerciseData: auxExerciseData });
      api.post("update", { auxExerciseData }).then((_) => {
        navigate("/elementary-physics");
      });
    }
  }

  return (
    <div style={{ height: "700px", width: "100%" }}>
      <Question exercise={exercise} onSubmitAnswer={onSubmitAnswer} />
      <div style={{ height: 8 }} />
      <Simulation exercise={exercise} />
    </div>
  );
};

export default Exercise;
