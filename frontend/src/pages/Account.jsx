import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loader from "../components/general/Loader";
import Message from "../components/general/Message";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import {
  useEmailUserForm,
  validateEmail,
} from "../lib/hooks/useRegisterUserForm";
import { fetchLaboratoryList } from "../lib/actions/laboratoryActions";
import style from "./Account.module.css";
import { getDisplayNameById } from "../lib/utilis/general";
import {
  fetchAccountDetails,
  updateAccount,
} from "../lib/actions/accountActions";
import { ACCOUNT_UPDATE_RESET } from "../constants/accountContants";

const Account = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const accountUpdate = useSelector((state) => state.accountUpdate);
  const { updateError, success, updateLoading } = accountUpdate;

  const accountDetail = useSelector((state) => state.accountDetail);
  const { error, account, loading } = accountDetail;

  const laboratoryList = useSelector((state) => state.laboratoryList);
  const { laboratories } = laboratoryList;

  const { email, setEmailValue, setEmailError } = useEmailUserForm();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  // Dispatch action to dispatch data initially
  useEffect(() => {
    dispatch(fetchLaboratoryList());
  }, [dispatch]);

  useEffect(() => {
    if (!account) {
      dispatch(fetchAccountDetails());
    } else {
      setEmailValue(account.email);
      setValue("name", account.name);
      setValue("role", account.role);
      setValue("laboratoryId", account.laboratory);
    }
  }, [account, dispatch, setValue]);


  // Validate username
  useEffect(() => {
    if (email.loading) {
      validateEmail(email.value, setEmailError, account.id);
    }
  }, [email.value, email.loading]);

  // Validate form fields
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

  // Show update account status
  useEffect(() => {
    let toastId;

    if (updateLoading) {
      toastId = toast.loading("Updating account");
    }

    if (updateError) {
      toast.dismiss(toastId);
      toast.error("An error occurred when updating account");
    }

    if (success) {
      toast.dismiss(toastId);
      toast.success("account updated successfully");
      dispatch({ type: ACCOUNT_UPDATE_RESET });
      navigate("/user-list");
    }
  }, [updateError, updateLoading, success, dispatch, navigate]);

  // Handle form submission
  const onSubmit = (data) => {
    toast.dismiss();

    if (data.confirmPassword !== data.password) {
      toast.error("Passwords must match");
      return;
    }
    const formData = new FormData();

    if (data.password) {
      formData.append("password", data.password);
    }

    formData.append("email", email.value);
    formData.append("name", data.name);

    if (data.laboratoryId) {
      formData.append("laboratory", data.laboratoryId);
    }

    formData.append("role", data.role);
    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
    }

    // Print formData data
    for (const entry of formData.entries()) {
    }

    dispatch(updateAccount(formData));
  };

  if (loading) return <Loader />;

  if (error)
    return (
      <Message variant="danger">
        An error occurred when requesting account details
      </Message>
    );

  if (account && laboratories)
    return (
      <Container>
        <Row className="d-flex justify-content-center mt-3">
          <h1>Account</h1>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col sm={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    className={email.error ? style.usernameError : ""}
                    type="text"
                    value={email.value}
                    onChange={(e) => setEmailValue(e.target.value)}
                    required
                  />
                  {email.error && (
                    <span className={style.error}>{email.error}</span>
                  )}

                  {email.loading && (
                    <span className={style.loading}>Loading...</span>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password (Optional):</Form.Label>
                  <Form.Control type="password" {...register("password")} />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Confirm Password:</Form.Label>
                  <Form.Control
                    type="password"
                    {...register("confirmPassword")}
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
              </Col>
              <Col sm={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Role:</Form.Label>
                  <Form.Control
                    as="select"
                    {...register("role", {
                      required: "Please, introduce the role",
                    })}
                  >
                    <option value="">Select a role</option>
                    <option value="Student Researcher">
                      Student Researcher
                    </option>

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
                        {getDisplayNameById(
                          lab.id,
                          laboratories,
                          "laboratory_name"
                        )}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId="image">
                  <Form.Label>Image (Optional)</Form.Label>
                  <Form.Control type="file" {...register("image")} />
                </Form.Group>

                <Button type="submit" className="mt-4">
                  Update Account
                </Button>
              </Col>
            </Row>
          </Form>
        </Row>
      </Container>
    );
};
export default Account;
