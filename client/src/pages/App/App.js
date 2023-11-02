import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import SubjectSelection from "../SubjectSelection/SubjectSelection";
import ExerciseSelection from "../ExerciseSelection/ExerciseSelection";
import Exercise from "../Exercise/Exercise";
import { Container } from "react-bootstrap";
import Login from "../Login/Login";
import SingIn from "../SingIn/SingIn";
import { Context } from "../../store/Context";
import appCtxDefaultValue from "../../store/Type";
import api from "../../api/api";

import "./reset.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [state, setState] = useState(appCtxDefaultValue.state)

  useEffect(()=>{
    api.get("get_all_info", {params: {teste:true}})
      .then(ret=>{
        setState({...ret.data})
      })
  }, [])
  
  return (
    <Context.Provider value={{state, setState}}>
      <Container
        style={{
          height: "100vh",
          width: "100vw",
          padding: 36,
          display: 'flex',

        }}
      >
        <Routes>
          <Route index element={<SubjectSelection />} />

          <Route path="login" element={<Login />} />
          <Route
            path="elementary-physics"
            element={
              <ExerciseSelection subject={state.subjectsData["elementary-physics"]} />
            }
          />
          <Route
            path="elementary-physics/exercise01"
            element={
              <Exercise
                exercise={state.exerciseData["elementary-physics"]["exercise01"]}
              />
            }
          />
          <Route
            path="elementary-physics/exercise02"
            element={
              <Exercise
                exercise={state.exerciseData["elementary-physics"]["exercise02"]}
              />
            }
          />
          <Route
            path="elementary-physics/exercise03"
            element={
              <Exercise
                exercise={state.exerciseData["elementary-physics"]["exercise03"]}
              />
            }
          />
          <Route
            path="singIn"
            element={
              <SingIn />
            }
          />
        </Routes>
      </Container>
    </Context.Provider>
  );
}

export default App;
