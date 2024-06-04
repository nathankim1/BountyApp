import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import BountyNavbar from "./navbar";

const Login = (props: {
  loggedIn: boolean;
  username: String;
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

  const onButtonClickRef = useRef(onButtonClick);
  onButtonClickRef.current = onButtonClick;

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        console.log("Enter key was pressed. Run your function.");
        event.preventDefault();
        onButtonClickRef.current();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <>
      <BountyNavbar
        username={props.username}
        loggedIn={props.loggedIn}
        setLoggedIn={props.setLoggedIn}
        setUsername={props.setUsername}
      />
      <div className="columnContainer">
        <div className="column">
          <div className={"mainContainer"}>
            <div className={"titleContainer"}>
              <div>Sign In</div>
            </div>
            <br />
            <div className={"inputContainer"}>
              <input
                value={username}
                placeholder="Enter Username"
                onChange={(ev) => setLoginUsername(ev.target.value)}
                className={"inputBox"}
              />
              <label className="errorLabel">{usernameError}</label>
            </div>
            <br />
            <div className={"inputContainer"}>
              <input
                value={password}
                type="password"
                placeholder="Enter Password"
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
                value={"Sign In"}
              />
            </div>
          </div>
        </div>
        <div className="column">
          <div className="mainContainer">
            <h1>Welcome to the Bounty App!</h1>
            <p>idk what to put here! :D</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
