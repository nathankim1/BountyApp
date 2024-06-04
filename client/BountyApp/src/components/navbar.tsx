import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";

function BountyNavbar(props: {
  loggedIn: boolean;
  username: String;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
}) {
  const navigate = useNavigate();

  const onButtonClick = () => {
    console.log("logout button clicked!");
    props.setLoggedIn(false);
    props.setUsername("");
    navigate("/login");
  };

  return (
    <Navbar className="bg-body-tertiary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand>Bounty App</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Row>
            {props.loggedIn && (
              <>
                <Col>
                  <Navbar.Text>Signed in as: {props.username}</Navbar.Text>
                </Col>
                <Col xs="auto">
                  <Button type="submit" onClick={onButtonClick}>
                    Logout
                  </Button>
                </Col>{" "}
              </>
            )}
          </Row>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BountyNavbar;
