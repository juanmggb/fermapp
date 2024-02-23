import { ListGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ExperimentVariableTable from "./ExperimentVariableTable";
// import { useDispatch } from "react-redux";
import * as XLSX from "xlsx";
import { formatDateString } from "../../lib/utilis/general";

function ExperimentDetailsModal({ experiment, show, handleClose }) {
  // Destructure experiment properties for easy access
  const {
    id,
    date,
    author_name,
    laboratory_name,
    experiment_type,
    observations,
    substrate_name,
    microorganism_name,
    product_name,

    // variables
    variables,
  } = experiment;

  // const dispatch = useDispatch()

  const handleDownloadExperimentData = () => {
    // Transform the variables data
    const transformedData = transformDataForExcel(variables);

    // Create a new workbook and a worksheet with the transformed data
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(transformedData);

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, "ExperimentData");

    // Write and export the workbook
    XLSX.writeFile(wb, `Experiment_${id}_Data.xlsx`);
  };


  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton onClick={handleClose}>
        <Modal.Title>Experiment {id}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <ListGroup>
          <ListGroup.Item>Date: {formatDateString(date)}</ListGroup.Item>
          <ListGroup.Item>Author: {author_name}</ListGroup.Item>
          <ListGroup.Item>Laboratory: {laboratory_name}</ListGroup.Item>
          <ListGroup.Item>Experiment Type: {experiment_type}</ListGroup.Item>
          <ListGroup.Item>Observations: {observations}</ListGroup.Item>
          <ListGroup.Item>Substrate: {substrate_name}</ListGroup.Item>
          <ListGroup.Item>Microorganism: {microorganism_name}</ListGroup.Item>
          <ListGroup.Item>Product: {product_name}</ListGroup.Item>
        </ListGroup>

        <ExperimentVariableTable variables={variables} />
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={handleDownloadExperimentData}>
          Download Data
        </Button>

        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ExperimentDetailsModal;

const transformDataForExcel = (variables) => {
  // Determine the maximum length of the values_list arrays
  const maxLength = Math.max(...variables.map((v) => v.values_list.length));

  // Create an array of objects, each representing a row in Excel
  const rowData = Array.from({ length: maxLength }, (_, rowIndex) => {
    return variables.reduce((acc, variable) => {
      acc[variable.variable_name] = variable.values_list[rowIndex] || "";
      return acc;
    }, {});
  });

  return rowData;
};
