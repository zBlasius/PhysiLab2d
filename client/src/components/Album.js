import React, { useContext } from "react";
import { useNavigate } from "react-router";
import {
  Button,
  Card,
  CardImg,
  CardText,
  CardBody,
  Col,
  Container,
  Row,
} from "reactstrap";
import { Context } from "../store/Context";
import helper from "../utils/helper";

const Album = ({ listSubject }) => {
  const navigate = useNavigate();
  const context = useContext(Context);
  const { state, setState } = context;

  function getPercent(keySubject) {
    if (!keySubject || !state.exerciseData[keySubject]) return "0";
    let listExercises = Object.values(state.exerciseData[keySubject]);
    let percent = helper.calcPercentage(listExercises);
    return percent;
  }

  return (
    <div className="album py-5 bg-light">
      <Container>
        <Row>
          {Object.values(listSubject)?.map((item, key) => {
            return (
              <Col md="4" key={key}>
                <Card className="mb-4 box-shadow">
                  <CardImg top width="100%" src={item.src} alt={item.altText} />
                  <CardBody>
                    <h5> {item.name} </h5>
                    <CardText>{item.description}</CardText>
                    <div
                      className="progress"
                      style={{ height: 15, margin: 10 }}
                    >
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: getPercent(item?.key) + "%" }}
                        aria-valuenow="6"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        {getPercent(item?.key)}%
                      </div>
                    </div>
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Button
                        outline
                        color="primary"
                        size="sm"
                        onClick={() => navigate("/" + item.key)}
                        disabled={item.disabled}
                        style={{ width: "40%" }}
                      >
                        Fazer exercícios
                      </Button>
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
