import React, { useContext } from "react";
import { Container } from "reactstrap";
import Album from "../../components/Album";
import { Context } from "../../utils/Context";

const SubjectSelection = () => {
  const { state } = useContext(Context);

  return (
    <main role="main">
      <div className="text-center">
        <Container className="lead text-muted my-5">
          <h1 className="jumbotron-heading">Matérias</h1>
          <p className="lead text-muted p-3">
            Selecione abaixo a matéria que deseja estudar!
          </p>
        </Container>
      </div>
      <Album listSubject={state.subjectsData} />
    </main>
  );
};

export default SubjectSelection;
