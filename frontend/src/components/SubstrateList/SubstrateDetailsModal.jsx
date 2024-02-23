import { Button, ListGroup, Modal } from "react-bootstrap";

const SubstrateDetailsModal = ({ substrate, show, handleClose }) => {
  // Destructure experiment properties for easy access
  const { id, name, type, source, cost, observations } = substrate;
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton onClick={handleClose}>
        <Modal.Title>Substrate {id}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <ListGroup>
          <ListGroup.Item>Name: {name}</ListGroup.Item>
          <ListGroup.Item>Type: {type}</ListGroup.Item>
          <ListGroup.Item>Source: {source}</ListGroup.Item>
          <ListGroup.Item>Cost: {cost}</ListGroup.Item>
          <ListGroup.Item>Observations: {observations}</ListGroup.Item>
        </ListGroup>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default SubstrateDetailsModal;
