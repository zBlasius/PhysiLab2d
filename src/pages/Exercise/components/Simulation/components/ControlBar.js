import React from "react";
import {
  Button,
  ButtonGroup,
  ToggleButtonGroup,
  ToggleButton,
  Container,
} from "react-bootstrap";

const ControlBar = ({ speed, setSpeed, onClickRestart }) => {
  return (
    <Container>
      <ButtonGroup>
        <ToggleButtonGroup
          type="radio"
          name="speed-options"
          value={speed}
          onChange={(val) => setSpeed(val)}
        >
          <ToggleButton id="speed-options-0.0" variant="secondary" value={0.0}>
            Pausar
          </ToggleButton>
          <ToggleButton id="speed-options-0.5" variant="secondary" value={0.5}>
            0.5x
          </ToggleButton>
          <ToggleButton id="speed-options-1.0" variant="secondary" value={1.0}>
            1.0x
          </ToggleButton>
          <ToggleButton id="speed-options-1.5" variant="secondary" value={1.5}>
            1.5x
          </ToggleButton>
        </ToggleButtonGroup>
        <Button variant="secondary" onClick={() => onClickRestart()}>
          Restart
        </Button>
      </ButtonGroup>
    </Container>
  );
};

export default ControlBar;
