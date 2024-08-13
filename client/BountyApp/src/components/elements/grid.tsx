import { ListGroup } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import EditForm from "./editForm.tsx";

interface People {
  name: string;
  amount: number;
  id: string;
}

interface Transaction {
  name: string;
  amount: number;
  date: string;
  userOwes: boolean;
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

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true, // Use 12-hour format
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

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
                <Row className="d-flex justify-content-between">
                  <Col>
                    <Card.Title>{transaction.name}</Card.Title>
                  </Col>
                  <Col xs="auto">
                    <EditForm
                      name={transaction.name}
                      amount={transaction.amount}
                      date={transaction.date}
                      userOwes={transaction.userOwes}
                      peopleOwed={transaction.peopleOwed}
                      id={transaction.id}
                    />
                  </Col>
                </Row>
                <Card.Text className="text-muted">
                  Total: ${transaction.amount}
                </Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                {transaction.peopleOwed.map((person: People) => (
                  <ListGroup.Item key={person.id}>
                    {person.name}: ${person.amount}
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <Card.Footer className="text-muted">
                {formatDate(transaction.date)}
              </Card.Footer>
            </Card>
          </Col>
        )
      )}
    </Row>
  );
}

export default Grid;
