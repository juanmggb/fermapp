import { Col, Container, Row } from "react-bootstrap";
import SidebarSimulation from "../components/Simulation/SidebarSimulation";
import MainPanelSimulation from "../components/Simulation/MainPanelSimulation";

const Simulation = () => {
  return (
    <Container>
      <Row>
        <Col md={4}>
          <SidebarSimulation />
        </Col>
        <Col md={8}>
          <MainPanelSimulation />
        </Col>
      </Row>
    </Container>
  );
};
export default Simulation;
