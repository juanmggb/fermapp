import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSubstrateDetailsModal } from "../../lib/hooks/useSubstrateDetailsModal";
import SubstrateDetailsModal from "./SubstrateDetailsModal";
import { useDispatch } from "react-redux";
import { deleteSubstrate } from "../../lib/actions/elementActions";
import toast from "react-hot-toast";
import DeleteObjectConfirm from "../general/DeleteObjectConfirm";
import { SUBSTRATE_DETAILS_RESET } from "../../constants/elementConstants";

const SubstrateTable = ({ substrates }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    substrateDetailsModal,
    showSubstrateDetailsModal,
    handleShowSubstrateDetailsModal,
    handleHideSubstrateDetailsModal,
  } = useSubstrateDetailsModal(substrates);

  const handleSubstrateDetails = (substrateId) => {
    dispatch({ type: SUBSTRATE_DETAILS_RESET });
    navigate(`/substrates/${substrateId}`);
  };

  const handleSubstrateDelete = (substrateId) => {
    toast.dismiss();
    toast(
      (t) => (
        <DeleteObjectConfirm
          t={t}
          onDelete={() => dispatch(deleteSubstrate(substrateId))}
          object={`substrate ${substrateId}`}
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
            <th>EDIT</th>
            <th>DELETE</th>
          </tr>
        </thead>
        <tbody>
          {substrates.map((sub) => (
            <tr
              key={sub.id}
              onClick={() => handleShowSubstrateDetailsModal(sub.id)}
            >
              <td>{sub.id}</td>
              <td>{sub.name}</td>
              <td>{sub.type}</td>
              <td>{sub.source}</td>
              <td>{sub.cost}</td>
              <td
                onClick={(e) => {
                  e.stopPropagation();
                  handleSubstrateDetails(sub.id);
                }}
              >
                <i className="fa-solid fa-pen-to-square"></i>
              </td>
              <td
                onClick={(e) => {
                  e.stopPropagation();
                  handleSubstrateDelete(sub.id);
                }}
              >
                <i className="fa-solid fa-trash"></i>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {showSubstrateDetailsModal && (
        <SubstrateDetailsModal
          show={showSubstrateDetailsModal}
          handleClose={handleHideSubstrateDetailsModal}
          substrate={substrateDetailsModal}
        />
      )}
    </div>
  );
};
export default SubstrateTable;
