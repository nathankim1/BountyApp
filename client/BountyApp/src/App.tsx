import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/home'
// import Login from './login'
import './App.css'
import { useEffect, useState } from 'react'

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [username, setUsername] = useState('')

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home username={username} loggedIn={loggedIn} />} />
          {/* <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App