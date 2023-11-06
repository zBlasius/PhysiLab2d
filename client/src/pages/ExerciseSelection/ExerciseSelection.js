import React, { useEffect, useState, useContext } from "react";
import { Container } from "react-bootstrap";
import ExerciseCard from "./components/ExerciseCard";
import { useNavigate } from "react-router";
import { Context } from "../../store/Context";
import "./index.css";

const ExerciseSelection = ({ subject }) => {
  const navigate = useNavigate();
  const context = useContext(Context);
  const { state, setState } = context;
  const [exercises, setExercises] = useState(null);

  useEffect(() => {
    if (subject?.key && !exercises) {
      setExercises(Object.values(state.exerciseData[subject.key]) ?? []);
    }
  }, [subject, exercises]);

  function getCurrentButton(exercise) {
    if (exercise.completed) {
      return (
        <div className="col-sm-3 text-lg-end d-flex justify-content-end align-items-center bg-color-green">
          <a
            href="#"
            className="btn bg-success stretched-link text-white"
            onClick={() => navigate("/" + subject.key + "/" + exercise.key)}
          >
            Concluído
          </a>
        </div>
      );
    } else {
      return (
        <div className="col-sm-3 text-lg-end d-flex justify-content-end align-items-center">
          <a
            href="#"
            className="btn btn-primary stretched-link"
            onClick={() => navigate("/" + subject.key + "/" + exercise.key)}
          >
            Abrir
          </a>
        </div>
      );
    }
  }

  return (
    <div className="container">
      <div className="text-center mt-5 mb-5">
        <h3>Exercícios</h3>
        <p className="lead">Selecione algum exercício abaixo, bons estudos!</p>
      </div>
      {exercises?.map((exercise, index) => (
        <div style={{ cursor: "auto" }} className="card mb-3" key={index}>
          <div className="card-body">
            <div className="d-flex flex-column flex-lg-row">
              <img
                // src="/img/physics.jpeg" TODO:
                class="rounded-3"
                style={{ width: 56, height: 56, marginRight: 12 }}
                alt="Imagem do exercício"
              />

              <div className="row flex-fill">
                <div className="col-sm-5">
                  <h4 className="h5">{exercise?.name}</h4>
                  <span className="badge bg-secondary">
                    Exercício {index + 1}
                  </span>
                </div>
                <div className="col-sm-4 py-2"> </div>
                {getCurrentButton(exercise)}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExerciseSelection;
