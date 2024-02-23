import { Button, ListGroup, Modal } from "react-bootstrap";

const ProductDetailsModal = ({ product, show, handleClose }) => {
  // Destructure experiment properties for easy access
  const { id, name, type, market_value, detection_method, observations } =
    product;
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton onClick={handleClose}>
        <Modal.Title>Product {id}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <ListGroup>
          <ListGroup.Item>Name: {name}</ListGroup.Item>
          <ListGroup.Item>Type: {type}</ListGroup.Item>
          <ListGroup.Item>Market Value: {market_value}</ListGroup.Item>
          <ListGroup.Item>Detection Method: {detection_method}</ListGroup.Item>
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
export default ProductDetailsModal;
