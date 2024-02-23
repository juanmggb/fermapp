import { useContext } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { LinearRegressionFormContext } from "../../lib/context/LinearRegressionFormContext";

const LinearRegressionParameters = () => {
  const { register } = useContext(LinearRegressionFormContext);

  return (
    <div className="mt-5">
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="test_size">
            <Form.Label>Test Size:</Form.Label>
            <Form.Control
              {...register("test_size", {
                required: true,
                validate: (value) =>
                  (value > 0 && value < 1) ||
                  "Test Size should be a decimal between 0 and 1 exclusive.",
              })}
              type="number"
              step="any"
            />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group controlId="random_state">
            <Form.Label>Random State:</Form.Label>
            <Form.Control {...register("random_state")} type="number" />
          </Form.Group>
        </Col>
      </Row>

      <Row className="align-items-center mb-3">
        <Col md={6}>
          <Form.Group controlId="normalization">
            <Form.Check
              {...register("normalization")}
              label="Normalize data?"
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="polynomial_degree">
            <Form.Label>Polynomial Degree:</Form.Label>
            <Form.Control as="select" {...register("polynomial_degree")}>
              <option value="1">1</option>
              <option value="2">2</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};
export default LinearRegressionParameters;
