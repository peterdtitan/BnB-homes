import React, { useState } from 'react';
import { Input } from '@nextui-org/react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../img/register-splash.jpg';
import { setUser } from '../redux/user/userSlice';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const register = async (e) => {
    e.preventDefault();
    if (username.length >= 8 && password.length >= 8) {
      dispatch(setUser({ username, password }));
      localStorage.setItem('user', JSON.stringify({ username, password }));
      navigate('/');
    } else {
      <p>Username and Password must be at least 8 characters long</p>;
    }
  };

  return (
    <div className="h-screen bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="flex flex-col gap-8 items-center justify-center backdrop-blur-sm h-screen">
        <h1 className="text-4xl text-white bg-black/80 p-4 rounded-xl font-bold tracking-widest mt-18">
          JOIN BnB HOMES
        </h1>
        <form className="flex flex-col gap-6 items-center justify-center rounded-md p-8 bg-slate-200/80 w-[50%]">
          <div className="">
            <Input
              isClearable
              type="text"
              label="Username"
              variant="bordered"
              placeholder="Enter new username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <Input
              isClearable
              type="password"
              label="Password"
              variant="bordered"
              placeholder="Create your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="button" onClick={(e) => register(e)} className="px-6 py-1 rounded-md bg-green-600 hover:bg-green-900 text-white">Register</button>
        </form>
      </div>
    </div>
  );
}
