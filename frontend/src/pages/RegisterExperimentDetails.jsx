import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMicroorganismList,
  fetchProductList,
  fetchSubstrateList,
} from "../lib/actions/elementActions";
import { fetchLaboratoryList } from "../lib/actions/laboratoryActions";
import RegisterExperimentSteps from "../components/general/RegisterExperimentSteps";
import { getDisplayNameById } from "../lib/utilis/general";
import { fetchUserList } from "../lib/actions/userActions";

const RegisterExperimentDetails = () => {
  // Function to dispatch actions
  const dispatch = useDispatch();

  // Function to navigate in the application
  const navigate = useNavigate();

  // Get microorganisms from the Redux store
  const microorganismList = useSelector((state) => state.microorganismList);
  const { microorganisms } = microorganismList;

  // Get products from the redux store
  const productList = useSelector((state) => state.productList);
  const { products } = productList;

  // Get substrates from the redux store
  const substrateList = useSelector((state) => state.substrateList);
  const { substrates } = substrateList;

  const userList = useSelector((state) => state.userList);
  const { users } = userList;

  const laboratoryList = useSelector((state) => state.laboratoryList);
  const { laboratories } = laboratoryList;

  const [experimentInfo, setExperimentInfo] = useState({
    authorId: "",
    supervisorId: "",
    laboratoryId: "",
    microorganismId: "",
    productId: "",
    experimentType: "",
    observations: "",
  });

  const {
    authorId,
    laboratoryId,
    substrateId,
    microorganismId,
    productId,
    experimentType,
    observations,
  } = experimentInfo;

  const handleChangeExperimentField = (e) => {
    setExperimentInfo((prevExpInfo) => ({
      ...prevExpInfo,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    dispatch(fetchMicroorganismList());
    dispatch(fetchSubstrateList());
    dispatch(fetchProductList());
    dispatch(fetchUserList());
    dispatch(fetchLaboratoryList());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();


    localStorage.setItem(
      "experimentDetails",
      JSON.stringify({
        author: authorId,
        author_name: getDisplayNameById(authorId, users, "name"),
        experiment_type: experimentType,
        laboratory: laboratoryId,
        laboratory_name: getDisplayNameById(
          laboratoryId,
          laboratories,
          "laboratory_name"
        ),
        microorganism: microorganismId,
        observations,
        product: productId,
        substrate: substrateId,
      })
    );

    navigate("/register-exp-variables");
  };


  if (laboratories && users && microorganisms && products && substrates)
    return (
      <Container>
        <RegisterExperimentSteps step1 />
        <Row className="d-flex justify-content-center mt-3">
          <h1>Register Experiment Details</h1>
          {/* className = "mx-auto" */}
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-4" controlId="authorId">
                  <Form.Label>Author:</Form.Label>
                  <Form.Control
                    as="select"
                    name="authorId"
                    value={authorId}
                    onChange={handleChangeExperimentField}
                    required
                  >
                    <option value="">Select an Author</option>
                    {users.map((member) => (
                      <option key={member.id} value={member.id}>
                        {member.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group className="mb-4" controlId="laboratoryId">
                  <Form.Label>Laboratory:</Form.Label>
                  <Form.Control
                    as="select"
                    name="laboratoryId"
                    value={laboratoryId}
                    onChange={handleChangeExperimentField}
                    required
                  >
                    <option value="">Select a Laboratory</option>
                    {laboratories.map((lab) => (
                      <option key={lab.id} value={lab.id}>
                        {lab.laboratory_name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group className="mb-4" controlId="experimentType">
                  <Form.Label>Experiment Type:</Form.Label>
                  <Form.Control
                    as="select"
                    name="experimentType"
                    value={experimentType}
                    onChange={handleChangeExperimentField}
                    required
                  >
                    <option value="">Select an Experiment Type</option>
                    <option value="kinetic">Kinetic growth</option>
                    <option value="process optimization">
                      Fermentation data
                    </option>
                  </Form.Control>
                </Form.Group>

                <Form.Group className="mb-4" controlId="observations">
                  <Form.Label>Observations (Optional)</Form.Label>
                  <Form.Control
                    type="text"
                    name="observations"
                    value={observations}
                    onChange={handleChangeExperimentField}
                    autoComplete="off"
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-4" controlId="microorganism">
                  <Form.Label>Microorganism:</Form.Label>
                  <Form.Control
                    as="select"
                    name="microorganismId"
                    value={microorganismId}
                    onChange={handleChangeExperimentField}
                    required
                  >
                    <option value="">Select a Microorganism</option>
                    {microorganisms.map((mo) => (
                      <option key={mo.id} value={mo.id}>
                        {mo.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group className="mb-4" controlId="substrate">
                  <Form.Label>Substrate:</Form.Label>
                  <Form.Control
                    as="select"
                    name="substrateId"
                    value={substrateId}
                    onChange={handleChangeExperimentField}
                    required
                  >
                    <option value="">Select a Substrate</option>
                    {substrates.map((substrate) => (
                      <option key={substrate.id} value={substrate.id}>
                        {substrate.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group className="mb-4" controlId="productId">
                  <Form.Label>Product</Form.Label>
                  <Form.Control
                    as="select"
                    name="productId"
                    value={productId}
                    onChange={handleChangeExperimentField}
                    required
                  >
                    <option value="">Select a Product</option>
                    {products.map((prod) => (
                      <option key={prod.id} value={prod.id}>
                        {prod.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Button type="submit" className="mt-4">
                  Register Experiment Details
                </Button>
              </Col>
            </Row>
          </Form>
        </Row>
      </Container>
    );
};

export default RegisterExperimentDetails;
