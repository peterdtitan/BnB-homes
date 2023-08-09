import React, { useState } from 'react';
import { Input } from '@nextui-org/react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../img/login-splash.jpg';
import { setUser } from '../redux/user/userSlice';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser && storedUser.username === username && storedUser.password === password) {
      dispatch(setUser(storedUser));
      navigate('/');
    } else {
      console.log('Incorrect username or password.');
    }
  };

  return (
    <div className="h-screen bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="flex flex-col gap-8 items-center justify-center backdrop-blur-sm h-screen">
        <h1 className="text-4xl text-white bg-black/80 p-4 rounded-xl font-bold tracking-widest mt-18">
          LOGIN TO BnB HOMES
        </h1>
        <form className="flex flex-col gap-6 items-center justify-center rounded-md p-8 bg-slate-200/80 w-[50%]">
          <div className="">
            <Input
              type="text"
              label="Username"
              variant="bordered"
              placeholder="Enter your username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <Input
              type="password"
              label="Password"
              variant="bordered"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button onClick={login} className="px-6 py-1 rounded-md bg-green-600 hover:bg-green-900 text-white">Login</button>
        </form>
      </div>
    </div>
  );
}
