import React from "react";
import Layout from "./components/Layout";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Reserve from "./components/Reserve";
import Reservations from "./components/Reservations";
import AddHome from "./components/AddHome";
import RemoveHome from "./components/RemoveHome";

function App() {
  return (
    <Layout>
      <div className="content">
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/Reserve" element={<Reserve />} />
          <Route path="/Reservations" element={<Reservations />} />
          <Route path="/AddHome" element={<AddHome />} />
          <Route path="/RemoveHome" element={<RemoveHome />} />
        </Routes>
      </div>
    </Layout>
  );
}

export default App;
