import { useContext } from "react";
import { Form } from "react-bootstrap";
import styled from "styled-components";
import { MathJax } from "better-react-mathjax";
import { OptimizationFormContext } from "../../lib/context/OptimizationFormContext";
import { KINETIC_PARAMTERS_OPTIMIZATION_SYMBOLS } from "../../constants/kineticParamConstants";

const ToggleFieldStyled = styled.div`
  /* text-align: center; */
  margin-left: 80px;
`;

const InputFieldStyled = styled(Form.Group)`
  max-width: 100px;
  text-align: center;
  margin: 0 10px;

  & > input {
    border-radius: 5px;
  }
`;

const InputGroupStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 2rem;
`;

const KineticParameterOptimization = ({
  symbol,
  optimize,
  setOptimize,
  value,
  setValue,
  minValue,
  setMinValue,
  maxValue,
  setMaxValue,
}) => {
  const { register } = useContext(OptimizationFormContext);

  return (
    <>
      <ToggleFieldStyled>
        <Form.Check
          style={{ fontSize: "small" }}
          {...register(`${symbol}_optimize`)}
          type="checkbox"
          label="Optimize?"
          checked={optimize}
          onChange={(e) => setOptimize(e.target.checked)}
        />
      </ToggleFieldStyled>

      {optimize ? (
        <InputGroupStyled>
          <InputFieldStyled>
            <Form.Label>
              <MathJax style={{ fontSize: "small" }}>
                Min {KINETIC_PARAMTERS_OPTIMIZATION_SYMBOLS[symbol]}
              </MathJax>
            </Form.Label>
            <Form.Control
              style={{ fontSize: "small" }}
              {...register(`${symbol}_min`)}
              type="number"
              value={minValue}
              onChange={(e) => setMinValue(e.target.value)}
            />
          </InputFieldStyled>
          <InputFieldStyled>
            <Form.Label>
              <MathJax style={{ fontSize: "small" }}>
                Max {KINETIC_PARAMTERS_OPTIMIZATION_SYMBOLS[symbol]}
              </MathJax>
            </Form.Label>
            <Form.Control
              style={{ fontSize: "small" }}
              {...register(`${symbol}_max`)}
              type="number"
              value={maxValue}
              onChange={(e) => setMaxValue(e.target.value)}
            />
          </InputFieldStyled>
        </InputGroupStyled>
      ) : (
        <InputGroupStyled>
          <InputFieldStyled>
            <Form.Label>
              <MathJax style={{ fontSize: "small" }}>
                Fixed {KINETIC_PARAMTERS_OPTIMIZATION_SYMBOLS[symbol]}
              </MathJax>
            </Form.Label>
            <Form.Control
              style={{ fontSize: "small" }}
              {...register(`${symbol}_fixed`)}
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </InputFieldStyled>
        </InputGroupStyled>
      )}
    </>
  );
};

export default KineticParameterOptimization;
