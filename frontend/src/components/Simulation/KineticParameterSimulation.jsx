import { Form } from "react-bootstrap";
import { MathJax } from "better-react-mathjax";
import { useContext } from "react";
import { SimulationFormContext } from "../../lib/context/SimulationFormContext";
import styled from "styled-components";
import { KINETIC_PARAMTERS_SIMULATION_SYMBOLS } from "../../constants/kineticParamConstants";

const RangeValueStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const KineticParameterSimulation = ({
  symbol,
  minValue,
  maxValue,
  value,
  step,
  handleChange,
}) => {
  const { register } = useContext(SimulationFormContext);

  return (
    <Form.Group controlId={symbol}>
      <Form.Label>
        <MathJax>{KINETIC_PARAMTERS_SIMULATION_SYMBOLS[symbol]}</MathJax>
      </Form.Label>
      <RangeValueStyled>
        <span>{minValue}</span>
        <span>{value / 1}</span>
        <span>{maxValue}</span>
      </RangeValueStyled>
      <Form.Range
        {...register(`${symbol}`, {
          valueAsNumber: true,
        })}
        min={minValue}
        max={maxValue}
        step={step}
        onChange={(e) => handleChange(Number(e.target.value))}
      />
    </Form.Group>
  );
};
export default KineticParameterSimulation;
