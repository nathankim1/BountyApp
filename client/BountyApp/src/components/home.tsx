import React from "react";
import { useNavigate } from "react-router-dom";

const Home = (props: { loggedIn: boolean; username: String }) => {
  const { loggedIn, username } = props;
  const navigate = useNavigate();

  const onButtonClick = () => {
    console.log("button clicked!");
  };

  return (
    <div className="mainContainer">
      <div className="titleContainer">
        <div>Bounty App</div>
      </div>
      <div>This is the home page.</div>
      <div className="buttonContainer">
        <input
          className="inputButton"
          type="button"
          onClick={onButtonClick}
          value={loggedIn ? "Logout" : "Login"}
        />
        {loggedIn ? <div>Username: {username}</div> : <div />}
      </div>
    </div>
  );
};

export default Home