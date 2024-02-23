import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchExperimentDetails,
  updateExperiment,
} from "../lib/actions/experimentActions";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import style from "./ExperimentDetails.module.css";
import {
  fetchMicroorganismList,
  fetchProductList,
  fetchSubstrateList,
} from "../lib/actions/elementActions";
import Loader from "../components/general/Loader";
import Message from "../components/general/Message";
import toast from "react-hot-toast";
import { EXPERIMENT_UPDATE_RESET } from "../constants/experimentConstants";
import { useForm } from "react-hook-form";
import { getDisplayNameById } from "../lib/utilis/general";

const ExperimentDetails = () => {
  const dispatch = useDispatch();

  // const navigate = useNavigate()

  const params = useParams();

  const experimentId = params.id;

  const experimentDetails = useSelector((state) => state.experimentDetails);

  const { loading, experiment, error } = experimentDetails;

  // Function to navigate in the application
  const navigate = useNavigate();

  // Get microorganisms from the Redux store
  const microorganismList = useSelector((state) => state.microorganismList);
  const { microorganisms } = microorganismList;

  // Get products from the redux store
  const productList = useSelector((state) => state.productList);
  const { products } = productList;

  // Get products from the redux store
  const substrateList = useSelector((state) => state.substrateList);
  const { substrates } = substrateList;

  const experimentUpdate = useSelector((state) => state.experimentUpdate);

  const {
    error: updateError,
    success,
    loading: updateLoading,
  } = experimentUpdate;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    if (!experiment || Number(experimentId) !== experiment.id) {
      dispatch(fetchExperimentDetails(experimentId));
    } else {
      setValue("substrateId", experiment.substrate);
      setValue("microorganismId", experiment.microorganism);
      setValue("productId", experiment.product);
      setValue("experiment_type", experiment.experiment_type);
      setValue("observations", experiment.observations);
    }
  }, [dispatch, experimentId, experiment, setValue]);

  useEffect(() => {
    dispatch(fetchMicroorganismList());
    dispatch(fetchSubstrateList());
    dispatch(fetchProductList());
  }, []);

  useEffect(() => {
    let toastId;

    if (updateLoading) {
      toastId = toast.loading("Updating experiment");
    }

    if (updateError) {
      toast.dismiss(toastId);
      toast.error("An error occurred when updating the experiment");
    }

    if (success) {
      toast.dismiss(toastId);
      toast.success("Experiment updated successfully");
      dispatch({ type: EXPERIMENT_UPDATE_RESET });
      navigate("/experiment-list");
    }
  }, [updateError, updateLoading, success, dispatch, navigate]);

  useEffect(() => {
    if (errors.observations) {
      toast.dismiss();
      toast.error(errors.observations.message);
    }

    if (errors.experiment_type) {
      toast.dismiss();
      toast.error(errors.experiment_type.message);
    }

    if (errors.productId) {
      toast.dismiss();
      toast.error(errors.productId.message);
    }

    if (errors.microorganismId) {
      toast.dismiss();
      toast.error(errors.microorganismId.message);
    }

    if (errors.substrateId) {
      toast.dismiss();
      toast.error(errors.substrateId.message);
    }
  }, [
    errors.substrateId,
    errors.productId,
    errors.microorganismId,
    errors.experiment_type,
    errors.observations,
  ]);

  const onSubmit = (data) => {
    console.log(data);
    dispatch(updateExperiment(data, experimentId));
  };

  if (loading) return <Loader />;

  if (error)
    return (
      <Message variant="danger">
        An error occurred when requesting experiment details
      </Message>
    );
  if (experiment && microorganisms && products && substrates)
    return (
      <Container fluid className={style.wrapper}>
        <Row className="d-flex justify-content-center">
          <Col sm={6} className="px-5">
            <Button
              type="button"
              className="my-3"
              onClick={() => navigate("/experiment-list")}
            >
              Go Back
            </Button>
            <h1 className={style.title}>Experiment {experimentId}</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3" controlId="substrate">
                <Form.Label>Substrate:</Form.Label>
                <Form.Control
                  as="select"
                  {...register("substrateId", {
                    valueAsNumber: true,
                    required: "Please, select the substrate",
                  })}
                >
                  <option value="">Select a substrate</option>
                  {substrates.map((substrate) => (
                    <option key={substrate.id} value={substrate.id}>
                      {getDisplayNameById(substrate.id, substrates, "name")}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group className="mb-3" controlId="microorganism">
                <Form.Label>Microorganism:</Form.Label>
                <Form.Control
                  as="select"
                  {...register("microorganismId", {
                    valueAsNumber: true,
                    required: "Please, select the microorganism",
                  })}
                >
                  <option value="">Select a microorganism</option>
                  {microorganisms.map((mo) => (
                    <option key={mo.id} value={mo.id}>
                      {getDisplayNameById(mo.id, microorganisms, "name")}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group className="mb-3" controlId="productId">
                <Form.Label>Product:</Form.Label>
                <Form.Control
                  as="select"
                  {...register("productId", {
                    valueAsNumber: true,
                    required: "Please, select the product",
                  })}
                >
                  <option value="">Select a product</option>
                  {products.map((prod) => (
                    <option key={prod.id} value={prod.id}>
                      {getDisplayNameById(prod.id, products, "name")}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group className="mb-3" controlId="experimentType">
                <Form.Label>Experiment Type:</Form.Label>
                <Form.Control
                  as="select"
                  {...register("experiment_type", {
                    required: "Please, select the experiment type",
                  })}
                >
                  <option value="">Select an Experiment Type</option>
                  <option value="kinetic">Kinetic growth</option>
                  <option value="process optimization">
                    Fermentation data
                  </option>
                </Form.Control>
              </Form.Group>

              <Form.Group className="mb-3" controlId="observations">
                <Form.Label>Observations (Optional):</Form.Label>
                <Form.Control
                  type="text"
                  name="observations"
                  {...register("observations", {
                    required: "Please, select the observations",
                  })}
                  autoComplete="off"
                ></Form.Control>
              </Form.Group>

              <Button className="mt-3" type="submit">
                Update Experiment
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
};
export default ExperimentDetails;
