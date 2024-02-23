import { useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/general/Loader";
import Message from "../components/general/Message";
import style from "./UserDetails.module.css";
import { useForm } from "react-hook-form";
import { fetchUserDetails, updateUser } from "../lib/actions/userActions";
import { USER_UPDATE_RESET } from "../constants/userConstants";

const UserDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const userId = params.id;

  const userDetails = useSelector((state) => state.userDetails);
  const { error, user, loading } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { error: updateError, success, loading: updateLoading } = userUpdate;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    if (!user || Number(userId) !== user.id) {
      dispatch(fetchUserDetails(userId));
    } else {
      setValue("role", user.role);
    }
  }, [user, userId, dispatch, setValue]);

  useEffect(() => {
    let toastId;

    if (updateLoading) {
      toastId = toast.loading("Updating user");
    }

    if (updateError) {
      toast.dismiss(toastId);
      toast.error("An error occurred when updating user");
    }

    if (success) {
      toast.dismiss(toastId);
      toast.success("User updated successfully");
      dispatch({ type: USER_UPDATE_RESET });
      navigate("/user-list");
    }
  }, [updateError, updateLoading, success, dispatch, navigate]);

  useEffect(() => {
    if (errors.role) {
      toast.dismiss();
      toast.error(errors.role.message);
    }
  }, [errors.role]);

  const onSubmit = (data) => {
    dispatch(updateUser(data, userId));
  };

  if (loading) return <Loader />;

  if (error)
    return (
      <Message variant="danger">
        An error occurred when requesting member details
      </Message>
    );

  if (user)
    return (
      <Container>
        <Row
          className={`d-flex justify-content-center align-items-center ${style.row}`}
        >
          <Col sm={6}>
            <h1>Member {userId}</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group controlId="role">
                <Form.Label>Role:</Form.Label>
                <Form.Control
                  as="select"
                  {...register("role", { required: "Please, select a role" })}
                >
                  <option value="">Select a role</option>
                  <option value="Student Researcher">Student Researcher</option>
                  <option value="Lab Director">Lab Director</option>
                </Form.Control>
              </Form.Group>

              <Button type="submit" className="mt-3">
                Update Member
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
};
export default UserDetails;
