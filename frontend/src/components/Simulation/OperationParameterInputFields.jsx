import { useContext } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { SimulationFormContext } from "../../lib/context/SimulationFormContext";

const OperationParameterInputFields = () => {
  const { register } = useContext(SimulationFormContext);

  return (
    <Row className="mb-3">
      <Col md={6}>
        <Form.Group className="mb-3" controlId="step_size">
          <Form.Label>Select step size (h) </Form.Label>
          <Form.Select
            {...register("step_size", {
              valueAsNumber: true,
            })}
            defaultValue={1}
          >
            <option value={0.1}>0.1</option>
            <option value={0.5}>0.5</option>
            <option value={1}>1</option>
            <option value={4}>4</option>
            <option value={6}>6</option>
          </Form.Select>
        </Form.Group>
      </Col>

      <Col md={6}>
        <Form.Group className="mb-3" controlId="tf">
          <Form.Label>Simulation time (h) </Form.Label>
          <Form.Select
            {...register("tf", {
              valueAsNumber: true,
            })}
            defaultValue={60}
          >
            <option value={12}>12</option>
            <option value={24}>24</option>
            <option value={48}>48</option>
            <option value={60}>60</option>
            <option value={100}>100</option>
          </Form.Select>
        </Form.Group>
      </Col>
    </Row>
  );
};
export default OperationParameterInputFields;
