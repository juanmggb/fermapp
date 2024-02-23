import Spinner from "react-bootstrap/Spinner";
import style from "./Loader.module.css";

function Loader() {
  return (
    <div
      className={`d-flex justify-content-center align-items-center mt-3 ${style.wrapper}`}
    >
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}

export default Loader;
