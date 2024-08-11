import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useRouter } from 'next/router';
import { authStatusAtom } from '../store/atoms'; 
import { useAtom } from 'jotai';
import { isAuthenticated, removeToken } from '../../lib/authenticate';
import { useEffect } from 'react';


function BasicExample() {
  const [authStatus, setAuthStatus] = useAtom(authStatusAtom); 
  const router = useRouter();

  const handleLogout = () => {
    removeToken(); 
    setAuthStatus(false);
    router.push('/login');
  };

  
  useEffect(() => {
    const loggedIn = isAuthenticated(); 
    setAuthStatus(loggedIn);
  }, [setAuthStatus]);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>WEB422</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {!authStatus && <Nav.Link href="/login">Login</Nav.Link>}
            {!authStatus && <Nav.Link href="/register">Register</Nav.Link>}
            {authStatus && <Nav.Link onClick={handleLogout}>Logout</Nav.Link>}
            {authStatus && <Nav.Link href='/favorites'>Favorites</Nav.Link>}

            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;