import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props: {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [username, setLoginUsername] = useState("");
  const [password, setLoginPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const onButtonClick = () => {
    // Validations
    setUsernameError("");
    setPasswordError("");

    if ("" === username) {
      setUsernameError("Please enter a username");
      console.log("Please enter a username");
      return;
    }

    if ("" === password) {
      setPasswordError("Please enter a password");
      console.log("Please enter a password");
      return;
    }

    // Authentication
    fetch("http://localhost:5000/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Invalid username or password");
        }
        response.json();
      })
      .then((data) => {
        console.log(data);
        props.setLoggedIn(true);
        props.setUsername(username);
        navigate("/");
      })
      .catch((error) => {
        console.log("Error:", error);
        window.alert("Invalid username or password");
      });
  };

  return (
    <div className={"mainContainer"}>
      <div className={"titleContainer"}>
        <div>Login</div>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={username}
          placeholder="Enter your username here"
          onChange={(ev) => setLoginUsername(ev.target.value)}
          className={"inputBox"}
        />
        <label className="errorLabel">{usernameError}</label>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setLoginPassword(ev.target.value)}
          className={"inputBox"}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          className={"inputButton"}
          type="button"
          onClick={onButtonClick}
          value={"Log in"}
        />
      </div>
    </div>
  );
};

export default Login;
