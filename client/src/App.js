import React, { useEffect } from 'react';
import {
  Route, Routes, useLocation, useNavigate,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllHomes } from './redux/homesSlice';
import Layout from './components/Layout';
import Home from './components/Home';
import Reserve from './components/Reserve';
import Reservations from './components/Reservations';
import AddHome from './components/AddHome';
import RemoveHome from './components/RemoveHome';
import HomeDetails from './components/HomeDetails';
import Login from './components/Login';
import Register from './components/Register';
import Splash from './components/Splash';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllHomes());
  }, [dispatch]);

  const user = useSelector((state) => state.user.user);

  const isAuthPage = location.pathname === '/Login' || location.pathname === '/Register';

  useEffect(() => {
    if (!user && !isAuthPage) {
      navigate('/Splash');
    }
  }, [user, isAuthPage, navigate]);

  return (
    <div className="content">
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
      </Routes>

      {user ? (
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Home/:homeId" element={<HomeDetails />} />
            <Route path="/Home/:homeId/Reserve" element={<Reserve />} />
            <Route path="/Reservations" element={<Reservations />} />
            <Route path="/AddHome" element={<AddHome />} />
            <Route path="/RemoveHome" element={<RemoveHome />} />
          </Routes>
        </Layout>
      ) : (
        <Routes>
          <Route path="/Splash" element={<Splash />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
