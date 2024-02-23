import { useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

import style from "./RegisterUser.module.css";
import {
  useEmailUserForm,
  validateEmail,
} from "../lib/hooks/useRegisterUserForm";
import { useDispatch, useSelector } from "react-redux";
import { postUser } from "../lib/actions/userActions";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { USER_REGISTER_RESET } from "../constants/userConstants";
import { fetchLaboratoryList } from "../lib/actions/laboratoryActions";
import { useForm } from "react-hook-form";

const RegisterUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userRegister = useSelector((state) => state.userRegister);

  const { loading, success, error } = userRegister;
  const laboratoryList = useSelector((state) => state.laboratoryList);

  const { laboratories } = laboratoryList;

  const { email, setEmailValue, setEmailError } = useEmailUserForm();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dispatch(fetchLaboratoryList());
  }, [dispatch]);

  useEffect(() => {
    let toastId;
    if (loading) {
      toastId = toast.loading("Registering user");
    }

    if (error) {
      toast.dismiss(toastId); // Dismiss the loading toast if there's an error
      toast.error("An error occurred when registering user");
    }

    if (success) {
      toast.dismiss(toastId); // Dismiss the loading toast if registration succeeds
      toast.success("User registered successfully");
      dispatch({ type: USER_REGISTER_RESET });
      navigate("/user-list");
    }
  }, [loading, error, success, dispatch, navigate]);

  useEffect(() => {
    return () => {
      toast.dismiss();
    };
  }, []);

  useEffect(() => {
    if (errors.role) {
      toast.dismiss();
      toast.error(errors.role.message);
    }

    if (errors.name) {
      toast.dismiss();
      toast.error(errors.name.message);
    }

    if (errors.confirmPassword) {
      toast.dismiss();
      toast.error(errors.confirmPassword.message);
    }

    if (errors.password) {
      toast.dismiss();
      toast.error(errors.password.message);
    }
  }, [errors.password, errors.confirmPassword, errors.name, errors.role]);

  useEffect(() => {
    if (email.loading) {
      validateEmail(email.value, setEmailError);
    }
  }, [email.value, email.loading]);

  const onSubmit = (data) => {
    toast.dismiss();

    if (data.confirmPassword !== data.password) {
      toast.error("Passwords must match");
      return;
    }

    const formData = new FormData();

    formData.append("email", email.value);
    formData.append("password", data.password);
    formData.append("name", data.name);

    if (data.laboratoryId) {
      formData.append("laboratoryId", data.laboratoryId);
    }

    formData.append("role", data.role);
    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
    }

    // Print formData data
    for (const entry of formData.entries()) {
    }

    dispatch(postUser(formData));
  };

  if (laboratories)
    return (
      <Container>
        <Row className="d-flex justify-content-center">
          <Col md={6} className="mt-3">
            <h1>Register Member</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  className={email.error ? style.usernameError : ""}
                  type="text"
                  value={email.value}
                  onChange={(e) => setEmailValue(e.target.value)}
                  required
                // {...register("username", {
                //   required: "Please, introduce the username",
                // })}
                />
                {email.error && (
                  <span className={style.error}>{email.error}</span>
                )}

                {email.loading && (
                  <span className={style.loading}>Loading...</span>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  {...register("password", {
                    required: "Please, introduce the password",
                  })}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Confirm Password:</Form.Label>
                <Form.Control
                  type="password"
                  {...register("confirmPassword", {
                    required: "Please, confirm the password",
                  })}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Name:</Form.Label>
                <Form.Control
                  type="text"
                  {...register("name", {
                    required: "Please, introduce the name",
                  })}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Role:</Form.Label>
                <Form.Control
                  as="select"
                  {...register("role", {
                    required: "Please, introduce the role",
                  })}
                >
                  <option value="">Select a role</option>
                  <option value="Student Researcher">Student Researcher</option>

                  <option value="Lab Director">Lab Director</option>
                </Form.Control>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Laboratory (Optional):</Form.Label>
                <Form.Control
                  as="select"
                  {...register("laboratoryId", {
                    valueAsNumber: true,
                  })}
                >
                  <option value="">Select a laboratory</option>
                  {laboratories.map((lab) => (
                    <option key={lab.id} value={lab.id}>
                      {lab.laboratory_name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group className="mb-3" controlId="image">
                <Form.Label>Image (Optional)</Form.Label>
                <Form.Control type="file" {...register("image")} />
              </Form.Group>

              <Button className="btn btn-primary mt-3" type="submit">
                Register User
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
};
export default RegisterUser;
