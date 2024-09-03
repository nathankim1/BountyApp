import { useEffect, useState } from "react";
import { Button, Form, InputGroup, Modal, Row } from "react-bootstrap";
import "../../../styles.css";

interface People {
  name: string;
  amount: number;
  _id?: string;
}

interface TransactionProps {
  name: string;
  amount: number;
  date: string;
  userOwes: boolean;
  peopleOwed: People[];
  _id: string;
  fetchData: () => void;
  url: String;
}

interface InputSet {
  id: number;
  name: string;
  amount: string;
}

function editForm(transaction: TransactionProps) {
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [newName, setNewName] = useState(transaction.name);
  const [newAmount, setNewAmount] = useState(transaction.amount.toString());
  const [newPeopleOwed, setNewPeopleOwed] = useState(transaction.peopleOwed);
  const [inputSet, setInputSet] = useState<InputSet[]>([]);
  const [personToRemove, setPersonToRemove] = useState("");

  useEffect(() => {
    if (submitted && validated) {
      fetch(transaction.url + "api/user/transaction", {
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
            peopleOwed: newPeopleOwed,
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
    }
  }, [newName, newAmount, newPeopleOwed, submitted]);

  const handleShow = () => setShow(true);

  const handleClose = () => {
    setShow(false);
    setValidated(false);
    setSubmitted(false);
    setInputSet([]);
  };

  const addInputSet = () => {
    const newSet: InputSet = {
      id: inputSet.length,
      name: "",
      amount: "",
    };
    setInputSet([...inputSet, newSet]);
  };

  const removeLastInputSet = () => {
    if (inputSet.length > 0) {
      setInputSet(inputSet.slice(0, -1));
    }
  };

  const handleInputChange = (
    id: number,
    field: "name" | "amount",
    value: string
  ) => {
    const updatedSets = inputSet.map((inputSet) => {
      if (inputSet.id === id) {
        return { ...inputSet, [field]: value };
      }
      return inputSet;
    });
    setInputSet(updatedSets);
  };

  const handleKeyDown = (event: any) => {
    if (event.code === "Enter" || event.code === "NumpadEnter") {
      event.preventDefault();
      handleSubmit(event);
    } else if (event.code === "Escape") {
      handleClose();
    }
  };

  const handleSubmit = async (event: any) => {
    setSubmitted(true);

    // Validations
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
      !newPeopleOwed.every((person) =>
        amountRegex.test(person.amount.toString())
      )
    ) {
      setValidated(false);
      return;
    }

    if (!inputSet.every((inputSet) => amountRegex.test(inputSet.amount))) {
      setValidated(false);
      return;
    }

    setValidated(true);
    // End of Validations

    const newAmounts = inputSet.map((set) => ({
      name: set.name,
      amount: Number(set.amount),
    }));

    const newPeople = [...newPeopleOwed, ...newAmounts].filter(
      (person) => person.name !== personToRemove
    );

    setNewPeopleOwed(newPeople);
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
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            onKeyDown={handleKeyDown}
          >
            <Form.Label className="bold-label">Bounty Name</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder={transaction.name}
                aria-label="Transaction Name"
                aria-describedby="basic-addon1"
                onChange={(e) => setNewName(e.target.value)}
              />
            </InputGroup>
            <hr />
            <Form.Label className="bold-label">Total Amount</Form.Label>
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
            <hr />
            <Form.Label className="bold-label">Edit People</Form.Label>
            {newPeopleOwed.map((person: People) => (
              <Row key={person._id}>
                <Form.Label>{person.name}</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text>$</InputGroup.Text>
                  <Form.Control
                    aria-label="Dollar amount (with dot and two decimal places)"
                    placeholder={person.amount.toString()}
                    onChange={(e) => {
                      const newAmounts = newPeopleOwed.map((amount) => {
                        if (amount._id === person._id) {
                          return {
                            ...amount,
                            amount: parseFloat(e.target.value),
                          };
                        }
                        return amount;
                      });
                      setNewPeopleOwed(newAmounts);
                    }}
                    isInvalid={submitted && !validated}
                  />
                  <Form.Control.Feedback type="invalid">
                    One of the dollar amounts is not valid.
                  </Form.Control.Feedback>
                </InputGroup>
              </Row>
            ))}
            <hr />
            <Form.Label className="bold-label">Add People</Form.Label>
            <InputGroup className="mb-3">
              <Button
                variant="outline-success"
                size="sm"
                onClick={addInputSet}
                style={{ marginRight: "10px" }}
              >
                Add
              </Button>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={removeLastInputSet}
                disabled={inputSet.length === 0}
              >
                Remove
              </Button>
            </InputGroup>
            {inputSet.map((inputSet) => (
              <div key={inputSet.id}>
                <Form.Label>New Name</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="Temp Name"
                    aria-label="New Person"
                    aria-describedby="basic-addon1"
                    onChange={(e) =>
                      handleInputChange(inputSet.id, "name", e.target.value)
                    }
                  />
                </InputGroup>
                <Form.Label>New Amount</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text>$</InputGroup.Text>
                  <Form.Control
                    aria-label="Dollar amount (with dot and two decimal places)"
                    placeholder={transaction.amount.toString()}
                    onChange={(e) =>
                      handleInputChange(inputSet.id, "amount", e.target.value)
                    }
                    isInvalid={submitted && !validated}
                  />
                  <Form.Control.Feedback type="invalid">
                    One of the dollar amounts is not valid.
                  </Form.Control.Feedback>
                </InputGroup>
              </div>
            ))}
            <hr />
            <Form.Label className="bold-label">Remove Person</Form.Label>
            <InputGroup className="mb-3">
              <Form.Select
                title="Remove Person"
                onChange={(e) => setPersonToRemove(e.target.value)}
              >
                <option>Choose...</option>
                {newPeopleOwed.map((person: People) => (
                  <option key={person._id}>{person.name}</option>
                ))}
              </Form.Select>
            </InputGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" variant="primary" onClick={handleSubmit}>
            Submit Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default editForm;
