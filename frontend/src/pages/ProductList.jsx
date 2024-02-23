import { Col, Container, Row } from "react-bootstrap";
import ProductFilterForm from "../components/ProductList/ProductFilterForm";
import { useDispatch, useSelector } from "react-redux";
import ProductTable from "../components/ProductList/ProductTable";
import { useEffect } from "react";
import { fetchProductList } from "../lib/actions/elementActions";
import toast from "react-hot-toast";
import { PRODUCT_DELETE_RESET } from "../constants/elementConstants";
import Loader from "../components/general/Loader";
import Message from "../components/general/Message";
import { useLocation } from "react-router-dom";

const ProductList = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const search = location.search;
  // Get products from the redux store
  const productList = useSelector((state) => state.productList);
  const { error, products, loading } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const { deleteError, success, deleteLoading } = productDelete;

  useEffect(() => {
    if (!products) dispatch(fetchProductList(search));
  }, [dispatch, products, search]);

  useEffect(() => {
    dispatch(fetchProductList(search));
  }, [dispatch, search]);

  useEffect(() => {
    let toastId;
    if (deleteLoading) {
      toastId = toast.loading("Deleting product");
    }

    if (deleteError) {
      toast.dismiss(toastId);
      toast.error("An error occurred when deleting product");
    }

    if (success) {
      toast.dismiss(toastId);
      toast.success("Productdeleted successfully");
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
  }, [deleteError, deleteLoading, success, dispatch]);

  if (loading) return <Loader />;

  if (error)
    return (
      <Message variant="danger">
        An error occurred when requesting product list
      </Message>
    );

  if (products)
    return (
      <Container>
        <Row>
          <Col sm={4} className="mt-3">
            <ProductFilterForm />
          </Col>
          <Col sm={6}>
            <h1>Product List</h1>
            <ProductTable products={products} />
          </Col>
        </Row>
      </Container>
    );
};
export default ProductList;
