import { Col, Container, Row } from "react-bootstrap";
import { toast } from "react-hot-toast";

import style from "./DeleteObjectConfirm.module.css";

const DeleteObjectConfirm = ({ object, t, onDelete }) => {
  return (
    <Container>
      <Row>Are you sure about deleting the {object}?</Row>
      <Row>
        <Col className={style.col}>
          <div className={style.icon} onClick={onDelete}>
            <i
              className={`fa-solid fa-circle-check fa-2xl ${style.confirm}`}
            ></i>
          </div>
        </Col>
        <Col className={style.col}>
          <div
            className={style.icon}
            onClick={() => {
              toast.dismiss(t.id);
              toast.error("Cancelled operation", { duration: 100 });
            }}
          >
            <i
              className={`fa-sharp fa-solid fa-circle-xmark fa-2xl ${style.cancelledOperation}`}
            ></i>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default DeleteObjectConfirm;
