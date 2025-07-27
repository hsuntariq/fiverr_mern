import React, { useContext, useEffect, useState } from "react";
import { IoMdArrowBack, IoMdCheckmark } from "react-icons/io";
import { AppContext } from "../context/Context";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa";
import ThirdContent from "./ThirdContent";
import axios from "axios";
import { PuffLoader } from "react-spinners";
import toast from "react-hot-toast";

const SecondContent = () => {
    const {
        handleBackModal,
        password,
        setEmail,
        email,
        setPassword,
        setRulesStates,
        ruleStates,
    } = useContext(AppContext);
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [loading, setLoading] = useState(false);
    const [exist, setExist] = useState("");
    const handleBack = () => {
        setClicked(false);
    };

    const passwordRules = [
        { label: "At least 8 characters", key: "length" },
        { label: "At least 1 uppercase letter", key: "upper" },
        { label: "At least 1 lowercase letter", key: "lower" },
        { label: "At least 1 number", key: "number" },
    ];

    useEffect(() => {
        let updatedRules = {
            length: password.length >= 8,
            upper: /[A-Z]/.test(password),
            lower: /[a-z]/.test(password),
            number: /\d/.test(password),
        };

        setRulesStates(updatedRules);
        // [true,true,false,false]
        const allPassedRules = Object.values(updatedRules).every(Boolean);

        setIsPasswordValid(allPassedRules);
    }, [password]);

    const checkMail = async () => {
        try {
            if (!email) return;
            if (email) {
                setLoading(true);
                let response = await axios.post(
                    `http://localhost:5174/api/users/verify-mail`,
                    { email }
                );
                setExist(response.data);
                setLoading(false);
            }
        } catch (error) {
            toast.error(error);
        }
    };

    useEffect(() => {
        let debounce = setTimeout(() => {
            checkMail();
        }, 500);

        return () => {
            clearTimeout(debounce);
        };
    }, [email]);

    useEffect(() => {
        let loadingAnimation;

        if (email) {
            setLoading(true);

            loadingAnimation = setTimeout(() => {
                setLoading(false);
            }, 700);
        }

        return () => {
            if (loadingAnimation) {
                clearTimeout(loadingAnimation);
            }
        };
    }, [email]);

    // const checkPassword = async () => {
    //   if (exist !== "Email Already Existed" || !password) return;
    //   try {
    //     let response = await axios.post(
    //       "http://localhost:5170/api/users/verify-mail",
    //       password
    //     );
    //     console.log(response);
    //   } catch (error) {
    //     toast.error(error);
    //   }
    // };

    // useEffect(() => {
    //   checkPassword();
    // }, [password]);

    return (
        <>
            {clicked ? (
                <ThirdContent handleBack={handleBack} />
            ) : (
                <div className="bg-white   flex flex-col  h-full  ">
                    <div
                        onClick={handleBackModal}
                        className="flex gap-2 cursor-pointer items-center"
                    >
                        <IoMdArrowBack />
                        <h2 className="text-sm font-semibold">Back</h2>
                    </div>

                    <div className=" flex justify-between flex-col h-full  ">

                        <div className=" bg-white p-10 flex flex-col justify-between h-[600px]">
                            <div>
                                <h2 className="text-2xl font-bold">Confirm your email</h2>
                                <p className="text-gray-600 mt-2">Enter the verification code we emailed to: <span className="font-medium">testttt@mail.com</span> <span className="text-blue-600 underline cursor-pointer">(Use a different email)</span></p>
                                <div className="flex space-x-2 mt-6">
                                    {Array(6).fill().map((_, index) => (
                                        <input
                                            key={index}
                                            type="text"
                                            maxLength="1"
                                            className="w-12 h-12 text-center border-2 border-gray-300 rounded focus:border-blue-500 focus:outline-none"
                                        />
                                    ))}
                                </div>
                                <p className="text-blue-600 underline mt-4 cursor-pointer">Resend code</p>
                            </div>
                            <div className="flex flex-col space-y-4">
                                <button className="bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300">Remind me later</button>
                                <button className="bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300">Submit</button>
                            </div>
                        </div>


                    </div>
                </div>
            )}
        </>
    );
};

export default SecondContent;
