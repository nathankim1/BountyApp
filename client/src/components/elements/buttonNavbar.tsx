import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import AddForm from "./addForm";

interface buttonNavbarProps {
  fetchData: () => void;
}

function buttonNavbar(props: buttonNavbarProps) {
  return (
    <Navbar>
      <Container>
        <AddForm fetchData={props.fetchData} />
        <Button variant="outline-secondary">Filter</Button>
        <Button variant="outline-danger">Remove Bounty</Button>
      </Container>
    </Navbar>
  );
}

export default buttonNavbar;
