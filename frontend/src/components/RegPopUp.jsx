import React, { useContext, useState } from 'react'
import { CiApple, CiFacebook } from 'react-icons/ci';
import { MdOutlineEmail } from "react-icons/md";
import { FaApple, FaFacebook, FaFacebookF } from "react-icons/fa";
import SecondContent from './SecondContent';
import FirstContent from './FirstContent';
import { AppContext } from '../context/Context';

const RegPopUp = () => {

    const { clicked } = useContext(AppContext)

    return (
        <>
            <div className="min-h-screen w-full fixed top-0 bg-black/50 flex justify-center items-center">
                <div className="w-[90%] flex flex-col items-baseline rounded-lg min-h-[70%] mx-auto sm:w-[80%] md:w-[60%] lg:w-[50%]">
                    <div className="flex overflow-hidden rounded-lg">
                        <img width={'50%'} className='' src="https://fiverr-res.cloudinary.com/npm-assets/layout-service/standard.0638957.png" alt="" />
                        <div className="flex  bg-white justify-between p-5 flex-col">
                            <form className='bg-white p-4 w-full  flex flex-col justify-center'>
                                {clicked ? <SecondContent /> : <FirstContent />}
                            </form>
                            <p className="text-xs text-gray-500">
                                By joining, you agree to the Fiverr Terms of Service and to occasionally receive emails from us. Please read our Privacy Policy to learn how we use your personal data.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RegPopUp