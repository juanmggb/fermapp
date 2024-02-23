import Alert from "react-bootstrap/Alert";
import style from "./Message.module.css";

function Message({ variant, children }) {
  return (
    <div
      className={`d-flex justify-content-center align-items-center mt-3 ${style.wrapper}`}
    >
      <Alert variant={variant} className={style.alert}>
        {children}
      </Alert>
    </div>
  );
}

export default Message;
