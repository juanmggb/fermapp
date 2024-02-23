import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ListGroup from "react-bootstrap/ListGroup";

function LaboratoryDetailsModal({ show, onHide, laboratory }) {
  if (laboratory.members)
    return (
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Laboratory Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{laboratory.laboratory_name}</h4>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <strong>Director:</strong> {laboratory.director_name}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Location:</strong> {laboratory.location}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Email:</strong> {laboratory.email}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Phone Number:</strong> {laboratory.phone_number}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Description:</strong> {laboratory.description}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Created At:</strong> {laboratory.created_at}
            </ListGroup.Item>
          </ListGroup>
          <h5>Members</h5>
          <ListGroup>
            {laboratory.members.map((member, index) => (
              <ListGroup.Item key={index}>
                {member.first_name}: {member.role}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
}

export default LaboratoryDetailsModal;
