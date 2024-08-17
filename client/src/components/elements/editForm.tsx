import { useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";

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

function editForm(transaction: Transaction) {
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [newName, setNewName] = useState(transaction.name);
  const [newAmount, setNewAmount] = useState(transaction.amount.toString());

  const handleShow = () => setShow(true);

  const handleClose = () => {
    setShow(false);
    setValidated(false);
    setSubmitted(false);
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
          peopleOwed: transaction.peopleOwed,
          _id: transaction._id,
        },
      }),
    })
      .then((response) => {
        if (!response.ok) {
          console.log(response);
          throw new Error("Invalid");
        } else {
          console.log("Transaction updated successfully");
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
            <Form.Label>New Bounty Name</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder={transaction.name}
                aria-label="Transaction Name"
                aria-describedby="basic-addon1"
                onChange={(e) => setNewName(e.target.value)}
              />
            </InputGroup>
            <Form.Label>New Total Amount</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control
                aria-label="Dollar amount (with dot and two decimal places)"
                placeholder={transaction.amount.toString()}
                onChange={(e) => setNewAmount(e.target.value)}
                isInvalid={submitted && !validated}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid dollar amount.
              </Form.Control.Feedback>
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
