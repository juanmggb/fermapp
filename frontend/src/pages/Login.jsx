import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../lib/actions/sessionActions";
import { isValidPassword } from "../lib/utilis/users";

const Login = () => {
  // Function to dispatch actions
  const dispatch = useDispatch();

  // Function to navigate in application
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, token, error } = userLogin;

  const setEmail = (newEmail) => {
    toast.dismiss();

    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      email: newEmail,
    }));
  };

  const setPassword = (newPassword) => {
    if (isValidPassword(newPassword) || !newPassword) {
      setCredentials((prevCredentials) => ({
        ...prevCredentials,
        password: newPassword,
      }));
    } else {
      toast.error("Invalid password. Only letters and numbers are allowed.");
    }
  };

  useEffect(() => {
    let toastId;
    if (loading) {
      toastId = toast.loading("Login user ...");
    }

    if (token) {
      toast.dismiss(toastId);
      toast.success("Login successfully");

      navigate("/");
    }

    if (error) {
      toast.dismiss(toastId);
      toast.error(error);
    }
  }, [navigate, token, error, loading]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(login(credentials));
  };

  return (
    <Container>
      <Row
        className="d-flex justify-content-center align-items-center"
        style={{ height: "70vh" }}
      >
        <Col md={4}>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="text"
                value={credentials.email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                value={credentials.password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button type="submit" className="mt-3">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
export default Login;
