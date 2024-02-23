import { Button, Form } from "react-bootstrap";
import { useUserListFilter } from "../../lib/hooks/useUserListFilter";
import { useNavigate } from "react-router-dom";

const MemberFilters = () => {
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
  } = useUserListFilter();

  const handleFilterMembers = (e) => {
    e.preventDefault();

    const url = `/member-list?filterby=${filterBy}&search=${search}&sortby=${sortBy}&initialdate=${initialDate}&finaldate=${finalDate}`;

    navigate(url);
  };

  return (
    <Form onSubmit={handleFilterMembers}>
      <Form.Group className="mb-3" controlId="filterBy">
        <Form.Label>Filter By</Form.Label>
        <Form.Control
          as="select"
          value={filterBy}
          onChange={(e) => setFilterBy(e.target.value)}
        >
          <option value="name">NAME</option>
          <option value="role">ROLE</option>
          <option value="laboratory">LABORATORY</option>
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
        <Form.Label>Sort By</Form.Label>
        <Form.Control
          as="select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Select a filed</option>
          <option value="name">NAME</option>
          <option value="role">ROLE</option>
          <option value="laboratory">LABORATORY</option>
        </Form.Control>
      </Form.Group>

      <Form.Group className="mb-3" controlId="date">
        <Form.Label>Filter by date:</Form.Label>
        <div className="mb-1">
          <Form.Control
            type="date"
            name="initialDate"
            value={initialDate}
            onChange={(e) => setDate(e)}
          ></Form.Control>
        </div>
        <div>
          <Form.Control
            type="date"
            name="finalDate"
            value={finalDate}
            onChange={(e) => setDate(e)}
          ></Form.Control>
        </div>
      </Form.Group>

      <Button className="my-3" type="submit">
        Search users
      </Button>
    </Form>
  );
};
export default MemberFilters;
