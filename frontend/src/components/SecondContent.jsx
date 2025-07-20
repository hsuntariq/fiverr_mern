import React, { useContext } from 'react'
import { IoMdArrowBack } from "react-icons/io";
import { AppContext } from '../context/Context';

const SecondContent = () => {
    const { handleBackModal } = useContext(AppContext)
    return (
        <>
            <form className='bg-white p-4 w-full  flex flex-col justify-center'>
                <div onClick={handleBackModal} className="flex gap-2 cursor-pointer items-center">
                    <IoMdArrowBack />
                    <h2 className="text-sm font-semibold">Back</h2>
                </div>
            </form >
        </>
    )
}

export default SecondContent