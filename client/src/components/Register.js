import React, { useState, useEffect } from 'react';
import { Input } from '@nextui-org/react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../img/register-splash.jpg';
import { setUser } from '../redux/user/userSlice';
import { postUser } from '../redux/user/userSlice';

export const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  // useEffect(() => {
  //   if (user) {
  //     navigate('/');
  //   }
  // }, [user]);

  const register = async (e) => {
    e.preventDefault();

    if (username.length >= 8 && password.length >= 8) {
      try {
        const userData = { name: username, password: password }; 
        const response = await dispatch(postUser(userData));
        const newUser = response.payload;
        localStorage.setItem('user', JSON.stringify(newUser)); 
        navigate('/');
      } catch (error) {
        setErrorMessage('Error registering user');
      }
    } else {
      setErrorMessage('Username and Password must be at least 8 characters long');
      setTimeout(() => {
        setErrorMessage('');
      }, 2500);
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
          {errorMessage && (
            <p className="bg-red-300 rounded-md text-red-800 text-xs md:text-md p-2">{errorMessage}</p>
          )}
          <button type="button" onClick={(e) => register(e)} className="px-6 py-1 rounded-md bg-green-600 hover:bg-green-900 text-white">Register</button>
        </form>
      </div>
    </div>
  );
}
