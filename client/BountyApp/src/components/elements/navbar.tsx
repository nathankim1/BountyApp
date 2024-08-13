import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function BountyNavbar() {
  const navigate = useNavigate();

  const onButtonClick = () => {
    console.log("logout button clicked!");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <Navbar className="bg-body-tertiary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand>Bounty App</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {localStorage.getItem("username") && (
            <>
              <Navbar.Text>
                Signed in as: {localStorage.getItem("username")}
                &nbsp;&nbsp;&nbsp;
              </Navbar.Text>
              <Button type="submit" onClick={onButtonClick}>
                Logout
              </Button>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BountyNavbar;
