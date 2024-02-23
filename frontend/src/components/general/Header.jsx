import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { FaUser } from "react-icons/fa"; // Import the user icon from react-icons
import { logout } from "../../lib/actions/sessionActions";

function Header() {
  const userLogin = useSelector((state) => state.userLogin);

  const { token } = userLogin;

  const name = JSON.parse(localStorage.getItem("name") || null);

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>FermApp AI</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!token ? (
              <LinkContainer to="/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
            ) : (
              <>
                <NavDropdown title="Experiments" id="basic-nav-dropdown">
                  <LinkContainer to="/experiment-list">
                    <NavDropdown.Item>Experiment List</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/register-exp-details">
                    <NavDropdown.Item>Register Experiment</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>

                <NavDropdown title="Laboratories" id="basic-nav-dropdown">
                  <LinkContainer to="/laboratory-list">
                    <NavDropdown.Item>Laboratory List</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/register-laboratory">
                    <NavDropdown.Item>Register Laboratory</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>

                <NavDropdown title="Entities" id="basic-nav-dropdown">
                  <LinkContainer to="/microorganism-list">
                    <NavDropdown.Item>Microorganism List</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/register-microorganism">
                    <NavDropdown.Item>Register Microorganism</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
                  <LinkContainer to="/substrate-list">
                    <NavDropdown.Item>Substrate List</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/register-substrate">
                    <NavDropdown.Item>Register Substrate</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
                  <LinkContainer to="/product-list">
                    <NavDropdown.Item>Product List</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/register-product">
                    <NavDropdown.Item>Register Product</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>

                <NavDropdown title="Analysis" id="basic-nav-dropdown">
                  <LinkContainer to="/simulation">
                    <NavDropdown.Item>Simulation</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
                  <LinkContainer to="/parameter-estimation">
                    <NavDropdown.Item>Parameter Estimation</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
                  <LinkContainer to="/linear-regression">
                    <NavDropdown.Item>Linear Regression</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />

                  <NavDropdown.Divider />
                  <LinkContainer to="/analysis-list">
                    <NavDropdown.Item>Analysis List</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>

                <NavDropdown title="Users" id="basic-nav-dropdown">
                  <LinkContainer to="/user-list">
                    <NavDropdown.Item>User List</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/register-user">
                    <NavDropdown.Item>Register user</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              </>
            )}
          </Nav>
          <Nav>
            {token && (
              // Use the LinkContainer to wrap the Nav.Link for react-router integration

              <NavDropdown title="Account" id="basic-nav-dropdown">
                <LinkContainer to="/account">
                  <Nav.Link>
                    <FaUser /> {name}
                  </Nav.Link>
                </LinkContainer>

                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
