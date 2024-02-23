import { useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchProductDetails,
  updateProduct,
} from "../lib/actions/elementActions";
import toast from "react-hot-toast";
import { PRODUCT_UPDATE_RESET } from "../constants/elementConstants";
import Loader from "../components/general/Loader";
import Message from "../components/general/Message";
import { useForm } from "react-hook-form";

const ProductDetails = () => {
  const params = useParams();
  const productId = params.id;

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const productDetails = useSelector((state) => state.productDetails);
  const { error, product, loading } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);

  const { error: updateError, success, loading: updateLoading } = productUpdate;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    if (!product || Number(productId) !== product.id) {
      dispatch(fetchProductDetails(productId));
    } else {
      setValue("name", product.name);
      setValue("type", product.type);
      setValue("market_value", product.market_value);
      setValue("detection_method", product.detection_method);
      setValue("observations", product.observations);
    }
  }, [dispatch, product, productId, setValue]);

  useEffect(() => {
    let toastId;

    if (updateLoading) {
      toastId = toast.loading("Updating product");
    }

    if (updateError) {
      toast.dismiss(toastId);
      toast.error("An error occurred when updating product");
    }

    if (success) {
      toast.dismiss(toastId);
      toast.success("Product updated successfully");

      dispatch({ type: PRODUCT_UPDATE_RESET });

      navigate("/product-list");
    }
  });

  useEffect(() => {
    if (errors.observations) {
      toast.dismiss();
      toast.error(errors.observations.message);
    }
    if (errors.detection_method) {
      toast.dismiss();
      toast.error(errors.detection_method.message);
    }
    if (errors.market_value) {
      toast.dismiss();
      toast.error(errors.market_value.message);
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
    errors.market_value,
    errors.detection_method,
    errors.observations,
  ]);

  const onSubmit = (data) => {
    dispatch(updateProduct(data, productId));
  };

  if (loading) return <Loader />;

  if (error)
    return (
      <Message variant="danger">
        An error occurred when requesting product details
      </Message>
    );

  if (product)
    return (
      <Container>
        <Row className="d-flex justify-content-center">
          <Col sm={6} className="mt-3">
            <Button
              className="my-3"
              type="button"
              onClick={() => navigate("/product-list")}
            >
              Go Back
            </Button>
            <h1>Product {productId}</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group controlId="name">
                <Form.Label>Name:</Form.Label>
                <Form.Control
                  type="text"
                  {...register("name", {
                    required: "Please, introduce the product name",
                  })}
                  autoComplete="off"
                />
              </Form.Group>

              <Form.Group controlId="type">
                <Form.Label>Type:</Form.Label>
                <Form.Control
                  type="text"
                  {...register("type", {
                    required: "Please, introduce the product type",
                  })}
                  autoComplete="off"
                />
              </Form.Group>

              <Form.Group controlId="market_value">
                <Form.Label>Market Value:</Form.Label>
                <Form.Control
                  type="number"
                  step="any"
                  {...register("market_value", {
                    valueAsNumber: true,
                    required: "Please, introduce the product market value",
                  })}
                  autoComplete="off"
                />
              </Form.Group>

              <Form.Group controlId="detection_method">
                <Form.Label>Detection Method:</Form.Label>
                <Form.Control
                  type="text"
                  {...register("detection_method", {
                    required: "Please, introduce the product detection method",
                  })}
                  autoComplete="off"
                />
              </Form.Group>

              <Form.Group controlId="observations">
                <Form.Label>Observations:</Form.Label>
                <Form.Control
                  type="text"
                  {...register("observations", {
                    required: "Please, introduce the product observations",
                  })}
                  autoComplete="off"
                />
              </Form.Group>

              <Button type="submit" className="mt-3">
                Update Product
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
};
export default ProductDetails;
