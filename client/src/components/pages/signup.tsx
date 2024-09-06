import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import BountyNavbar from "../elements/navbar";

interface SignupProps {
  url: String;
}

const Signup = (props: SignupProps) => {
  const [username, setLoginUsername] = useState("");
  const [password, setLoginPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const onButtonClick = () => {
    // Validations
    setUsernameError("");
    setPasswordError("");

    if (username === "") {
      setUsernameError("Please enter a username");
      return;
    }

    if (password === "") {
      setPasswordError("Please enter a password");
      return;
    }

    fetch(props.url + "api/user/register", {
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
      .then(() => {
        localStorage.setItem("username", username);
        navigate("/login");
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
      <BountyNavbar />
      <div className="columnContainer">
        <div className="column">
          <div className={"mainContainer"}>
            <div className={"titleContainer"}>
              <div>Sign Up</div>
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
            <div>
              <p>
                Already have an account? <a href="/login">Login</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
