import React from 'react'
import { useNavigate, useParams  } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from "@nextui-org/react";
import { AiOutlineWifi } from 'react-icons/ai'
import { BiSolidParking } from 'react-icons/bi'


export default function HomeDetails() {
  const { homeId } = useParams();
  const homes = useSelector((state) => state.homes.homes);
  const selectedHome = homes.find((home) => home.id === parseInt(homeId));

  if (!selectedHome) {
    return <div>Home not found.</div>;
  }

  return (
    <div className='flex flex-col gap-4 md:flex-row justify-center items-center md:justify-between md:items-start px-10 mt-4 md:mt-20'>
        <div className='w-full md:w-[65%] flex rounded-md'>
            <img
                src={selectedHome.image}
                alt={selectedHome.name}
                className='w-full md:w-[100%] h-[300px] md:h-[500px] object-cover object-center'
            />
        </div>
        <div className='flex flex-col gap-y-2 md:mt-0 mt-10'>
            <h1 className='p-2 rounded-md bg-slate-400 font-medium'>{selectedHome.name.toUpperCase()}</h1>
            <p className='max-w-sm p-2 rounded-md bg-slate-200'>
                {homes[0].description}
            </p>
            <div className='flex flex-col mt-2'>
                <h2 className='flex justify-center mt-4 p-1 bg-emerald-200 rounded-md'>AMENITIES AVAILABLE</h2>
                <div className='flex gap-4 mt-2 items-center justify-center'>
                   <p className='p-2 rounded-md bg-slate-200'>
                        <Tooltip content="Free Wi-Fi available on premises" color='primary'>
                            <AiOutlineWifi size={25} />
                        </Tooltip>
                   </p>
                   <p className='p-2 rounded-md bg-slate-200'>
                        <Tooltip content="Free Wi-Fi available on premises" color='primary'>
                            <BiSolidParking size={25} />
                        </Tooltip>
                   </p> 
                   <p className='p-2 rounded-md bg-slate-200'>
                        <Tooltip content="Free Wi-Fi available on premises" color='primary'>
                            <BiSolidParking size={25} />
                        </Tooltip>
                    </p> 
                   <p className='p-2 rounded-md bg-slate-200'>
                        <Tooltip content="Free Wi-Fi available on premises" color='primary'>
                            <AiOutlineWifi size={25} />
                        </Tooltip>
                   </p> 
                </div>
            </div>
        </div>
        <button className='bg-green-400 animate-pulse mt-4 md:mt-0 md:absolute px-4 py-2 md:rounded-l-full xs:rounded-full right-0 bottom-8 md:px-12 md:py-4'>
            <p className='text-xl font-semibold italic'>RESERVE</p>
        </button>
    </div>
  )
}

