import { Button, Form } from "react-bootstrap";
import { useProductListFilter } from "../../lib/hooks/useProductListFilter";
import { useNavigate } from "react-router-dom";

const ProductFilterForm = () => {
  const navigate = useNavigate();
  const { filterBy, search, sortBy, setFilterBy, setSearch, setSortBy } =
    useProductListFilter();

  const handleFilterProducts = (e) => {
    e.preventDefault();

    const url = `/product-list?filterby=${filterBy}&search=${search}&sortby=${sortBy}`;

    navigate(url);
  };

  return (
    <Form onSubmit={handleFilterProducts}>
      <Form.Group controlId="filterBy">
        <Form.Label>Filter By:</Form.Label>
        <Form.Control
          as="select"
          value={filterBy}
          onChange={(e) => setFilterBy(e.target.value)}
        >
          <option value="name">Name</option>
          <option value="type">Type</option>
          <option value="detection_method">Detection Method</option>
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="search">
        <Form.Label>Search: </Form.Label>
        <Form.Control
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="sortBy">
        <Form.Label>Sort By:</Form.Label>
        <Form.Control
          as="select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="name">Name</option>
          <option value="type">Type</option>
          <option value="detection_method">detection Method</option>
          <option value="high_value">High Market Value</option>
          <option value="low_value">Low Market Value</option>
        </Form.Control>
      </Form.Group>

      <Button type="submit" className="mt-3">
        Search products
      </Button>
    </Form>
  );
};
export default ProductFilterForm;
