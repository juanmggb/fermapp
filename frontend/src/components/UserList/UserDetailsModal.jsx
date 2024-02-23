import { ListGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function UserDetailsModal({ user, show, handleClose }) {
  // Destructure experiment properties for easy access
  const { id, email, name, role, is_staff, laboratory_name } = user;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton onClick={handleClose}>
        <Modal.Title>User {id}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <ListGroup>
          <ListGroup.Item>Email: {email}</ListGroup.Item>
          <ListGroup.Item>Name: {name}</ListGroup.Item>
          <ListGroup.Item>Role: {role}</ListGroup.Item>

          <ListGroup.Item>Laboratory: {laboratory_name}</ListGroup.Item>
          <ListGroup.Item>
            Is Staff: {is_staff ? "Staff" : "No Staff"}
          </ListGroup.Item>
        </ListGroup>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UserDetailsModal;
