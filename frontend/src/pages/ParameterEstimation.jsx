import { Col, Container, Row } from "react-bootstrap";
import SidebarParameterEstimation from "../components/ParameterEstimation/SidebarParameterEstimation";
import MainPanelParameterEstimation from "../components/ParameterEstimation/MainPanelParameterEstimation";
import { useState } from "react";

const ParamterEstimation = () => {
  // Obtain kinetic data from localStorage
  const [kineticData, setKineticData] = useState(
    JSON.parse(localStorage.getItem("kineticData")) || null
  );

  return (
    <Container>
      <Row>
        <Col md={4}>
          <SidebarParameterEstimation
            kineticData={kineticData}
            setKineticData={setKineticData}
          />
        </Col>
        <Col md={8}>
          <MainPanelParameterEstimation kineticData={kineticData} />
        </Col>
      </Row>
    </Container>
  );
};
export default ParamterEstimation;
