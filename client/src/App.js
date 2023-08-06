import React, { useEffect } from "react";
import Layout from "./components/Layout";
import { Route, Routes } from "react-router-dom";
import { fetchAllHomes } from "./redux/homesSlice";
import { useDispatch, useSelector } from "react-redux";
import Home from "./components/Home";
import Reserve from "./components/Reserve";
import Reservations from "./components/Reservations";
import AddHome from "./components/AddHome";
import RemoveHome from "./components/RemoveHome";
import HomeDetails from "./components/HomeDetails";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch all homes when the component mounts
    dispatch(fetchAllHomes());
  }, [dispatch]);

  const user = useSelector((state) => state.user.user);

  if (user) {
    return <div>Loading...</div>;
  } else {
    return (
      <Layout>
        <div className="content">
          <Routes>
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Home/:homeId" element={<HomeDetails />} />
            <Route path="/Reserve" element={<Reserve />} />
            <Route path="/Reservations" element={<Reservations />} />
            <Route path="/AddHome" element={<AddHome />} />
            <Route path="/RemoveHome" element={<RemoveHome />} />
          </Routes>
        </div>
      </Layout>
    );
  }
}

export default App;
