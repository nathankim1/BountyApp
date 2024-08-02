import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BountyNavbar from "../elements/navbar";

const Home = (props: {
  loggedIn: boolean;
  username: String;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username === null) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:5000/api/user/transaction/" + username, {
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
      <BountyNavbar />
      <div>Body!</div>
    </>
  );
};

export default Home;
