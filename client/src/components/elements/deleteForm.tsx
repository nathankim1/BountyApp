import { useEffect, useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import "../../../styles.css";
import AlertModal from "./alertModal";

interface People {
  name: string;
  date: string;
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
  const [name, setName] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (submitted) {
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
            setSuccess(true);
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
      setName(name);
      setDeleteID(person?._id || "");
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
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
                  <option key={person._id} value={person.name}>
                    {person.name + ": " + formatDate(person.date)}
                  </option>
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
      {success && (
        <AlertModal
          message={"Successfully Deleted " + name}
          setSuccess={setSuccess}
        />
      )}
    </>
  );
}

export default deleteForm;
