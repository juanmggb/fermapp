import { useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchLaboratoryDetail,
  putLaboratory,
} from "../lib/actions/laboratoryActions";
import Loader from "../components/general/Loader";
import Message from "../components/general/Message";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { RESET_UPDATE_LABORATORY } from "../constants/laboratoryConstants";

const LaboratoryDetails = () => {
  // Get the laboratory id
  const params = useParams();
  const laboratoryId = params.id;

  const navigate = useNavigate();

  //   Function to dispatch action creators
  const dispatch = useDispatch();

  //   Get the laboratory from the Redux store
  const laboratoryDetails = useSelector((state) => state.laboratoryDetails);

  const { error, laboratory, loading } = laboratoryDetails;

  const laboratoryUpdate = useSelector((state) => state.laboratoryUpdate);
  const {
    error: updateError,
    success,
    loading: updateLoading,
  } = laboratoryUpdate;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    if (!laboratory || Number(laboratoryId) !== laboratory.id) {
      dispatch(fetchLaboratoryDetail(laboratoryId));
    } else {
      setValue("laboratory_name", laboratory.laboratory_name);
      setValue("location", laboratory.location);
      setValue("description", laboratory.description);
      setValue("email", laboratory.email);
      setValue("phone_number", laboratory.phone_number);
    }
  }, [laboratory, laboratoryId, dispatch, setValue]);

  useEffect(() => {
    let toastId;

    if (updateLoading) {
      toastId = toast.loading("Updating laboratory");
    }

    if (updateError) {
      toast.dismiss(toastId);
      toast.error("An error occurred when updating laboratory");
    }

    if (success) {
      toast.dismiss(toastId);
      toast.success("Laboratory updated successfully");
      dispatch({ type: RESET_UPDATE_LABORATORY });
      navigate("/laboratory-list");
    }
  });

  useEffect(() => {
    if (errors.description) {
      toast.dismiss();
      toast.error(errors.description.message);
    }

    if (errors.phone_number) {
      toast.dismiss();
      toast.error(errors.phone_number.message);
    }

    if (errors.email) {
      toast.dismiss();
      toast.error(errors.email.message);
    }

    if (errors.location) {
      toast.dismiss();
      toast.error(errors.location.message);
    }

    if (errors.laboratory_name) {
      toast.dismiss();
      toast.error(errors.laboratory_name.message);
    }
  }, [
    errors.laboratory_name,
    errors.location,
    errors.email,
    errors.phone_number,
    errors.description,
  ]);

  const onSubmit = (data) => {
    console.log(data);
    dispatch(putLaboratory(data, laboratoryId));
  };

  if (loading) return <Loader />;

  if (error)
    return (
      <Message variant="danger">
        An error occurred when requesting laboratory details
      </Message>
    );

  if (laboratory)
    return (
      <Container>
        <Row className="d-flex justify-content-center ">
          <Col sm={6} className="mt-3">
            <Button
              type="button"
              className="my-3"
              onClick={() => navigate("/laboratory-list")}
            >
              Go Back
            </Button>
            <h1>Laboratory {laboratoryId}</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3" controlId="laboratory_name">
                <Form.Label>Laboratory Name:</Form.Label>
                <Form.Control
                  type="text"
                  // name="laboratory_name"
                  // value={laboratory_name}
                  // onChange={handleLabField}
                  {...register("laboratory_name", {
                    required: "Please, introduce the laboratory name",
                  })}
                  autoComplete="off"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="location">
                <Form.Label>Location:</Form.Label>
                <Form.Control
                  type="text"
                  // name="location"
                  // value={location}
                  // onChange={handleLabField}
                  {...register("location", {
                    required: "Please, introduce the laboratory location",
                  })}
                  autoComplete="off"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  // name="email"
                  // value={email}
                  // onChange={handleLabField}
                  {...register("email", {
                    required: "Please, introduce the laboratory email",
                  })}
                  autoComplete="off"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="phone_number">
                <Form.Label>Phone Number:</Form.Label>
                <Form.Control
                  type="phone"
                  // name="phone_number"
                  // value={phone_number}
                  // onChange={handleLabField}
                  {...register("phone_number", {
                    required: "Please, introduce the laboratory phone number",
                  })}
                  autoComplete="off"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description:</Form.Label>
                <Form.Control
                  type="text"
                  // name="description"
                  // value={description}
                  // onChange={handleLabField}
                  {...register("description", {
                    required: "Please, introduce the laboratory description",
                  })}
                  autoComplete="off"
                />
              </Form.Group>

              <Button type="submit" className="btn btn-primary mt-3">
                Update Laboratory
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
};
export default LaboratoryDetails;
