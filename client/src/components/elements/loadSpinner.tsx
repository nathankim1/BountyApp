import Spinner from "react-bootstrap/Spinner";

function LoadSpinner() {
  return (
    <>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <h2>Loading...</h2>
    </>
  );
}

export default LoadSpinner;
