import React, {useContext} from "react";
import { useNavigate } from "react-router-dom";
import {Context} from "../../store/Context"
import SubjectCard from "./components/SubjectCard";
import { Button, Container, Jumbotron } from 'reactstrap';
import Album from "../../components/Album";

const SubjectSelection = () => {
  const navigate = useNavigate();
  const context = useContext(Context)
  const {state, setState} = context;
console.log('state', state)

  return (
    <main role="main">
    <div className="text-center">
        <Container className="lead text-muted my-5">
            <h1 className="jumbotron-heading">Matérias</h1>
            <p className="lead text-muted p-3">
                Exercícios de física preparados par ao melhor compreendimento da matéria. 
                Entenda o motivo, resolva problemas e alcance a nota 10!
                Exercícios de física preparados par ao melhor compreendimento da matéria. 
                Entenda o motivo, resolva problemas e alcance a nota 10!
                Exercícios de física preparados par ao melhor compreendimento da matéria. 
                Entenda o motivo, resolva problemas e alcance a nota 10!
            </p>
        </Container>
    </div>
    <Album listSubject={state.subjectsData} />
</main>
  );
};

export default SubjectSelection;
