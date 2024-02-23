import { useContext } from "react";
import { Form } from "react-bootstrap";
import { SimulationFormContext } from "../../lib/context/SimulationFormContext";

const InitialConcentrationSimulation = ({ var_name, symbol }) => {
  const { register } = useContext(SimulationFormContext);

  return (
    <Form.Group className="mb-3" controlId="X0">
      <Form.Label>{capitalizeFirstLetter(var_name)} (g/L)</Form.Label>
      <Form.Control
        {...register(symbol, {
          required: `${capitalizeFirstLetter(
            var_name
          )} concentration is required`,
          pattern: {
            value: /^\d+(\.\d{1,2})?$/,
            message: `Please enter a valid numeric value for ${capitalizeFirstLetter(
              var_name
            )} concentration`,
          },
        })}
        type="numeric"
      />
    </Form.Group>
  );
};
export default InitialConcentrationSimulation;

const capitalizeFirstLetter = (string) => {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
};
