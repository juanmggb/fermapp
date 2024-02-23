import { useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchSubstrateDetails,
  updateSubstrate,
} from "../lib/actions/elementActions";
import toast from "react-hot-toast";
import { SUBSTRATE_UPDATE_RESET } from "../constants/elementConstants";
import Loader from "../components/general/Loader";
import Message from "../components/general/Message";
import { useForm } from "react-hook-form";

const SubstrateDetails = () => {
  const params = useParams();
  const substrateId = params.id;

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const substrateDetails = useSelector((state) => state.substrateDetails);

  const { error, substrate, loading } = substrateDetails;

  const substrateUpdate = useSelector((state) => state.substrateUpdate);
  const {
    error: updateError,
    success,
    loading: updateLoading,
  } = substrateUpdate;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    if (!substrate || Number(substrateId) !== substrate.id) {
      dispatch(fetchSubstrateDetails(substrateId));
    } else {
      setValue("name", substrate.name);
      setValue("type", substrate.type);
      setValue("source", substrate.source);
      setValue("cost", substrate.cost);
      setValue("observations", substrate.observations);
    }
  }, [dispatch, substrate, substrateId, setValue]);

  useEffect(() => {
    let toastId;

    if (updateLoading) {
      toastId = toast.loading("Updating substrate");
    }

    if (updateError) {
      toast.dismiss(toastId);
      toast.error("An error occurred when updating substrate");
    }

    if (success) {
      toast.dismiss(toastId);
      toast.success("Substrate updated successfully");
      dispatch({ type: SUBSTRATE_UPDATE_RESET });
      navigate("/substrate-list");
    }
  }, [updateError, updateLoading, success, dispatch, navigate]);

  useEffect(() => {
    if (errors.observations) {
      toast.dismiss();
      toast.error(errors.observations.message);
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
    errors.observations,
  ]);

  const onSubmit = (data) => {
    dispatch(updateSubstrate(data, substrateId));
  };

  if (loading) return <Loader />;

  if (error)
    return (
      <Message variant="danger">
        An error occurred when requesting substrate details
      </Message>
    );

  if (substrate)
    return (
      <Container>
        <Row className="d-flex justify-content-center">
          <Col sm={6} className="mt-3">
            {" "}
            <Button
              className="my-3"
              type="button"
              onClick={() => navigate("/substrate-list")}
            >
              Go Back
            </Button>
            <h1>Substrate {substrateId}</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name: </Form.Label>
                <Form.Control
                  type="text"
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
                  {...register("source", {
                    required: "Please, introduce the substrate source",
                  })}
                  autoComplete="off"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="cost">
                <Form.Label>Cost:</Form.Label>
                <Form.Control
                  type="number"
                  step="any"
                  {...register("cost", {
                    valueAsNumber: true,
                    required: "Please, introduce the substrate cost",
                  })}
                  autoComplete="off"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="observations">
                <Form.Label>Observations: </Form.Label>
                <Form.Control
                  type="text"
                  {...register("observations", {
                    required: "Please, introduce the substrate observations",
                  })}
                  autoComplete="off"
                />
              </Form.Group>

              <Button type="submit" className="mt-3">
                Update Substrate
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
};
export default SubstrateDetails;
