import React, { Profiler } from "react";
import "./App.css";

/** Import components */
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navigation from "./Components/Navigation";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Profile from "./Components/Profile";
import AddTrip from "./Components/AddTrip";
import Home from "./Components/Home";
import Header from "./Components/Header";
import { Container } from "react-bootstrap";
import Members from "./Components/Members";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/members" element={<Members />}></Route>
        <Route path="/addtrip" element={<AddTrip />}></Route>
      </Routes>
    </div>
  );
}

export default App;
