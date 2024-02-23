import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchLaboratoryList } from "../lib/actions/laboratoryActions";
import LaboratoryFilterForm from "../components/LaboratoryList/LaboratoryFilterForm";
import LaboratoryTable from "../components/LaboratoryList/LaboratoryTable";
import toast from "react-hot-toast";
import { RESET_LABORATORY_DELETE } from "../constants/laboratoryConstants";
import Loader from "../components/general/Loader";
import Message from "../components/general/Message";
import { useLocation } from "react-router-dom";

const LaboratoryList = () => {
  const dispatch = useDispatch();

  const location = useLocation();
  const search = location.search;

  console.log(search);

  const laboratoryList = useSelector((state) => state.laboratoryList);

  const { error, laboratories, loading } = laboratoryList;

  const laboratoryDelete = useSelector((state) => state.laboratoryDelete);
  const {
    error: deleteError,
    success,
    loading: deleteLoading,
  } = laboratoryDelete;

  useEffect(() => {
    if (!laboratories) {
      dispatch(fetchLaboratoryList(search));
    }
  }, [laboratories, dispatch, search]);

  useEffect(() => {
    dispatch(fetchLaboratoryList(search));
  }, [search, dispatch]);

  useEffect(() => {
    let toastId;
    if (deleteLoading) {
      toastId = toast.loading("Deleting laboratory");
    }

    if (deleteError) {
      toast.dismiss(toastId);
      toast.error("An error occurred when deleting laboratory");
    }

    if (success) {
      toast.dismiss(toastId);
      toast.success("Laboratory deleted successfully");
      dispatch({ type: RESET_LABORATORY_DELETE });
    }
  }, [deleteLoading, deleteError, success, dispatch]);

  if (loading) return <Loader />;

  if (error)
    return (
      <Message variant="danger">
        An error occurred when requesting laboratory list
      </Message>
    );

  if (laboratories)
    return (
      <Container>
        <Row>
          <Col sm={4} className="mt-3">
            <LaboratoryFilterForm />
          </Col>

          <Col sm={6}>
            <h1>Laboratory List</h1>
            <LaboratoryTable laboratories={laboratories} />
          </Col>
        </Row>
      </Container>
    );
};
export default LaboratoryList;
