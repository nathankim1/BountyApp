import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/pages/home";
import Login from "./components/pages/login";
import "./App.css";
import { useState } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                username={username}
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
                setUsername={setUsername}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login
                username={username}
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
                setUsername={setUsername}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
