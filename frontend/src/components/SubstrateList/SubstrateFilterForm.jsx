import { Button, Form } from "react-bootstrap";
import { useSubstrateListFilter } from "../../lib/hooks/useSubstrateListFilter";
import { useNavigate } from "react-router-dom";

const SubstrateFilterForm = () => {
  const navigate = useNavigate();

  const { filterBy, search, sortBy, setFilterBy, setSearch, setSortBy } =
    useSubstrateListFilter();

  const handleFilterSubstrates = (e) => {
    e.preventDefault();

    const url = `/substrate-list?filterby=${filterBy}&search=${search}&sortby=${sortBy}`;

    navigate(url);
  };

  return (
    <Form onSubmit={handleFilterSubstrates}>
      <Form.Group className="mb-3" controlId="filterBy">
        <Form.Label>Fitler By:</Form.Label>
        <Form.Control
          as="select"
          value={filterBy}
          onChange={(e) => setFilterBy(e.target.value)}
        >
          <option value="name">Name</option>
          <option value="type">Type</option>
          <option value="source">Source</option>
        </Form.Control>
      </Form.Group>

      <Form.Group className="mb-3" controlId="search">
        <Form.Label>Search:</Form.Label>
        <Form.Control
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="sortBy">
        <Form.Label>Sort By:</Form.Label>
        <Form.Control
          as="select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="name">Name</option>
          <option value="type">Type</option>
          <option value="source">Source</option>
          <option value="high_cost">High Cost</option>
          <option value="low_cost">Low Cost</option>
        </Form.Control>
      </Form.Group>

      <Button type="submit" className="mt-3">
        Search Substrates
      </Button>
    </Form>
  );
};
export default SubstrateFilterForm;
