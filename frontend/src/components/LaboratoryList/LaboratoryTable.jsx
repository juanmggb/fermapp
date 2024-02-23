import { Table } from "react-bootstrap";
import LaboratoryDetailsModal from "./LaboratoryDetailsModal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteLaboratory } from "../../lib/actions/laboratoryActions";
import toast from "react-hot-toast";
import DeleteObjectConfirm from "../general/DeleteObjectConfirm";
import { RESET_LABORATORY_DETAIL } from "../../constants/laboratoryConstants";

const LaboratoryTable = ({ laboratories }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [modalShow, setModalShow] = useState(false);
  const [laboratory, setLaboratory] = useState({});

  const handleModalShow = (laboratoryId) => {
    const selectedLab = laboratories.filter((lab) => lab.id === laboratoryId);

    setLaboratory(selectedLab[0]);
    setModalShow(true);
  };

  const handleLaboratoryDetails = (laboratoryId) => {
    dispatch({ type: RESET_LABORATORY_DETAIL });
    navigate(`/laboratories/${laboratoryId}`);
  };

  const handleLaboratoryDelete = (laboratoryId) => {
    toast.dismiss();
    toast(
      (t) => (
        <DeleteObjectConfirm
          t={t}
          onDelete={() => dispatch(deleteLaboratory(laboratoryId))}
          object={`laboratory ${laboratoryId}`}
        />
      ),
      {
        duration: 5000,
      }
    );
  };

  console.log(laboratories);

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>LABORATORY NAME</th>
            <th>LAB DIRECTOR</th>
            <th>LOCATION</th>
            <th>EMAIL</th>
            <th>EDIT</th>
            <th>DELETE</th>
          </tr>
        </thead>
        <tbody>
          {laboratories.map((lab) => (
            <tr key={lab.id} onClick={() => handleModalShow(lab.id)}>
              <td>{lab.id}</td>
              <td>{lab.laboratory_name}</td>
              <td>{lab.director_name}</td>
              <td>{lab.location}</td>
              <td>{lab.email}</td>
              <td
                onClick={(e) => {
                  e.stopPropagation();
                  handleLaboratoryDetails(lab.id);
                }}
              >
                <i className="fa-solid fa-pen-to-square"></i>
              </td>
              <td
                onClick={(e) => {
                  e.stopPropagation();
                  handleLaboratoryDelete(lab.id);
                }}
              >
                <i className="fa-solid fa-trash"></i>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <LaboratoryDetailsModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        laboratory={laboratory}
      />
    </>
  );
};
export default LaboratoryTable;
