import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useMicroorganismDetailsModal } from "../../lib/hooks/microorganismDetailsModal";
import MicroorganismDetailsModal from "./MicroorganismDetailsModal";

import style from "./MicroorganismTable.module.css";
import { useDispatch } from "react-redux";
import { deleteMicroorganism } from "../../lib/actions/elementActions";
import DeleteObjectConfirm from "../general/DeleteObjectConfirm";
import toast from "react-hot-toast";
import { MICROORGANISM_DETAILS_RESET } from "../../constants/elementConstants";

const MicroorganismTable = ({ microorganisms }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const {
    microorganismDetailsModal,
    showMicroorganismDetailsModal,
    handleShowMicroorganismDetailsModal,
    handleHideMicroorganismDetailsModal,
  } = useMicroorganismDetailsModal(microorganisms);

  const handleMicroorganismDetails = (microorganismId) => {
    dispatch({ type: MICROORGANISM_DETAILS_RESET });
    navigate(`/microorganisms/${microorganismId}`);
  };

  const handleMicroorganismDelete = (microorganismId) => {
    toast.dismiss();
    toast(
      (t) => (
        <DeleteObjectConfirm
          t={t}
          onDelete={() => dispatch(deleteMicroorganism(microorganismId))}
          object={`microorganism ${microorganismId}`}
        />
      ),
      {
        duration: 5000,
      }
    );
  };

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>TYPE</th>
            <th>SOURCE</th>
            <th>COST</th>
            <td>EDIT</td>
            <td>DELETE</td>
            {/* <th>OPTIMAL CONDITIONS</th> */}
            {/* <th>OBSERVATIONS</th> */}
          </tr>
        </thead>
        <tbody>
          {microorganisms.map((mo) => (
            <tr
              key={mo.id}
              value={mo.id}
              onClick={() => handleShowMicroorganismDetailsModal(mo.id)}
            >
              <td>{mo.id}</td>
              <td>{mo.name}</td>
              <td>{mo.type}</td>
              <td>{mo.source}</td>
              <td>{mo.cost}</td>
              <td
                onClick={(e) => {
                  e.stopPropagation();
                  handleMicroorganismDetails(mo.id);
                }}
              >
                <i className="fa-solid fa-pen-to-square"></i>
              </td>
              <td
                onClick={(e) => {
                  e.stopPropagation();
                  handleMicroorganismDelete(mo.id);
                }}
              >
                <i className="fa-solid fa-trash"></i>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {showMicroorganismDetailsModal && (
        <div className={style.modalContainer}>
          <MicroorganismDetailsModal
            microorganism={microorganismDetailsModal}
            show={showMicroorganismDetailsModal}
            handleClose={handleHideMicroorganismDetailsModal}
          />
        </div>
      )}
    </div>
  );
};
export default MicroorganismTable;
