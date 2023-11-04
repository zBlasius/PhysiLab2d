import React from 'react';
import { Button, Container, Jumbotron } from 'reactstrap';
import Album from './Album';

const Main = ({ album }) => {
    return (
        <main role="main">
            <Jumbotron className="text-center">
                <Container>
                    <h1 className="jumbotron-heading">Física</h1> 
                    <p className="lead text-muted">
                        Resolva exercícios com ambientes reais simulados, compreendendo a aplicação
                        real de conteúdos passados em sala de aula.
                    </p>
                    <p>
                        <Button color="primary" className="mx-1 my-2">
                            Main call to action
                        </Button>
                        <Button color="secondary" className="my-2">
                            Secondary action
                        </Button>
                    </p>
                </Container>
            </Jumbotron>
            <Album album={album} />
        </main>
    );
};

export default Main;
