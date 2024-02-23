import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";

import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useExperimentVariables } from "../lib/hooks/useExperimentVariables";
import { getExperimentalVariables } from "../lib/utilis/experiments";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postExperiment } from "../lib/actions/experimentActions";
import { useNavigate } from "react-router-dom";
import { REGISTER_EXPERIMENT_RESET } from "../constants/experimentConstants";
import RegisterExperimentSteps from "../components/general/RegisterExperimentSteps";

const RegisterExperimentVariables = () => {
  // Function to dispatch actions
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get register experiment from the Redux store
  const experimentRegister = useSelector((state) => state.experimentRegister);

  const { loading, success, error } = experimentRegister;

  // useForm to manage form validation
  const { register, handleSubmit, reset } = useForm();

  const { variableNames, variableValues, handleFileChange, renameVariable } =
    useExperimentVariables();

  const handleNameChange = (oldVarName, event) => {
    const newVarName = event.target.value;
    // Call the renameVariable function from your hook
    renameVariable(oldVarName, newVarName);
  };

  useEffect(() => {
    let toastId;

    if (loading) {
      toastId = toast.loading("Registering Experiment");
    }

    if (success) {
      toast.dismiss(toastId);
      toast.success("Experiment Registered Successfully");
      navigate("/experiment-list");
      dispatch({ type: REGISTER_EXPERIMENT_RESET });
    }

    if (error) {
      toast.dismiss(toastId);
      toast.error("An Error Occurred When Registering the Experiment");
    }
  });

  useEffect(() => {
    const newDefaultValues = {};
    variableNames.forEach((varName) => {
      newDefaultValues[varName + "-variable_name"] = varName;
    });
    reset(newDefaultValues);
  }, [variableNames, reset]);

  const onSubmit = (data) => {
    // Do something with the selected file

    const variables = getExperimentalVariables(
      data,
      variableNames,
      variableValues
    );

    if (!variables.length) {
      toast.dismiss();
      toast.error("All variables must be named");
      return;
    }

    const experimentDetails = JSON.parse(
      localStorage.getItem("experimentDetails") || null
    );

    const experiment = {
      experimentDetails,
      variables,
    };

    dispatch(postExperiment(experiment));
  };

  return (
    <Container>
      <RegisterExperimentSteps step1 step2 />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row className="d-flex justify-content-center">
          <Col sm={6}>
            <h1>Register Experiment Variables</h1>
            <Form.Group controlId="data">
              <Form.Label>Enter experimental data</Form.Label>
              <Form.Control
                {...register("data")}
                type="file"
                onChange={(e) => handleFileChange(e.target.files[0])}
                required
              ></Form.Control>
            </Form.Group>

            <Button type="submit" className="mt-3">
              Register Experimental Data
            </Button>
          </Col>
        </Row>

        <Row className="d-flex flex-wrap justify-content-center gap-3 my-5">
          {variableNames.map((varName, index) => (
            <Col key={index} md={4} lg={3} xl={2}>
              {" "}
              {/* Set the size of each card column */}
              <Card>
                <Card.Body>
                  <Form.Group controlId="name">
                    <Form.Label>Variable name:</Form.Label>
                    <Form.Control
                      {...register(varName + "-variable_name")}
                      type="text"
                      defaultValue={varName}
                      placeholder="Enter variable name"
                      onChange={(e) => handleNameChange(varName, e)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId="units">
                    <Form.Label>Variable units:</Form.Label>
                    <Form.Control
                      {...register(varName + "-variable_units")}
                      as="select"
                    >
                      {/* Concentration */}
                      <option value="g/L">g/L</option>
                      <option value="°T">°T</option>
                      <option value="rmp">rpm</option>
                      <option value="seconds">seconds</option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group controlId="detection_method">
                    <Form.Label>Detection method (Optional):</Form.Label>
                    <Form.Control
                      {...register(varName + "-detection_method")}
                      type="text"
                      placeholder="Enter detection method"
                    ></Form.Control>
                  </Form.Group>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Form>
    </Container>
  );
};

export default RegisterExperimentVariables;
