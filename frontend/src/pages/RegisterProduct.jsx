import { useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PRODUCT_REGISTER_RESET } from "../constants/elementConstants";
import { postProduct } from "../lib/actions/elementActions";
import { useForm } from "react-hook-form";

const RegisterProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productRegister = useSelector((state) => state.productRegister);

  const { error, success, loading } = productRegister;

  // const [productInfo, setProductInfo] = useState({
  //   name: "",
  //   type: "",
  //   market_value: "",
  //   detection_method: "",
  //   observations: "",
  // });

  // const { name, type, market_value, detection_method, observations } =
  //   productInfo;

  // const handleChangeProductField = (e) => {
  //   setProductInfo((prevProdInfo) => ({
  //     ...prevProdInfo,
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
      toastId = toast.loading("Registering product");
    }

    if (error) {
      toast.dismiss(toastId);
      toast.error("An error ocurred when registering product");
    }

    if (success) {
      toast.dismiss(toastId);
      toast.success("Product registered successfully");
      dispatch({ type: PRODUCT_REGISTER_RESET });
      navigate("/product-list");
    }
  }, [loading, error, success, dispatch, navigate]);

  useEffect(() => {
    let toastId;

    if (errors.observations) {
      toast.dismiss(toastId);
      toast.error(errors.observations.message.message);
    }

    if (errors.detection_method) {
      toast.dismiss(toastId);
      toast.error(errors.detection_method.message.message);
    }

    if (errors.market_value) {
      toast.dismiss(toastId);
      toast.error(errors.market_value.message.message);
    }

    if (errors.type) {
      toast.dismiss(toastId);
      toast.error(errors.type.message.message);
    }

    if (errors.name) {
      toast.dismiss(toastId);
      toast.error(errors.name.message.message);
    }
  }, [
    errors.name,
    errors.type,
    errors.market_value,
    errors.detection_method,
    errors.observations,
  ]);

  const onSubmit = (data) => {
    dispatch(postProduct(data));
  };

  return (
    <Container>
      <Row className="d-flex justify-content-center">
        <Col sm={6} className="mt-3">
          <h1>Register Product</h1>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                // name="name"
                // value={name}
                // onChange={handleChangeProductField}
                {...register("name", {
                  required: "Please, introduce product name",

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
                // onChange={handleChangeProductField}
                {...register("type", {
                  required: "Please, introduce product type",
                })}
                autoComplete="off"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="market_value">
              <Form.Label>Market Value:</Form.Label>
              <Form.Control
                type="number"
                step="any"
                // name="market_value"
                // value={market_value}
                // onChange={handleChangeProductField}

                {...register("market_value", {
                  valueAsNumber: true,
                  required: "Please, introduce product market value",
                })}
                autoComplete="off"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="detection_method">
              <Form.Label>Detection Method:</Form.Label>
              <Form.Control
                type="text"
                // name="detection_method"
                // value={detection_method}
                // onChange={handleChangeProductField}

                {...register("detection_method", {
                  required: "Please, introduce product detection method",
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
                // onChange={handleChangeProductField}
                {...register("observations", {
                  required: "Please, introduce product observations",
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
export default RegisterProduct;
