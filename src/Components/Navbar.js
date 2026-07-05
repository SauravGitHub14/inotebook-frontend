import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-hot-toast';

function Navbarr() {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("token");

    toast.success("Logged Out Successfully");

    navigate("/home");

  };

  return (

    <Navbar
      expand="lg"
      bg="dark"
      variant="dark"
      sticky="top"
      className="shadow"
    >

      <Container>

        <Navbar.Brand as={Link} to="/" className="fw-bold"> 📒 iNoteBook </Navbar.Brand>

        <Navbar.Toggle />

        <Navbar.Collapse>

          <Nav className="me-auto my-2 my-lg-0" navbarScroll>

            {!localStorage.getItem("token") ? (  //if log out then show home and about if logged in then show profile dashboard and notes logout

              <>
                <Nav.Link as={NavLink} to="/">
                  Home
                </Nav.Link>

                <Nav.Link as={NavLink} to="/about">
                  About
                </Nav.Link>
              </>

            ) : (

              <>
                <Nav.Link as={NavLink} to="/dashboard">
                  Dashboard
                </Nav.Link>

                <Nav.Link as={NavLink} to="/notes">
                  Notes
                </Nav.Link>

                <Nav.Link as={NavLink} to="/profile">
                  Profile
                </Nav.Link>
              </>

            )}

          </Nav>

          {

            !localStorage.getItem("token") ?

              <>
                <Button as={Link} to="/login" variant="outline-info" className="me-2">  Login</Button>

                <Button as={Link} to="/signup" variant="info" >   Signup </Button> </>

              :

              <Button variant="danger" onClick={handleLogout}>  Logout </Button>

          }

        </Navbar.Collapse>

      </Container>

    </Navbar>

  );

}

export default Navbarr;