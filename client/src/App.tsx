import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/pages/home";
import Login from "./components/pages/login";
import Signup from "./components/pages/signup";
import "./App.css";

function App() {
  const url = import.meta.env.VITE_API_URL || "http://localhost:3000/"; // example: props.url + "api/user/login"
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home url={url} />} />
          <Route path="/login" element={<Login url={url} />} />
          <Route path="/signup" element={<Signup url={url} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
