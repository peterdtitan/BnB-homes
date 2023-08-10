import React from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../img/splash.png';

export const Splash = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="flex flex-col gap-8 items-center justify-center backdrop-blur-sm h-screen">
        <h1 className="text-4xl text-white bg-black/80 p-4 rounded-xl font-bold tracking-widest mt-18">
          WELCOME TO BnB HOMES
        </h1>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-10 p-8 bg-slate-200/80 rounded-md">
          <p className="italic">You must login or register to continue...</p>
          <button
            type="button"
            onClick={() => navigate('/Login')}
            className="px-2 py-1 w-20 bg-red-600 hover:bg-red-800 text-white rounded-md"
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => navigate('/Register')}
            className="px-2 -mt-2 md:-mt-0 md:-ml-3 py-1 w-20 bg-emerald-600 text-white hover:bg-emerald-800 hover:text-white rounded-md"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
