import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/pages/home";
import Login from "./components/pages/login";
import Signup from "./components/pages/signup";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
