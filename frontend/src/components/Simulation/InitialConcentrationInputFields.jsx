import { Col, Row } from "react-bootstrap";
import InitialConcentrationSimulation from "./InitialConcentrationSimulation";

const InitialConcentrationInputFields = () => {
  return (
    <Row className="mb-5">
      <Col md={4}>
        <InitialConcentrationSimulation var_name="biomass" symbol="X0" />
      </Col>

      <Col md={4}>
        <InitialConcentrationSimulation var_name="substrate" symbol="S0" />
      </Col>

      <Col md={4}>
        <InitialConcentrationSimulation var_name="product" symbol="P0" />
      </Col>
    </Row>
  );
};
export default InitialConcentrationInputFields;
