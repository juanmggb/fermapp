import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubstrateList } from "../lib/actions/elementActions";
import SubstrateFilterForm from "../components/SubstrateList/SubstrateFilterForm";
import SubstrateTable from "../components/SubstrateList/SubstrateTable";
import toast from "react-hot-toast";
import { SUBSTRATE_DELETE_RESET } from "../constants/elementConstants";
import Loader from "../components/general/Loader";
import Message from "../components/general/Message";
import { useLocation } from "react-router-dom";

const SubstrateList = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const search = location.search;
  // Get products from the redux store
  const substrateList = useSelector((state) => state.substrateList);
  const { error, substrates, loading } = substrateList;

  const substrateDelete = useSelector((state) => state.substrateDelete);
  const {
    error: deleteError,
    success,
    loading: deleteLoading,
  } = substrateDelete;

  useEffect(() => {
    if (!substrates) dispatch(fetchSubstrateList(search));
  }, [dispatch, substrates, search]);

  useEffect(() => {
    dispatch(fetchSubstrateList(search));
  }, [dispatch, search]);

  useEffect(() => {
    let toastId;

    if (deleteLoading) {
      toastId = toast.loading("Deleting substrate");
    }

    if (deleteError) {
      toast.dismiss(toastId);
      toast.error("An error occurred when deleting substrate");
    }

    if (success) {
      toast.dismiss(toastId);
      toast.success("Substrate deleted successfully");
      dispatch({ type: SUBSTRATE_DELETE_RESET });
    }
  }, [deleteLoading, deleteError, success, dispatch]);

  if (loading) return <Loader />;

  if (error)
    return (
      <Message variant="danger">
        An error occurred when requesting substrate list
      </Message>
    );

  if (substrates)
    return (
      <Container>
        <Row>
          <Col sm={4} className="mt-3">
            <SubstrateFilterForm />
          </Col>
          <Col sm={6}>
            <h1>Substrate List</h1>
            <SubstrateTable substrates={substrates} />
          </Col>
        </Row>
      </Container>
    );
};
export default SubstrateList;
