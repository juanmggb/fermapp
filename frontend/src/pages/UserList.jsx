import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";
import style from "./UserList.module.css";
import UserFilters from "../components/UserList/UserFilters";
import UserTable from "../components/UserList/UserTable";
import toast from "react-hot-toast";
import { USER_DELETE_RESET } from "../constants/userConstants";
import Loader from "../components/general/Loader";
import Message from "../components/general/Message";
import { useLocation } from "react-router-dom";
import { fetchUserList } from "../lib/actions/userActions";
// import { useNavigate } from "react-router-dom";

const UserList = () => {
  // Function to dispatch actions
  const dispatch = useDispatch();
  const location = useLocation();

  const search = location.search;

  // Function to navigate in the application
  // const navigate = useNavigate()

  const userList = useSelector((state) => state.userList);
  const { loading, users, error } = userList;

  const userDelete = useSelector((state) => state.userDelete);

  const { error: deleteError, success, loading: deleteLoading } = userDelete;

  useEffect(() => {
    if (!users) dispatch(fetchUserList(search));
  }, [dispatch, users, search]);

  useEffect(() => {
    dispatch(fetchUserList(search));
  }, [dispatch, search]);

  useEffect(() => {
    let toastId;

    if (deleteLoading) {
      toastId = toast.loading("Deleting member");
    }

    if (deleteError) {
      toast.dismiss(toastId);
      toast.error("An error ocurred when deleting member");
    }

    if (success) {
      toast.dismiss(toastId);
      toast.success("Member deleted successfully");
      dispatch({ type: USER_DELETE_RESET });
    }
  }, [deleteLoading, deleteError, success, dispatch]);

  if (loading) return <Loader />;

  if (error)
    return (
      <Message variant="danger">
        An error occurred when requesting member list
      </Message>
    );

  if (users)
    return (
      <Container>
        <Row>
          {/* Sidebar */}
          <Col md={3} className={`mt-3 ${style.sidebar}`}>
            <UserFilters />
          </Col>
          {/* Mainpanel */}
          <Col md={9} className={style.mainPanel}>
            <h1>User List</h1>
            <UserTable users={users} />
          </Col>
        </Row>
      </Container>
    );
};
export default UserList;
