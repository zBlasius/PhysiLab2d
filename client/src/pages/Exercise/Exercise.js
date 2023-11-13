import React, { useContext } from "react";
import Question from "./components/Question/Question";
import Simulation from "./components/Simulation/Simulation";
import { useNavigate } from "react-router";
import { Context } from "../../utils/Context";
import { Crud } from "../../utils/Crud";

const Exercise = ({ exercise }) => {
  const navigate = useNavigate();

  const { state, setState } = useContext(Context);

  function onSubmitAnswer(submitedAnswer) {
    if (submitedAnswer == exercise.answer) {
      Crud.listarUsuario(state.db, state.user.uid).then((userDataRes) => {
        const exerciseData =
          state.exerciseData[exercise.groupKey][exercise.key];

        console.log("userDataRes: ", userDataRes);

        const updatedUserData = {
          ...userDataRes,
          exercises: { ...userDataRes.exercises, [exerciseData.key]: true },
        };

        Crud.atualizarUsuario(state.db, state.user.uid, updatedUserData)
          .then(() => {
            navigate(`/home/${exerciseData.groupKey}`);
          })
          .catch((err) => {
            setState({...state, alert: {show: true, message: "Erro"}})
          });
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
