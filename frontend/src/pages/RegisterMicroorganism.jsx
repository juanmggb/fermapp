import { useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postMicroorganism } from "../lib/actions/elementActions";
import toast from "react-hot-toast";
import { MICROORGANISM_REGISTER_RESET } from "../constants/elementConstants";
import { useForm } from "react-hook-form";

const RegisterMicroorganism = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const [microorganismInfo, setMicroorganismInfo] = useState({
  //   name: "",
  //   type: "",
  //   source: "",
  //   cost: "",
  //   optimal_conditions: "",
  //   observations: "",
  // });

  // const { name, type, source, cost, optimal_conditions, observations } =
  //   microorganismInfo;

  // const handleChangeMicroorganismField = (e) => {
  //   setMicroorganismInfo((prevMoInfo) => ({
  //     ...prevMoInfo,
  //     [e.target.name]: e.target.value,
  //   }));
  // };

  const microorganismRegister = useSelector(
    (state) => state.microorganismRegister
  );

  const { error, success, loading } = microorganismRegister;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    let toastId;

    if (loading) {
      toast.dismiss();
      toastId = toast.loading("Registering microorganism");
    }

    if (error) {
      toast.dismiss(toastId);

      toast.error("An error occurred when registering microorganism");
    }

    if (success) {
      toast.dismiss(toastId);
      toast.success("Microorganism registered successfully");
      dispatch({ type: MICROORGANISM_REGISTER_RESET });
      navigate("/microorganism-list");
    }
  });

  useEffect(() => {
    if (errors.observations) {
      toast.dismiss();
      toast.error(errors.observations.message);
    }

    if (errors.optimal_conditions) {
      toast.dismiss();
      toast.error(errors.optimal_conditions.message);
    }

    if (errors.cost) {
      toast.dismiss();
      toast.error(errors.cost.message);
    }

    if (errors.source) {
      toast.dismiss();
      toast.error(errors.source.message);
    }

    if (errors.type) {
      toast.dismiss();
      toast.error(errors.type.message);
    }

    if (errors.name) {
      toast.dismiss();
      toast.error(errors.name.message);
    }
  }, [
    errors.name,
    errors.type,
    errors.source,
    errors.cost,
    errors.optimal_conditions,
    errors.observations,
  ]);

  const onSubmit = (data) => {
    dispatch(postMicroorganism(data));
  };

  return (
    <Container>
      <Row className="d-flex justify-content-center">
        <Col sm={6} className="mt-3">
          <h1>Register Microorganism</h1>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="name"
                // value={name}
                // onChange={(e) => handleChangeMicroorganismField(e)}
                {...register("name", {
                  required: "Please, introduce the microorganism name",
                })}
                autoComplete="off"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="type">
              <Form.Label>Type:</Form.Label>
              <Form.Control
                type="text"
                // value={type}
                // onChange={(e) => handleChangeMicroorganismField(e)}
                {...register("type", {
                  required: "Please, introduce the microorganism type",
                })}
                autoComplete="off"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="source">
              <Form.Label>Source:</Form.Label>
              <Form.Control
                type="text"
                // value={source}
                // onChange={(e) => handleChangeMicroorganismField(e)}
                {...register("source", {
                  required: "Please, introduce the microorganism source",
                })}
                autoComplete="off"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="cost">
              <Form.Label>Cost:</Form.Label>
              <Form.Control
                type="number"
                step="any"
                // value={cost}
                // onChange={(e) => handleChangeMicroorganismField(e)}
                {...register("cost", {
                  valueAsNumber: true,
                  required: "Please, introduce the microorganism cost",
                })}
                autoComplete="off"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="optimal_conditions">
              <Form.Label>Optimal Conditions:</Form.Label>
              <Form.Control
                type="text"
                // value={optimal_conditions}
                // onChange={(e) => handleChangeMicroorganismField(e)}
                {...register("optimal_conditions", {
                  required:
                    "Please, introduce the microorganism optimal conditions",
                })}
                autoComplete="off"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="observations">
              <Form.Label>Observations:</Form.Label>
              <Form.Control
                type="text"
                // value={observations}
                // onChange={(e) => handleChangeMicroorganismField(e)}
                {...register("observations", {
                  required: "Please, introduce the microorganism observations",
                })}
                autoComplete="off"
              />
            </Form.Group>

            <Button type="submit" className="mt-3">
              Register Microorganism
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
export default RegisterMicroorganism;
