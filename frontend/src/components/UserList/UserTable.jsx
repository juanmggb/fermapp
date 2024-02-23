import Table from "react-bootstrap/Table";
import UserDetailsModal from "./UserDetailsModal";
import style from "./UserTable.module.css";
import { useUserDetailsModal } from "../../lib/hooks/useUserDetailsModal";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../lib/actions/userActions";
import toast from "react-hot-toast";
import DeleteObjectConfirm from "../general/DeleteObjectConfirm";
import { USER_DETAIL_REQUEST } from "../../constants/userConstants";

const UserTable = ({ users }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    userDetailsModal,
    showUserDetailsModal,
    handleShowUserDetailsModal,
    handleHideUserDetailsModal,
  } = useUserDetailsModal(users);

  const handleMemberDetails = (memberId) => {
    dispatch({ type: USER_DETAIL_REQUEST });
    navigate(`/users/${memberId}`);
  };

  const handleUserDelete = (userId) => {
    toast.dismiss();
    toast(
      (t) => (
        <DeleteObjectConfirm
          t={t}
          onDelete={() => dispatch(deleteUser(userId))}
          object={`User ${userId}`}
        />
      ),
      {
        duration: 5000,
      }
    );
  };

  return (
    <div className={style.tableContainer}>
      <Table striped bordered hover>
        <thead className={style.tableHeader}>
          <tr>
            <th>ID</th>
            <th>IMAGE</th>
            <th>NAME</th>
            <th>LABORATORY</th>
            <th>ROLE</th>
            <th>EDIT</th>
            <th>DELETE</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className={style.tableRow}
              onClick={() => handleShowUserDetailsModal(user.id)}
            >
              <td>{user.id}</td>
              <td>
                <img
                  width="100px"
                  src={`http://127.0.0.1${user.image}`}
                  alt={user.name}
                />
              </td>
              <td>{user.name}</td>
              <td>
                {user.laboratory_name ? user.laboratory_name : "Not available"}
              </td>
              <td>{user.role}</td>
              <td
                onClick={(e) => {
                  e.stopPropagation();
                  handleMemberDetails(user.id);
                }}
              >
                <i className="fa-solid fa-pen-to-square"></i>
              </td>
              <td
                onClick={(e) => {
                  e.stopPropagation();
                  handleUserDelete(user.id, user.user);
                }}
              >
                <i className="fa-solid fa-trash"></i>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {showUserDetailsModal && (
        <div>
          <UserDetailsModal
            user={userDetailsModal}
            show={showUserDetailsModal}
            handleClose={handleHideUserDetailsModal}
          />
        </div>
      )}
    </div>
  );
};

export default UserTable;
