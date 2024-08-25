import { useState } from "react";
import { Button, Col, Form, InputGroup, Modal, Row } from "react-bootstrap";

interface People {
  name: string;
  amount: number;
  _id: string;
}

interface TransactionProps {
  name: string;
  amount: number;
  date: string;
  userOwes: boolean;
  peopleOwed: People[];
  _id: string;
  fetchData: () => void;
}

function editForm(transaction: TransactionProps) {
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [newName, setNewName] = useState(transaction.name);
  const [newAmount, setNewAmount] = useState(transaction.amount.toString());
  const [amounts, setAmounts] = useState(transaction.peopleOwed);
  const [ShowAddPerson, setShowAddPerson] = useState(false);
  const [showRemovePerson, setShowRemovePerson] = useState(false);

  const handleShow = () => setShow(true);

  const showAddPerson = () => setShowAddPerson(true);

  const handleClose = () => {
    setShow(false);
    setValidated(false);
    setSubmitted(false);
    setShowAddPerson(false);
    setShowRemovePerson(false);
  };

  const handleSubmit = async (event: any) => {
    setSubmitted(true);

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    const amountRegex = /^\d+(\.\d{1,2})?$/;
    if (!amountRegex.test(newAmount)) {
      setValidated(false);
      return;
    }

    if (
      !amounts.every((person) => amountRegex.test(person.amount.toString()))
    ) {
      setValidated(false);
      return;
    }

    setValidated(true);

    console.log("trans id: ", transaction._id);
    console.log("transaction: ", transaction);
    fetch("http://localhost:5000/api/user/transaction", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: localStorage.getItem("username"),
        transactionData: {
          name: newName,
          date: transaction.date,
          userOwes: transaction.userOwes,
          amount: newAmount,
          peopleOwed: amounts,
          _id: transaction._id,
        },
      }),
    })
      .then((response) => {
        if (!response.ok) {
          console.log(response);
          throw new Error("Invalid");
        } else {
          transaction.fetchData();
          handleClose();
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  return (
    <>
      <Button variant="secondary" size="sm" onClick={handleShow}>
        Edit
      </Button>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Editing {transaction.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Label>Bounty Name</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder={transaction.name}
                aria-label="Transaction Name"
                aria-describedby="basic-addon1"
                onChange={(e) => setNewName(e.target.value)}
              />
            </InputGroup>
            <Form.Label>Total Amount</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control
                aria-label="Dollar amount (with dot and two decimal places)"
                placeholder={transaction.amount.toString()}
                onChange={(e) => setNewAmount(e.target.value)}
                isInvalid={submitted && !validated}
              />
              <Form.Control.Feedback type="invalid">
                One of the dollar amounts is not valid.
              </Form.Control.Feedback>
            </InputGroup>
            {transaction.peopleOwed.map((person: People) => (
              <Row key={person._id}>
                <Form.Label>Amount for {person.name}</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text>$</InputGroup.Text>
                  <Form.Control
                    aria-label="Dollar amount (with dot and two decimal places)"
                    placeholder={person.amount.toString()}
                    onChange={(e) => {
                      const newAmounts = amounts.map((amount) => {
                        if (amount._id === person._id) {
                          return {
                            ...amount,
                            amount: parseFloat(e.target.value),
                          };
                        }
                        return amount;
                      });
                      setAmounts(newAmounts);
                    }}
                    isInvalid={submitted && !validated}
                  />
                  <Form.Control.Feedback type="invalid">
                    One of the dollar amounts is not valid.
                  </Form.Control.Feedback>
                </InputGroup>
              </Row>
            ))}
            <InputGroup className="mb-3">
              <Button
                variant="outline-success"
                size="sm"
                onClick={showAddPerson}
              >
                Add Person
              </Button>
            </InputGroup>
            {ShowAddPerson && (
              <>
                <Form.Label>New Name</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="Temp Name"
                    aria-label="New Person"
                    aria-describedby="basic-addon1"
                    onChange={(e) => setNewName(e.target.value)}
                  />
                </InputGroup>
                <Form.Label>New Amount</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text>$</InputGroup.Text>
                  <Form.Control
                    aria-label="Dollar amount (with dot and two decimal places)"
                    placeholder={transaction.amount.toString()}
                    onChange={(e) => console.log("awdasdadsasdads")}
                    isInvalid={submitted && !validated}
                  />
                  <Form.Control.Feedback type="invalid">
                    One of the dollar amounts is not valid.
                  </Form.Control.Feedback>
                </InputGroup>
              </>
            )}
            <InputGroup className="mb-3">
              <Button variant="outline-danger" size="sm">
                Remove Person
              </Button>
            </InputGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default editForm;
