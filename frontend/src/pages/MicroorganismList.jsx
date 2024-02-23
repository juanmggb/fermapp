import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { fetchMicroorganismList } from "../lib/actions/elementActions";
import MicroorganismTable from "../components/MicroorganismList/MicroorganismTable";
import MicroorganismFilterForm from "../components/MicroorganismList/MicroorganismFilterForm";
import toast from "react-hot-toast";
import { MICROORGANISM_DELETE_RESET } from "../constants/elementConstants";
import Loader from "../components/general/Loader";
import Message from "../components/general/Message";
import { useLocation } from "react-router-dom";

const MicroorganismList = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const search = location.search;

  const microorganismList = useSelector((state) => state.microorganismList);
  const { error, microorganisms, loading } = microorganismList;

  const microorganismDelete = useSelector((state) => state.microorganismDelete);
  const {
    error: deleteError,
    success,
    loading: deleteLoading,
  } = microorganismDelete;

  useEffect(() => {
    if (!microorganisms) dispatch(fetchMicroorganismList(search));
  }, [dispatch, microorganisms, search]);

  useEffect(() => {
    dispatch(fetchMicroorganismList(search));
  }, [dispatch, search]);

  useEffect(() => {
    let toastId;
    if (deleteLoading) {
      toastId = toast.loading("deleting microorganism");
    }

    if (deleteError) {
      toast.dismiss(toastId);
      toast.error("An error ocurred when deleting the microorganism");
    }

    if (success) {
      toast.dismiss(toastId);
      toast.success("Microorganism deleted successfully");

      dispatch({ type: MICROORGANISM_DELETE_RESET });
    }
  }, [deleteLoading, deleteError, success, dispatch]);

  if (loading) return <Loader />;

  if (error)
    return (
      <Message variant="danger">
        An error occurred when requesting microorganism list
      </Message>
    );

  if (microorganisms)
    return (
      <Container>
        <Row>
          <Col sm={4} className="mt-3">
            <MicroorganismFilterForm />
          </Col>
          <Col sm={6}>
            <h1>Microorganism List</h1>
            <MicroorganismTable microorganisms={microorganisms} />
          </Col>
        </Row>
      </Container>
    );
};
export default MicroorganismList;
