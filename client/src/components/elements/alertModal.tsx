import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "../../../styles.css";

interface alertModalProps {
  message: String;
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

function alertModal(alertModalProps: alertModalProps) {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    alertModalProps.setSuccess(false);
  };

  const handleKeyDown = (event: any) => {
    if (event.code === "Escape") {
      handleClose();
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} onKeyDown={handleKeyDown}>
        <Modal.Header closeButton>
          <Modal.Title>{alertModalProps.message}</Modal.Title>
        </Modal.Header>
      </Modal>
    </>
  );
}

export default alertModal;
