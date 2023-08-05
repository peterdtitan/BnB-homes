import React from "react";
import Layout from "./components/Layout";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Reserve from "./components/Reserve";
import Reservations from "./components/Reservations";
import AddHome from "./components/AddHome";
import RemoveHome from "./components/RemoveHome";
import SingleHome from "./components/SingleHome";

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
          <Route path="Home/SingleHome/:homeId" element={<SingleHome />} />{" "}
          {/* Pass homeId as a URL parameter */}
        </Routes>
      </div>
    </Layout>
  );
}

export default App;
