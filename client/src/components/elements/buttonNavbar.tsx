import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import AddForm from "./addForm";
import DeleteForm from "./deleteForm";
import FilterForm from "./filterForm";

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
  url: String;
}

function buttonNavbar(props: buttonNavbarProps) {
  return (
    <Navbar>
      <Container>
        <AddForm fetchData={props.fetchData} url={props.url} />
        {/* <FilterForm peopleOwed={props.payload.data.currentTransactions} /> */}
        <DeleteForm
          peopleOwed={props.payload.data.currentTransactions}
          fetchData={props.fetchData}
          url={props.url}
        />
      </Container>
    </Navbar>
  );
}

export default buttonNavbar;
