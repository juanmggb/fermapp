import { useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserList } from "../lib/actions/userActions";
// import { postLaboratory } from "../lib/actions/laboratoryActions";
import toast from "react-hot-toast";
import { RESET_REGISTER_LABORATORY } from "../constants/laboratoryConstants";
import { useNavigate } from "react-router-dom";
import Loader from "../components/general/Loader";
import Message from "../components/general/Message";
import { useForm } from "react-hook-form";
import { postLaboratory } from "../lib/actions/laboratoryActions";

const RegisterLaboratory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userList = useSelector((state) => state.userList);
  const { loading, users, error } = userList;

  const laboratoryRegister = useSelector((state) => state.laboratoryRegister);
  const {
    loading: registerLoading,
    success,
    error: registerError,
  } = laboratoryRegister;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dispatch(fetchUserList());
  }, [dispatch]);

  useEffect(() => {
    let toastId;
    if (registerLoading) {
      toastId = toast.loading("Registering laboratory");
    }

    if (registerError) {
      toast.dismiss(toastId);
      toast.error("An error occurred when registering the laboratory");
    }

    if (success) {
      toast.dismiss(toastId);
      toast.success("Laboratory registered successfully");
      dispatch({ type: RESET_REGISTER_LABORATORY });
      navigate("/laboratory-list");
    }
  });

  useEffect(() => {
    if (errors.description) {
      toast.dismiss();
      toast.error(errors.description.message);
    }

    if (errors.location) {
      toast.dismiss();
      toast.error(errors.location.message);
    }

    if (errors.phone_number) {
      toast.dismiss();
      toast.error(errors.phone_number.message);
    }

    if (errors.email) {
      toast.dismiss();
      toast.error(errors.email.message);
    }

    if (errors.laboratory_name) {
      toast.dismiss();
      toast.error(errors.laboratory_name.message);
    }

    if (errors.directorId) {
      toast.dismiss();
      toast.error(errors.directorId.message);
    }
  }, [
    errors.directorId,
    errors.laboratory_name,
    errors.email,
    errors.phone_number,
    errors.location,
    errors.description,
  ]);

  const onSubmit = (data) => {
    console.log(data);

    dispatch(
      postLaboratory({
        director: data.directorId,
        laboratory_name: data.laboratory_name,
        email: data.email,
        phone_number: data.phone_number,
        location: data.location,
        description: data.description,
      })
    );
  };

  console.log(users);

  if (loading) return <Loader />;

  if (error)
    return (
      <Message variant="danger">
        An error occurred when requesting director list
      </Message>
    );

  if (users)
    return (
      <Container>
        <Row className="d-flex justify-content-center">
          <Col sm={6} className="mt-3">
            <h1>Register Laboratory</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3" controlId="director">
                <Form.Label>Laboratory Director:</Form.Label>
                <Form.Control
                  as="select"
                  // value={directorId}
                  // onChange={handleLabField}
                  {...register("directorId", {
                    required: "Please, select a Lab Director",
                  })}
                  autoComplete="off"
                >
                  <option value="">Select a Lab Director</option>
                  {users.map((director) => (
                    <option key={director.id} value={director.id}>
                      {director.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group className="mb-3" controlId="laboratory_name">
                <Form.Label>Laboratory Name:</Form.Label>
                <Form.Control
                  type="text"
                  // value={laboratory_name}
                  // onChange={handleLabField}
                  {...register("laboratory_name", {
                    required: "Please, introduce the laboratory name",
                  })}
                  autoComplete="off"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  // value={email}
                  // onChange={handleLabField}
                  {...register("email", {
                    required: "Please, introduce the laboratory email",
                  })}
                  autoComplete="off"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="phone">
                <Form.Label>Phone Number:</Form.Label>
                <Form.Control
                  type="phone"
                  // value={phone_number}
                  // onChange={handleLabField}
                  {...register("phone_number", {
                    required: "Please, introduce the laboratory phone number",
                  })}
                  autoComplete="off"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="location">
                <Form.Label>Location:</Form.Label>
                <Form.Control
                  type="text"
                  // value={location}
                  // onChange={handleLabField}
                  {...register("location", {
                    required: "Please, introduce the laboratory location",
                  })}
                  autoComplete="off"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description:</Form.Label>
                <Form.Control
                  type="text"
                  // value={description}
                  // onChange={handleLabField}
                  {...register("description", {
                    required: "Please, introduce the laboratory description",
                  })}
                  autoComplete="off"
                />
              </Form.Group>

              <Button type="submit" className="mt-3">
                Register Laboratory
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
};
export default RegisterLaboratory;

// Optimization Suggestions: Based on the estimated parameters, provide suggestions for optimal operational conditions.
