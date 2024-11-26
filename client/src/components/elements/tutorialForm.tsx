import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "../../../styles.css";

function tutorialForm() {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  const handleKeyDown = (event: any) => {
    if (event.code === "Escape") {
      handleClose();
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} onKeyDown={handleKeyDown}>
        <Modal.Header closeButton>
          <Modal.Title>Welcome to my Bounty App!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            I created this app to track who owes who for big purchases. Hope it
            helps you out too. ✌️
          </p>
          <hr />
          <h4>To Add a Bounty:</h4>
          Press the button and fill out the name, the total amount, and people
          in the transaction. Add their name and what they owe.
          <hr />
          <h4>To Edit a Bounty:</h4>
          Press the edit button to change names, amounts, and add or remove
          people.
          <hr />
          <h4>To Remove a Bounty:</h4>
          Press the button and select a bounty to remove.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default tutorialForm;
