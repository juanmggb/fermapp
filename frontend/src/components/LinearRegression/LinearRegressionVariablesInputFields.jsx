import { useContext, useEffect } from "react";
import { Form } from "react-bootstrap";
import { PlotProcessDataContext } from "../../lib/context/PlotProcessDataContext";
import { LinearRegressionFormContext } from "../../lib/context/LinearRegressionFormContext";

const LinearRegressionVariablesInputFields = () => {
  const {
    xAxisVar,
    yAxisVar,
    zAxisVar,
    handleChangeAxisVariable,
    processData,
  } = useContext(PlotProcessDataContext);

  const { register, setValue } = useContext(LinearRegressionFormContext);

  useEffect(() => {
    setValue("x_var", xAxisVar);
    setValue("y_var", yAxisVar);
    setValue("z_var", zAxisVar);
  }, [xAxisVar, yAxisVar, zAxisVar, setValue]);

  const variables = Object.keys(processData);

  return (
    <div className="d-flex flex-row gap-3 justify-content-center mt-5">
      <Form.Group>
        <Form.Label>X-Axis:</Form.Label>
        <Form.Control
          as="select"
          type="text"
          {...register("x_var")}
          value={xAxisVar}
          onChange={(e) => handleChangeAxisVariable("xAxisVar", e.target.value)}
        >
          {variables.map((variable) => (
            <option key={variable} value={variable}>
              {variable}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group>
        <Form.Label>Y-Axis:</Form.Label>
        <Form.Control
          as="select"
          type="text"
          {...register("y_var")}
          value={yAxisVar}
          onChange={(e) => handleChangeAxisVariable("yAxisVar", e.target.value)}
        >
          {variables.map((variable) => (
            <option key={variable} value={variable}>
              {variable}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group>
        <Form.Label>Z-Axis:</Form.Label>
        <Form.Control
          as="select"
          type="text"
          {...register("z_var")}
          value={zAxisVar}
          onChange={(e) => handleChangeAxisVariable("zAxisVar", e.target.value)}
        >
          {variables.map((variable) => (
            <option key={variable} value={variable}>
              {variable}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
    </div>
  );
};
export default LinearRegressionVariablesInputFields;
