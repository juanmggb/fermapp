import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import style from "./RegisterExperimentSteps.module.css";
const RegisterExperimentSteps = ({ step1, step2 }) => {
  return (
    <Nav className="justify-content-center my-4">
      <Nav.Item>
        {step1 ? (
          <LinkContainer to="/register-exp-details">
            <Nav.Link>
              <span className={style.selected}>Experiment Details</span>
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Experiment Details</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step2 ? (
          <LinkContainer to="/register-exp-variables">
            <Nav.Link>
              <span className={style.selected}>Experiment Variables</span>
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Experiment Variables</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};
export default RegisterExperimentSteps;
