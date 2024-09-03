import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import "../../../styles.css";

interface People {
  name: string;
  amount: number;
  _id?: string;
}

interface filterFormProps {
  peopleOwed: People[];
}

function deleteForm(props: filterFormProps) {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);

  const handleClose = () => {
    setShow(false);
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
    console.log("Submitted");
    handleClose();
  };

  return (
    <>
      <Button variant="outline-secondary" onClick={handleShow}>
        Filter
      </Button>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Filtering Bounty</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
            <Form.Label>WIP, {props.peopleOwed.length} </Form.Label>
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
