import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar";
import Home from "./components/Home";
import Reservations from "./components/Reservations";
import AddHome from "./components/AddHome";
import RemoveHome from "./components/RemoveHome";
import Reserve from "./components/Reserve";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/Reserve" element={<Reserve />} />
          <Route path="/Reservations" element={<Reservations />} />
          <Route path="/AddHome" element={<AddHome />} />
          <Route path="/RemoveHome" element={<RemoveHome />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
