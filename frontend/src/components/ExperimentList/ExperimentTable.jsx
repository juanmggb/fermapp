import Table from "react-bootstrap/Table";
import ExperimentDetailsModal from "./ExperimentDetailsModal";
import style from "./ExperimentTable.module.css";
import { useExperimentDetailsModal } from "../../lib/hooks/experimentDetailsModal";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteExperiment } from "../../lib/actions/experimentActions";
import toast from "react-hot-toast";
import DeleteObjectConfirm from "../general/DeleteObjectConfirm";
import { EXPERIMENT_DETAILS_RESET } from "../../constants/experimentConstants";

const ExperimentTable = ({ experiments }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    experimentDetailsModal,
    showExperimentDetailsModal,
    handleShowExperimentDetailsModal,
    handleHideExperimentDetailsModal,
  } = useExperimentDetailsModal(experiments);

  const handleExperimentDetails = (experimentId) => {
    dispatch({ type: EXPERIMENT_DETAILS_RESET });
    navigate(`/experiments/${experimentId}`);
  };

  const handleExperimentDelete = (experimentId) => {
    toast.dismiss();
    toast(
      (t) => (
        <DeleteObjectConfirm
          t={t}
          onDelete={() => dispatch(deleteExperiment(experimentId))}
          object={`experiment ${experimentId}`}
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
            <th>AUTHOR</th>
            <th>LABORATORY</th>
            <th>EXPERIMENT TYPE</th>
            <th>EDIT</th>
            <th>DELETE</th>
          </tr>
        </thead>
        <tbody>
          {experiments.map((exp) => (
            <tr
              key={exp.id}
              className={style.tableRow}
              onClick={() => handleShowExperimentDetailsModal(exp.id)}
            >
              <td>{exp.id}</td>
              <td>{exp.author_name ? exp.author_name : "Not available"}</td>
              <td>{exp.laboratory_name}</td>
              <td>{exp.experiment_type}</td>
              <td
                onClick={(e) => {
                  e.stopPropagation();
                  handleExperimentDetails(exp.id);
                }}
              >
                <i className="fa-solid fa-pen-to-square"></i>
              </td>
              <td
                onClick={(e) => {
                  e.stopPropagation();
                  handleExperimentDelete(exp.id);
                }}
              >
                <i className="fa-solid fa-trash"></i>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {showExperimentDetailsModal && (
        <div className={style.modalContainer}>
          <ExperimentDetailsModal
            experiment={experimentDetailsModal}
            show={showExperimentDetailsModal}
            handleClose={handleHideExperimentDetailsModal}
          />
        </div>
      )}
    </div>
  );
};

export default ExperimentTable;
