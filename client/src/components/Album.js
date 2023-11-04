import React from 'react';
import { useNavigate } from "react-router";
import {
    Button,
    ButtonGroup,
    Card,
    CardImg,
    CardText,
    CardBody,
    Col,
    Container,
    Row
} from 'reactstrap';

const Album = ({ listSubject }) => {
    const navigate = useNavigate();
    
    return (
        <div className="album py-5 bg-light">
            <Container>
                <Row>
                    {console.log('album', listSubject)}
                    {Object.values(listSubject)?.map((item, key) => {
                        return (
                            <Col md="4" key={key}>
                                <Card className="mb-4 box-shadow">
                                    <CardImg
                                        top
                                        width="100%"
                                        src={item.src}
                                        alt={item.altText}
                                    />
                                    <CardBody>
                                        <h5> {item.name} </h5>
                                        <CardText>{item.description}</CardText>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <ButtonGroup>
                                                <Button
                                                    outline
                                                    color="secondary"
                                                    size="sm"
                                                    onClick={()=> navigate("/" + item.key)}
                                                    disabled={item.disabled}
                                                >
                                                    View
                                                </Button>
                                            </ButtonGroup>
                                            <small className="text-muted">
                                                {item.time}
                                            </small>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            </Container>
        </div>
    );
};

export default Album;
