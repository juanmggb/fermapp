import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button, Form } from "react-bootstrap";
import LinearRegressionAnalysisResultsModal from "./LinearRegressionAnalysisResultsModal";
import LinearRegressionParameters from "./LinearRegressionParameters";
import LinearRegressionVariablesInputFields from "./LinearRegressionVariablesInputFields";
import { handleFileChange } from "../../lib/utilis/linearRegression";
import { LinearRegressionFormContext } from "../../lib/context/LinearRegressionFormContext";
import { PlotProcessDataContext } from "../../lib/context/PlotProcessDataContext";
import { performLinearRegression } from "../../lib/actions/optimizationActions";

const SidebarLinearRegression = () => {
  const dispatch = useDispatch();

  const { processData, setPlotProcessData } = useContext(
    PlotProcessDataContext
  );

  const linearRegression = useSelector((state) => state.linearRegression);
  const { model_metrics } = linearRegression;

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Use useForm to perform validation in the form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      // LR paramters
      test_size: 0.2,
      random_state: 1, // Add this to the GA too
      normalization: true,
      polynomial_degree: 1,
    },
  });

  useEffect(() => {
    if (errors.test_size) {
      toast.dismiss();
      toast.error(errors.test_size.message);
    }
  }, [errors.test_size]);

  // Submit simulation input to perform the simulation
  const onSubmit = (data) => {
    if (processData) {
      // Obtain GA parameters
      const LinearRegressionParams = getLRParams(data);

      if (!LinearRegressionParams) {
        toast.error("All selected variables mut be different");
        return null;
      }

      dispatch(
        performLinearRegression({
          processData,
          LRParams: LinearRegressionParams,
        })
      );
    } else {
      toast.dismiss();
      toast.error(
        "Please, introduce experimental data to perform the linear regression analysis"
      );
    }
  };

  return (
    <>
      <Form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Choose a file</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => handleFileChange(e, setPlotProcessData, dispatch)}
          />
        </Form.Group>

        <hr />
        <LinearRegressionFormContext.Provider value={{ register, setValue }}>
          {/* Linear Regression Parameters */}
          <LinearRegressionParameters />

          <hr />

          {/* Linear regression variables */}
          <LinearRegressionVariablesInputFields />

          <hr />
        </LinearRegressionFormContext.Provider>

        <div className="d-flex justify-content-center gap-3 mt-5">
          <Button type="submit">Perform Linear Regression</Button>
          {model_metrics && <Button onClick={handleShow}>Show Results</Button>}
        </div>
      </Form>
      {model_metrics && (
        <LinearRegressionAnalysisResultsModal
          show={show}
          handleClose={handleClose}
          linearRegression={linearRegression}
        />
      )}
    </>
  );
};
export default SidebarLinearRegression;

const getLRParams = (data) => {
  const {
    test_size,
    random_state, // Add this to the GA too
    normalization,
    polynomial_degree,
    x_var,
    y_var,
    z_var,
  } = data;

  if (x_var === y_var || x_var === z_var || y_var === z_var) return null;

  return {
    test_size: parseFloat(test_size),
    random_state: parseInt(random_state),
    normalization,
    polynomial_degree,
    x_var,
    y_var,
    z_var,
  };
};
