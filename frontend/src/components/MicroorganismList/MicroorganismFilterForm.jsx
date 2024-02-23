import { Button, Form } from "react-bootstrap";
import { useMicroorganismListFilter } from "../../lib/hooks/useMicroorganismListFilter";
import { useNavigate } from "react-router-dom";

const MicroorganismFilterForm = () => {
  const navigate = useNavigate();

  const { filterBy, search, sortBy, setFilterBy, setSearch, setSortBy } =
    useMicroorganismListFilter();

  const handleFilterMicroorganism = (e) => {
    e.preventDefault();

    const url = `/microorganism-list?filterby=${filterBy}&search=${search}&sortby=${sortBy}`;

    navigate(url);
  };

  return (
    <Form onSubmit={handleFilterMicroorganism}>
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
        Search Microorganisms
      </Button>
    </Form>
  );
};
export default MicroorganismFilterForm;
