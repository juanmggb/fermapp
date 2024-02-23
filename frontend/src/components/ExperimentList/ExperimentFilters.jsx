import { Button, Form } from "react-bootstrap";
import style from "./ExperimentFilters.module.css";
import { useExperimentListFilter } from "../../lib/hooks/useExperimentListFilter";
import { useNavigate } from "react-router-dom";

const ExperimentFilters = () => {
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
  } = useExperimentListFilter();

  const handleFilterExperiments = (e) => {
    e.preventDefault();

    const url = `/experiment-list?filterby=${filterBy}&search=${search}&sortby=${sortBy}&initialdate=${initialDate}&finaldate=${finalDate}`;

    navigate(url);
  };


  return (
    <Form onSubmit={handleFilterExperiments}>
      <Form.Group className="mb-3" controlId="filterBy">
        <Form.Label>Filter table by:</Form.Label>
        <Form.Control
          as="select"
          value={filterBy}
          onChange={(e) => setFilterBy(e.target.value)}
        >
          <option value="author">AUTHOR</option>
          <option value="laboratory">LABORATORY</option>
          <option value="experiment_type">EXPERIMENT TYPE</option>
        </Form.Control>
      </Form.Group>

      <Form.Group className="mb-3" controlId="search">
        <Form.Control
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></Form.Control>
      </Form.Group>

      <Form.Group className="mb-3" controlId="sortBy">
        <Form.Label>Sort table by</Form.Label>
        <Form.Control
          as="select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="recent_first">RECENT FIRST</option>
          <option value="author">AUTHOR</option>
          <option value="laboratory">LABORATORY</option>
          <option value="experiment_type">EXPERIMENT TYPE</option>
          <option value="recent_last">RECENT LAST</option>
        </Form.Control>
      </Form.Group>

      <Form.Group className="mb-3" controlId="date">
        <Form.Label>Filter by date:</Form.Label>
        <div className="mb-1">
          <Form.Control
            className={style.initialDateControl}
            type="date"
            name="initialDate"
            value={initialDate}
            onChange={(e) => setDate(e)}
          ></Form.Control>
        </div>
        <div>
          <Form.Control
            className={style.finalDateControl}
            type="date"
            name="finalDate"
            value={finalDate}
            onChange={(e) => setDate(e)}
          ></Form.Control>
        </div>
      </Form.Group>

      <Button className="my-3" type="submit">
        Search experiments
      </Button>
    </Form>
  );
};
export default ExperimentFilters;
