import React from 'react';
import {Input} from "@nextui-org/react";
import { useDispatch, useSelector } from 'react-redux';
import backgroundImage from '../img/register-splash.jpg'; 

export default function Register() {

  return (
    <div className='h-screen bg-cover bg-center' style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className='flex flex-col gap-8 items-center justify-center backdrop-blur-sm h-screen'>
            <h1 className='text-4xl text-white bg-black/80 p-4 rounded-xl font-bold tracking-widest mt-18'>
            JOIN BnB HOMES
            </h1>
            <form className='flex flex-col gap-6 items-center justify-center rounded-md p-8 bg-slate-200/80 w-[50%]'>
            <div className=''>
                <Input
                    isClearable
                    type="text"
                    label="Username"
                    variant="bordered"
                    placeholder="Enter new username"
                />
            </div>
            <div>
                <Input
                    isClearable
                    type="password"
                    label="Password"
                    variant="bordered"
                    placeholder="Create your password"
                />
            </div>
            <button className='px-6 py-1 rounded-md bg-green-600 hover:bg-green-900 text-white'>Login</button>
            </form>
        </div>
    </div>
  )
}
