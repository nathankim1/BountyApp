import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BountyNavbar from "./navbar";

const Home = (props: {
  loggedIn: boolean;
  username: String;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { loggedIn, username } = props;
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  const onButtonClick = () => {
    console.log("logout button clicked!");
    props.setLoggedIn(false);
    props.setUsername("");
    navigate("/login");
  };

  useEffect(() => {
    console.log(username);
    if (!username) navigate("/login");

    fetch("http://localhost:5000/api/user/transaction/michael", {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Invalid token");
        }
        return response.json();
      })
      .then((data) => {
        console.log("user data: ");
        console.log(data);
        setUserData(data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, []);

  return (
    <>
      <BountyNavbar
        username={props.username}
        loggedIn={props.loggedIn}
        setLoggedIn={props.setLoggedIn}
        setUsername={props.setUsername}
      />
      <div>Body!</div>
    </>
  );
};

export default Home;
