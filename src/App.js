import "./App.css";
import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import FB from "./Components/FB";
import Home from "./Components/Home";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import Alert from "./Components/Alert"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from "./Context/notes/NoteState";


function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (msg, type, succ) => {
    setAlert({
      msg: msg,
      type: type,
      succ: succ
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500)
  }

  return (
    <NoteState>
      <Router>
        <Navbar/>
        <header className="dark">
        <Alert alert={alert}/>
          <div className="container my-3">
            <Routes>
              <Route path="/FB" element={<FB />} />
              <Route path="/" element={<Home showAlert={showAlert} />} />
              <Route path="/login" element={<Login showAlert={showAlert} />} />
              <Route path="/signup" element={<SignUp showAlert={showAlert} />} />
            </Routes>
          </div>
        </header>
      </Router>
    </NoteState>
  );
}

export default App;
