import { Button, Col, Container, Row } from "react-bootstrap";
import { logout } from "../lib/actions/sessionActions";

const Home = () => {
  return (
    <Container>
      <Row className="text-center my-4">
        <h1>Welcome to FermApp AI</h1>
        <p>Your companion in optimizing fermentation processes</p>
      </Row>
      <Row
        className="d-flex justify-content-center align-items-center"
        style={{ height: "50vh" }}
      >
        <Col sm={6}>
          <h3>Your Dashboard</h3>
          <p>Recent Analysis: [Data]</p>
          <p>Ongoing Process: [Data]</p>
          <p>Optimization Suggestions: [Data]</p>
        </Col>
        <Col
          sm={6}
          className="d-flex flex-column justify-content-around align-items-center gap-3"
        >
          {/* Navigation buttons or links */}
          <Button>Start Analysis</Button>
          <Button>View Past Analyses</Button>
          <Button>User Settings</Button>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center">
        <Col sm={3} className="d-flex justify-content-center">
          <Button onClick={logout}>Logout</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
