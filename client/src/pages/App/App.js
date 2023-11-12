import React, { useEffect, useContext } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import SubjectSelection from "../SubjectSelection/SubjectSelection";
import ExerciseSelection from "../ExerciseSelection/ExerciseSelection";
import Exercise from "../Exercise/Exercise";
import Login from "../Login/Login";
import { Context } from "../../store/Context";
import appCtxDefaultValue from "../../store/Type";
import Header from "../../components/Header";
import { initializeApp } from "firebase/app";

import "./reset.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const { state, setState } = useContext(Context);

  const location = useLocation();
  const locationStr = location.pathname;

  useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyAkXdqdM578fZo8icjQT0m5fvp6BXtGwfo",
      authDomain: "math-learning-5e0f0.firebaseapp.com",
      projectId: "math-learning-5e0f0",
      storageBucket: "math-learning-5e0f0.appspot.com",
      messagingSenderId: "987900479339",
      appId: "1:987900479339:web:2d7ff476b0ae97d445ee2e",
      measurementId: "G-7KCBKTM6K7",
    };

    const app = initializeApp(firebaseConfig);

    const obj = appCtxDefaultValue.state;
    obj.app = app;

    setState(obj);

    // api.get("get_all_info", { params: { teste: true } }).then((ret) => {
    //   setState({ ...ret.data });
    // });
  }, []);

  return (
    <Context.Provider value={{ state, setState }}>
      <div>
        {locationStr == "/" || locationStr == "/home" ? null : (
          <Header collapsed />
        )}
        <Routes>
          <Route index element={<Login />} />

          <Route path="home" element={<SubjectSelection />} />
          <Route
            path="home/elementary-physics"
            element={
              <ExerciseSelection
                subject={state.subjectsData["elementary-physics"]}
              />
            }
          />
          <Route
            path="home/elementary-physics/exercise01"
            element={
              <Exercise
                exercise={
                  state.exerciseData["elementary-physics"]["exercise01"]
                }
              />
            }
          />
          <Route
            path="home/elementary-physics/exercise02"
            element={
              <Exercise
                exercise={
                  state.exerciseData["elementary-physics"]["exercise02"]
                }
              />
            }
          />
          <Route
            path="home/elementary-physics/exercise03"
            element={
              <Exercise
                exercise={
                  state.exerciseData["elementary-physics"]["exercise03"]
                }
              />
            }
          />
        </Routes>
      </div>
    </Context.Provider>
  );
}

export default App;
