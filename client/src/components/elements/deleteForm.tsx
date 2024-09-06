import { useEffect, useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import "../../../styles.css";

interface People {
  name: string;
  amount: number;
  _id?: string;
}

interface deleteFormProps {
  peopleOwed: People[];
  fetchData: () => void;
  url: String;
}

function deleteForm(props: deleteFormProps) {
  const [show, setShow] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [deleteID, setDeleteID] = useState("");
  useEffect(() => {
    if (submitted) {
      console.log("DELETE ID: ", deleteID);
      fetch(
        props.url +
          "api/user/transaction/" +
          localStorage.getItem("username") +
          "/" +
          deleteID,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            console.log(response);
            throw new Error("Invalid");
          } else {
            props.fetchData();
            handleClose();
          }
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    }
  }, [deleteID, submitted]);

  const handleShow = () => setShow(true);

  const handleClose = () => {
    setShow(false);
    setSubmitted(false);
  };

  const handleKeyDown = (event: any) => {
    if (event.code === "Enter" || event.code === "NumpadEnter") {
      event.preventDefault();
      handleSubmit();
    } else if (event.code === "Escape") {
      handleClose();
    }
  };

  const handleSubmit = async () => {
    setSubmitted(true);
  };

  const handleDeleteID = (name: string) => {
    if (name !== "Choose...") {
      const person = props.peopleOwed.find((person) => person.name === name);
      console.log("PERSON: ", person);
      console.log("PERSON ID: ", person?._id);
      setDeleteID(person?._id || "");
    }
  };

  return (
    <>
      <Button variant="outline-danger" onClick={handleShow}>
        Remove Bounty
      </Button>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Deleting Bounty</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
            <InputGroup className="mb-3">
              <Form.Select
                title="Remove Person"
                onChange={(e) => handleDeleteID(e.target.value)}
              >
                <option>Choose...</option>
                {props.peopleOwed.map((person: People) => (
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
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default deleteForm;
