import { Button, Form } from "react-bootstrap";
import { useLaboratoryListFilter } from "../../lib/hooks/useLaboratoryListFilter";
import { useNavigate } from "react-router-dom";

const LaboratoryFilterForm = () => {
  const navigate = useNavigate();

  const {
    filterBy,
    search,
    sortBy,
    initialDate,
    finalDate,
    setFilterBy,
    setSearch,
    setSortBy,
    setDate,
  } = useLaboratoryListFilter();

  const handleFilterLaboratories = (e) => {
    e.preventDefault();

    const url = `/laboratory-list?filterby=${filterBy}&search=${search}&sortby=${sortBy}&initialdate=${initialDate}&finaldate=${finalDate}`;

    navigate(url);
  };

  return (
    <Form onSubmit={handleFilterLaboratories}>
      <Form.Group className="mb-3" controlId="filterBy">
        <Form.Label>Filter By:</Form.Label>
        <Form.Control
          as="select"
          value={filterBy}
          onChange={(e) => setFilterBy(e.target.value)}
        >
          <option value="name">LABORATORY NAME</option>
          <option value="director">LAB DIRECTOR</option>
          <option value="location">LOCATION</option>
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
          <option value="name">LABORATORY NAME</option>
          <option value="director">LAB DIRECTOR</option>
          <option value="location">LOCATION</option>
          <option value="recent_first">RECENT FIRST</option>
          <option value="recent_last">RECENT LAST</option>
        </Form.Control>
      </Form.Group>

      <Form.Group className="mb-3" controlId="startData">
        <Form.Label>Filter By Date:</Form.Label>
        <div className="mb-1">
          <Form.Control
            type="date"
            name="initialDate"
            value={initialDate}
            onChange={setDate}
          />
        </div>

        <Form.Control
          type="date"
          name="finalDate"
          value={finalDate}
          onChange={setDate}
        />
      </Form.Group>

      <Button className="my-3" type="submit">
        Search Laboratories
      </Button>
    </Form>
  );
};
export default LaboratoryFilterForm;
