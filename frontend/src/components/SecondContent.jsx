import React, { useContext, useEffect, useRef, useState } from "react";
import {
  IoIosCheckmark,
  IoIosCheckmarkCircleOutline,
  IoMdArrowBack,
  IoMdCheckmark,
} from "react-icons/io";
import { AppContext } from "../context/Context";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import ThirdContent from "./ThirdContent";
import axios from 'axios'
import { ClipLoader } from 'react-spinners'
import toast from "react-hot-toast";
const SecondContent = () => {
  const { handleBackModal, setRulesStates, ruleStates, getEmail, getPassword, setGetEmail, setGetPassword } = useContext(AppContext);
  const [secondModalclicked, setSecondModalClicked] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const submitBtnRef = useRef(null);

  const [loadingEmail, setLoadingEmail] = useState(false)
  const [exists, setExists] = useState('')

  const passwordRules = [
    { label: "At least 8 characters", key: "length" },
    { label: "At least 1 uppercase letter", key: "upper" },
    { label: "At least 1 lowercase letter", key: "lower" },
    { label: "At least 1 number", key: "number" },
  ];

  useEffect(() => {
    setRulesStates({
      length: getPassword.length >= 8,
      upper: /[A-Z]/.test(getPassword),
      lower: /[a-z]/.test(getPassword),
      number: /\d/.test(getPassword),
    });
  }, [getPassword]);

  const SubmitData = () => {
    setSecondModalClicked(true);
  };


  const checkMail = async () => {
    try {
      if (getEmail) {
        setLoadingEmail(true)
        const response = await axios.post('http://localhost:5174/api/users/verify-mail', { email: getEmail })
        setLoadingEmail(false)
        setExists(response.data)
      }
    } catch (error) {
      toast.error(error)
    }
  }



  useEffect(() => {
    setLoadingEmail(true)
    setTimeout(() => {
      setLoadingEmail(false)
    }, 500);
  }, [getEmail])





  useEffect(() => {
    let debounce = setTimeout(() => {
      checkMail()
    }, 700);

    return () => {
      clearInterval(debounce)
    }


  }, [getEmail])



  return (
    <>
      {secondModalclicked ? (
        <ThirdContent secondModalclicked={setSecondModalClicked} />
      ) : (
        <div className="bg-white h-[100%]">
          <div
            onClick={handleBackModal}
            className="flex gap-2 cursor-pointer items-center active:scale-95"
          >
            <IoMdArrowBack />
            <h2 className="text-sm font-semibold">Back</h2>
          </div>
          <div className=" flex justify-between flex-col h-[100%]  ">
            <div>
              <h3 className="text-xl font-semibold py-3">
                Continue with your email
              </h3>
              <div className="w-full relative py-3">
                <label htmlFor="Email" className="font-semibold text-md">
                  Email
                </label>
                <input
                  name="email"
                  value={getEmail}
                  onChange={(e) => setGetEmail(e.target.value)}
                  required={true}
                  type="email"
                  placeholder="name@email.com"
                  className="block py-1.5 w-full border-2 ps-1.5 rounded-md text-lg font-semibold border-gray-300 focus:border-2 focus:border-gray-300 outline-0 placeholder:text-lg placeholder:font-normal hover:border-black
                "
                />
                {loadingEmail && <ClipLoader color="#6a7282" size={15} className="absolute text-gray-500 right-3 top-[63%] w-[20px] h-[20px] -translate-y-1/2" />}
              </div>
              <div className="w-full py-3">
                <label htmlFor="Email" className="font-semibold text-md">
                  Password
                </label>
                <div className="relative  py-1.5 border-2 rounded-md border-gray-300 focus:border-2 focus:border-gray-300 hover:border-black">
                  <input
                    required={true}
                    value={getPassword}
                    onChange={(e) => setGetPassword(e.target.value)}
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Your Password"
                    className="  w-full border-0  ps-1.5 text-lg font-semibold  outline-0 placeholder:text-lg placeholder:font-normal 
                "
                  />

                  <div
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 right-4 -translate-y-1/2"
                  >
                    {showPassword ? (
                      <MdOutlineRemoveRedEye
                        size={18}
                        className="active:scale-95 cursor-pointer"
                      />
                    ) : (
                      <FaRegEyeSlash
                        size={18}
                        className="active:scale-95 cursor-pointer"
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                {passwordRules.map((rule, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span
                      className={`border-2 rounded-full p-1 flex items-center justify-center w-5 h-5 ${ruleStates[rule.key]
                        ? "bg-green-500 text-white border-green-500"
                        : "border-gray-300 text-gray-500"
                        }`}
                    >
                      <IoMdCheckmark size={12} />
                    </span>
                    <p
                      className={`text-sm font-semibold ${ruleStates[rule.key]
                        ? "text-green-600 line-through"
                        : "text-gray-600"
                        }`}
                    >
                      {rule.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full items-baseline">
              <button
                ref={submitBtnRef}
                onClick={SubmitData}
                type="button"
                className={`border active:scale-95  font-semibold text-xl text-black border-gray-200 hover:bg-black/40 cursor-pointer  rounded-md w-full py-2 bg-green-500`}
              >
                {exists == 'exists' ? 'Sign In' : 'Continue'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SecondContent;
