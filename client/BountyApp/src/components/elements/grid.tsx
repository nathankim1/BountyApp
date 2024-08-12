import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

interface People {
  name: string;
  amount: number;
  id: string;
}

interface Transaction {
  name: string;
  amount: number;
  date: string;
  userOne: boolean;
  peopleOwed: People[];
  id: string;
}

interface Data {
  currentTransactions: Transaction[];
  previousTransactions: Transaction[];
}

interface UserData {
  data: Data;
}

interface Payload {
  payload: UserData;
}

function Grid(payload: Payload) {
  if (payload !== undefined && payload !== null) {
    console.log("FROM GRID: ", payload);
    console.log("payload data: ", payload.payload.data.currentTransactions);
  }

  return (
    <Row xs={2} md={4} className="g-4">
      {payload.payload.data.currentTransactions.map(
        (transaction: Transaction) => (
          <Col key={transaction.id}>
            <Card>
              <Card.Body>
                <Card.Title>{transaction.name}</Card.Title>
                <Card.Text>Amount: {transaction.amount}</Card.Text>
              </Card.Body>
              <Card.Footer className="text-muted">
                {transaction.date}
              </Card.Footer>
            </Card>
          </Col>
        )
      )}
    </Row>
  );
}

export default Grid;
