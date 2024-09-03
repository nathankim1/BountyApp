import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import AddForm from "./addForm";
import DeleteForm from "./deleteForm";

interface People {
  name: string;
  amount: number;
  _id: string;
}

interface Transaction {
  name: string;
  amount: number;
  date: string;
  userOwes: boolean;
  peopleOwed: People[];
  _id: string;
}

interface Data {
  currentTransactions: Transaction[];
  previousTransactions: Transaction[];
}

interface UserData {
  data: Data;
}
interface buttonNavbarProps {
  payload: UserData;
  fetchData: () => void;
}

function buttonNavbar(props: buttonNavbarProps) {
  return (
    <Navbar>
      <Container>
        <AddForm fetchData={props.fetchData} />
        <Button variant="outline-secondary">Filter</Button>
        <DeleteForm
          peopleOwed={props.payload.data.currentTransactions}
          fetchData={props.fetchData}
        />
      </Container>
    </Navbar>
  );
}

export default buttonNavbar;
