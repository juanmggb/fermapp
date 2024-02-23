import { useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SUBSTRATE_REGISTER_RESET } from "../constants/elementConstants";
import { postSubstrate } from "../lib/actions/elementActions";
import { useForm } from "react-hook-form";

const RegisterSubstrate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const substrateRegister = useSelector((state) => state.substrateRegister);
  const { error, success, loading } = substrateRegister;

  // const [substrateInfo, setSubstrateInfo] = useState({
  //   name: "",
  //   type: "",
  //   source: "",
  //   cost: "",
  //   observations: "",
  // });

  // const { name, type, source, cost, observations } = substrateInfo;

  // const handleChangeSubstrateField = (e) => {
  //   setSubstrateInfo((prevSubInfo) => ({
  //     ...prevSubInfo,
  //     [e.target.name]: e.target.value,
  //   }));
  // };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    let toastId;

    if (loading) {
      toast.dismiss();
      toastId = toast.loading("Registering substrate");
    }

    if (error) {
      toast.dismiss(toastId);
      toast.error("An error ocurred when registering substrate");
    }

    if (success) {
      toast.dismiss(toastId);
      toast.success("Substrate registered successfully");
      dispatch({ type: SUBSTRATE_REGISTER_RESET });
      navigate("/substrate-list");
    }
  }, [dispatch, navigate, error, loading, success]);

  useEffect(() => {
    let toastId;

    if (errors.observations) {
      toast.dismiss(toastId);
      toast.error(errors.observations.message);
    }

    if (errors.cost) {
      toast.dismiss(toastId);
      toast.error(errors.cost.message);
    }
    if (errors.source) {
      toast.dismiss(toastId);
      toast.error(errors.source.message);
    }

    if (errors.type) {
      toast.dismiss(toastId);
      toast.error(errors.type.message);
    }

    if (errors.name) {
      toast.dismiss(toastId);
      toast.error(errors.name.message);
    }
  }, [
    errors.name,
    errors.type,
    errors.source,
    errors.cost,
    errors.observations,
  ]);

  const onSubmit = (data) => {
    dispatch(postSubstrate(data));
  };

  return (
    <Container>
      <Row className="d-flex justify-content-center">
        <Col sm={6} className="mt-3">
          <h1>Register Substrate</h1>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                // name="name"
                // value={name}
                // onChange={handleChangeSubstrateField}
                {...register("name", {
                  required: "Please, introduce the substrate name",
                })}
                autoComplete="off"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="type">
              <Form.Label>Type:</Form.Label>
              <Form.Control
                type="text"
                // name="type"
                // value={type}
                // onChange={handleChangeSubstrateField}
                {...register("type", {
                  required: "Please, introduce the substrate type",
                })}
                autoComplete="off"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="source">
              <Form.Label>Source:</Form.Label>
              <Form.Control
                type="text"
                // name="source"
                // value={source}
                // onChange={handleChangeSubstrateField}
                {...register("source", {
                  required: "Please, introduce the substrate source",
                })}
                autoComplete="off"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Cost:</Form.Label>
              <Form.Control
                type="number"
                step="any"
                // name="cost"
                // value={cost}
                // onChange={handleChangeSubstrateField}
                {...register("cost", {
                  valueAsNumber: true,
                  required: "Please, introduce the substrate cost",
                })}
                autoComplete="off"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="observations">
              <Form.Label>Observations:</Form.Label>
              <Form.Control
                type="text"
                // name="observations"
                // value={observations}
                // onChange={handleChangeSubstrateField}
                {...register("observations", {
                  required: "Please, introduce the substrate observations",
                })}
                autoComplete="off"
              />
            </Form.Group>

            <Button type="submit" className="mt-3">
              Register Substrate
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
export default RegisterSubstrate;
