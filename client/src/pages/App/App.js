import React, { useContext } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import SubjectSelection from "../SubjectSelection/SubjectSelection";
import ExerciseSelection from "../ExerciseSelection/ExerciseSelection";
import Exercise from "../Exercise/Exercise";
import Login from "../Login/Login";
import { Context } from "../../utils/Context";
import Header from "../../components/Header";
import SingIn from "../Login/SingIn";

import "./reset.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Alert from "../../components/Alert";

function App() {
  const location = useLocation();
  const locationStr = location.pathname;

  const { state } = useContext(Context);

  return (
    <div>
      <Alert message={state.alert.message} show={state.alert.show} />
      
      <Header collapsed />
      
      <Routes>
        <Route path="login" element={<Login />} />

        <Route
          path="home"
          element={
            state.user ? <SubjectSelection /> : <Navigate to={"/login"} />
          }
        />

        <Route
          path="sing-in"
          element={
            <SingIn />
          }
        />

        <Route
          path="home/elementary-physics"
          element={
            state.user ? (
              <ExerciseSelection
                subject={state.subjectsData["elementary-physics"]}
              />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path="home/elementary-physics/exercise01"
          element={
            state.user ? (
              <Exercise
                exercise={
                  state.exerciseData["elementary-physics"]["exercise01"]
                }
              />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path="home/elementary-physics/exercise02"
          element={
            state.user ? (
              <Exercise
                exercise={
                  state.exerciseData["elementary-physics"]["exercise02"]
                }
              />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path="home/elementary-physics/exercise03"
          element={
            state.user ? (
              <Exercise
                exercise={
                  state.exerciseData["elementary-physics"]["exercise03"]
                }
              />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />

        <Route
          path="*"
          element={<Navigate to={state.user ? "/home" : "/login"} />}
        />
      </Routes>
    </div>
  );
}

export default App;
