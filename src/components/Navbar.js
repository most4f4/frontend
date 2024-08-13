import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
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

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;