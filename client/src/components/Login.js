import React, { useEffect, useState } from 'react';
import { Input } from '@nextui-org/react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../img/login-splash.jpg';
import { setUser, fetchUser } from '../redux/user/userSlice';


export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);

  const login = async (e) => {
    e.preventDefault();
  
    try {
      const response = await dispatch(fetchUser());
      console.log('Fetched user response:', response.payload);
  
      const foundUser = response.payload.find((u) => u.name === username && u.password === password);
      console.log('Found user:', foundUser);
  
      if (foundUser) {
        localStorage.setItem('user', JSON.stringify(foundUser));
        dispatch(setUser(foundUser));
        navigate('/');
      } else {
        setError('Invalid Login Details!');
        setTimeout(() => {
          setError('');
        }, 2500);
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred during login.');
      setTimeout(() => {
        setError('');
      }, 2500);
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
          {error && (
            <p className="bg-red-300 rounded-md text-red-800 text-xs md:text-md p-2">{error}</p>
          )}
          <button type="button" onClick={login} className="px-6 py-1 rounded-md bg-green-600 hover:bg-green-900 text-white">Login</button>
        </form>
      </div>
    </div>
  );
}
