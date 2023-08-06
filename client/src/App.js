import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { fetchAllHomes } from "./redux/homesSlice";
import { useDispatch, useSelector } from "react-redux";
import Layout from "./components/Layout";
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
  const location = useLocation();

  useEffect(() => {
    // Fetch all homes when the component mounts
    dispatch(fetchAllHomes());
  }, [dispatch]);

  const user = useSelector((state) => state.user.user);

  const isAuthPage = location.pathname === "/Login" || location.pathname === "/Register";

  if (user) {
    // If user data is loading, you can show a loading indicator or any other content
    return <div>Loading...</div>;
  }

  if (isAuthPage) {
    // If the current path is "/Login" or "/Register", render the respective component without the Layout
    return (
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
    );
  }

  return (
    <Layout>
      <div className="content">
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/Home/:homeId" element={<HomeDetails />} />
          <Route path="/Home/:homeId/Reserve" element={<Reserve />} />
          <Route path="/Reservations" element={<Reservations />} />
          <Route path="/AddHome" element={<AddHome />} />
          <Route path="/RemoveHome" element={<RemoveHome />} />
        </Routes>
      </div>
    </Layout>
  );
}

export default App;
