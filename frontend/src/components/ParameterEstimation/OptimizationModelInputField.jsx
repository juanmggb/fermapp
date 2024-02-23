import { useContext } from "react";
import { Form } from "react-bootstrap";
import { OptimizationFormContext } from "../../lib/context/OptimizationFormContext";
const OptimizationModelInputField = () => {
  const { register } = useContext(OptimizationFormContext);
  return (
    <Form.Group className="mb-3" controlId="model">
      <Form.Label>Select Model</Form.Label>
      {/* Here is the value of model that I want to access and observe all the time, especially when it changes and pass it to the context */}
      <Form.Select
        {...register("model", { required: "Please, select a kinetic model" })}
      >
        <option value="">Select kinetic model</option>
        <option value="monod">Monod Model</option>
        <option value="inhibition">Substrate Model</option>
      </Form.Select>
    </Form.Group>
  );
};
export default OptimizationModelInputField;
