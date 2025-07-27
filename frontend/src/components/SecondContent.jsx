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
            <div>
              <h3 className="text-xl font-semibold py-3">
                Continue with your email
              </h3>
              <div className="w-full relative py-1.5">
                <label htmlFor="Email" className="font-semibold text-md">
                  Email
                </label>
                <div className="relative  py-1.5 border-2 rounded-md border-gray-300 focus:border-2 focus:border-gray-300 hover:border-black">
                  <input
                    name="email"
                    required={true}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Name@email.com"
                    className=" w-[85%] border-0  ps-1.5 text-md font-semibold  outline-0  placeholder:font-normal"
                  />
                  <div className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500">
                    {loading && <PuffLoader size={20} color="#6a7282" />}
                  </div>
                </div>
              </div>
              <div className="w-full py-1.5">
                <label htmlFor="Email" className="font-semibold text-md">
                  Password
                </label>
                <div className="relative  py-1.5 border-2 rounded-md border-gray-300 focus:border-2 focus:border-gray-300 hover:border-black">
                  <input
                    required={true}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Your Password"
                    className="  w-[85%] border-0  ps-1.5 text-md font-semibold  outline-0  placeholder:font-normal 
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

              <div className="my-4 space-y-2">
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
                type="button"
                disabled={!isPasswordValid}
                onClick={() => setClicked(true)}
                className={`py-1.5 border-2 rounded-md  w-full font-semibold  ${!isPasswordValid
                  ? "cursor-not-allowed text-gray-400 bg-gray-100 border-gray-300"
                  : "cursor-pointer bg-gray-950 text-white  hover:bg-gray-950/80 hover:text-white border-gray-950"
                  }  `}
              >
                {exist == "exists" ? "Sign In" : "Continue"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SecondContent;
