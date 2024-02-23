import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useProductDetailsModal } from "../../lib/hooks/useProductDetailsModal";
import ProductDetailsModal from "./ProductDetailsModal";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../lib/actions/elementActions";
import toast from "react-hot-toast";
import DeleteObjectConfirm from "../general/DeleteObjectConfirm";
import { PRODUCT_DETAILS_RESET } from "../../constants/elementConstants";

const ProductTable = ({ products }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    productDetailsModal,
    showProductDetailsModal,
    handleShowProductDetailsModal,
    handleHideProductDetailsModal,
  } = useProductDetailsModal(products);

  const handleProductDetails = (productId) => {
    dispatch({ type: PRODUCT_DETAILS_RESET });
    navigate(`/products/${productId}`);
  };

  const hanldeProductDelete = (productId) => {
    toast.dismiss();
    toast(
      (t) => (
        <DeleteObjectConfirm
          t={t}
          onDelete={() => dispatch(deleteProduct(productId))}
          object={`product ${productId}`}
        />
      ),
      {
        duration: 5000,
      }
    );
  };

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>TYPE</th>
            <th>MARKET VALUE</th>
            <th>EDIT</th>
            <th>DELETE</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr
              key={prod.id}
              onClick={() => handleShowProductDetailsModal(prod.id)}
            >
              <td>{prod.id}</td>
              <td>{prod.name}</td>
              <td>{prod.type}</td>
              <td>{prod.market_value}</td>
              <td>
                <i
                  className="fa-solid fa-pen-to-square"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleProductDetails(prod.id);
                  }}
                ></i>
              </td>
              <td>
                <i
                  className="fa-solid fa-trash"
                  onClick={(e) => {
                    e.stopPropagation();
                    hanldeProductDelete(prod.id);
                  }}
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {showProductDetailsModal && (
        <ProductDetailsModal
          show={showProductDetailsModal}
          handleClose={handleHideProductDetailsModal}
          product={productDetailsModal}
        />
      )}
    </div>
  );
};
export default ProductTable;
