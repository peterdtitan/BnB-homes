import React from 'react';
import {Input} from "@nextui-org/react";
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';

export default function () {
    const [isVisible, setIsVisible] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className='flex flex-col items-center justify-center'>
        <h1 className='text-4xl font-bold tracking-widest mt-12'>
            LOGIN TO BnB
        </h1>
        <form className='flex flex-col gap-y-10 min-w-[80%]'>
            <div className='mt-8'>
                <Input
                    isClearable
                    type="email"
                    label="Email"
                    variant="bordered"
                    placeholder="Enter your email"
                    defaultValue="junior@nextui.org"
                    onClear={() => console.log("input cleared")}
                    className=""
                />
            </div>
            <div>
                <Input
                    isClearable
                    type="email"
                    label="Email"
                    variant="bordered"
                    placeholder="Enter your email"
                    defaultValue="junior@nextui.org"
                    onClear={() => console.log("input cleared")}
                    className="max-w-xs"
                />
            </div>
        </form>
    </div>
  )
}
