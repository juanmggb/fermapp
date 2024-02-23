import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchMicroorganismDetails,
  updateMicroorganism,
} from "../lib/actions/elementActions";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Loader from "../components/general/Loader";
import Message from "../components/general/Message";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { MICROORGANISM_UPDATE_RESET } from "../constants/elementConstants";

const MicroorganismDetails = () => {
  const params = useParams();
  const microorganismId = params.id;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const microorganismDetails = useSelector(
    (state) => state.microorganismDetails
  );

  const { loading, microorganism, error } = microorganismDetails;

  const microorganismUpdate = useSelector((state) => state.microorganismUpdate);

  const {
    loading: updateLoading,
    success,
    error: updateError,
  } = microorganismUpdate;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    if (!microorganism || Number(microorganismId) !== microorganism.id) {
      dispatch(fetchMicroorganismDetails(microorganismId));
    } else {
      setValue("name", microorganism.name);
      setValue("type", microorganism.type);
      setValue("source", microorganism.source);
      setValue("cost", microorganism.cost);
      setValue("optimal_conditions", microorganism.optimal_conditions);
      setValue("observations", microorganism.observations);
    }
  }, [dispatch, microorganism, microorganismId, setValue]);

  useEffect(() => {
    let toastId;

    if (updateLoading) {
      toast.loading("Updating microorganism");
    }

    if (updateError) {
      toast.dismiss(toastId);
      toast.error("An error occurred when updating the microorganism");
    }

    if (success) {
      toast.dismiss(toastId);
      toast.success("Microorganism updated successfully");
      dispatch({ type: MICROORGANISM_UPDATE_RESET });
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

    dispatch(updateMicroorganism(data, microorganismId));
  };

  if (loading) return <Loader />;

  if (error)
    return (
      <Message variant="danger">
        An error occurred when requesting microorganism details
      </Message>
    );

  if (microorganism)
    return (
      <Container>
        <Row className="d-flex justify-content-center">
          <Col sm={6} className="mt-3">
            <Button
              className="my-3"
              type="button"
              onClick={() => navigate("/microorganism-list")}
            >
              Go Back
            </Button>
            <h1>Microorganism {microorganismId}</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name:</Form.Label>
                <Form.Control
                  type="text"
                  // value={name}
                  // name="name"
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
                  // name="type"
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
                  // name="source"
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
                  // name="cost"
                  // value={cost}
                  // onChange={(e) => handleChangeMicroorganismField(e)}
                  {...register("cost", {
                    valueAsNumber: true,
                    required: "Please, introduce the microorganism number",
                  })}
                  autoComplete="off"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="opt_cond">
                <Form.Label>Optimal Conditions: </Form.Label>
                <Form.Control
                  type="text"
                  // name="optimal_conditions"
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
                  // name="observations"
                  // value={observations}
                  // onChange={(e) => handleChangeMicroorganismField(e)}
                  {...register("observations", {
                    required:
                      "Please, introduce the microorganism observations",
                  })}
                  autoComplete="off"
                />
              </Form.Group>

              <Button type="submit" className="mt-3">
                Update Microorganism
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
};
export default MicroorganismDetails;
