import { Col, Container, Row } from "react-bootstrap";
import ExperimentTable from "../components/ExperimentList/ExperimentTable";
import ExperimentFilters from "../components/ExperimentList/ExperimentFilters";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchExperimentList } from "../lib/actions/experimentActions";
import toast from "react-hot-toast";
import { EXPERIMENT_DELETE_RESET } from "../constants/experimentConstants";
import Loader from "../components/general/Loader";
import Message from "../components/general/Message";
import { useLocation } from "react-router-dom";

const ExperimentList = () => {
  const dispatch = useDispatch();

  const location = useLocation();
  const search = location.search;


  const experimentList = useSelector((state) => state.experimentList);

  const { loading, experiments, error } = experimentList;

  const experimentDelete = useSelector((state) => state.experimentDelete);

  const {
    error: deleteError,
    success,
    loading: deleteLoading,
  } = experimentDelete;

  useEffect(() => {
    if (!experiments) dispatch(fetchExperimentList(search));
  }, [dispatch, experiments, search]);

  // If search changes request experiment list
  useEffect(() => {
    dispatch(fetchExperimentList(search));
  }, [search, dispatch]);

  useEffect(() => {
    let toastId;

    if (deleteLoading) {
      toast.loading("Deleting experiment");
    }

    if (deleteError) {
      toast.dismiss(toastId);
      toast.error("An error occurred when deleting the experiment");
    }

    if (success) {
      toast.dismiss(toastId);
      toast.success("Experiment deleted successfully");
      dispatch({ type: EXPERIMENT_DELETE_RESET });
    }
  }, [deleteError, deleteLoading, success, dispatch]);

  if (loading) return <Loader />;

  if (error)
    return (
      <Message variant="danger">
        An error occurred when requesting experiment list
      </Message>
    );

  if (experiments)
    return (
      <Container fluid="lg">
        {/* This restricts the Container width to the 'lg' brackpoint size */}
        <Row className="mt-3 py-3 ">
          {/* Sidebar */}
          <Col lg={3} md={4} sm={12} className="my-3 py-3 mx-3">
            {/* Adjust the column size for various breakpoints */}
            <ExperimentFilters />
          </Col>
          {/* Mainpanel */}
          <Col lg={8} md={8} sm={12} className="mx-3">
            <h1 className="text-center">Experiment List</h1>
            <ExperimentTable experiments={experiments} />
          </Col>
        </Row>
      </Container>
    );
};
export default ExperimentList;
