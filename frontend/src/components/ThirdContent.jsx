import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/Context";
import { IoMdArrowBack } from "react-icons/io";
import { PuffLoader } from "react-spinners";
import toast from "react-hot-toast";
import axios from "axios";
import OTP from "./OTP";

const ThirdContent = ({ handleBack }) => {
  const { userName, setUserName, email, password } = useContext(AppContext);
  const [invalid, setInvalid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [exist, setExist] = useState("");
  const [showOTP, setShowOTP] = useState(false)
  useEffect(() => {
    // Regex to check if username contains only alphanumeric characters
    const isValid = /^[a-zA-Z0-9]+$/.test(userName);
    // Set invalid to true if username is empty or contains special characters
    if (isValid) {
      setInvalid(false)
    } else {
      setInvalid(true)

    }
  }, [userName]);



  const checkUserName = async () => {
    try {
      if (!userName) return;
      if (userName) {
        setLoading(true);
        let response = await axios.post(
          `http://localhost:5174/api/users/verify-username`,
          { username: userName }
        );
        console.log(response)
        setExist(response.data);
        setLoading(false);
      }
    } catch (error) {
      // toast.error(error);
      console.log(error)
    }
  };

  useEffect(() => {
    if (userName) {
      setLoading(true)
    }
    let debounce = setTimeout(() => {
      checkUserName();
    }, 500);

    return () => {
      clearTimeout(debounce);
      setLoading(false)
    };
  }, [userName]);


  const handleSignUp = async () => {
    try {
      const response = await axios.post('http://localhost:5174/api/users/register-user', {
        email, password, username: userName
      })
      localStorage.setItem('user', JSON.stringify(response.data))
      console.log(response.data)

    } catch (error) {
      toast.error(error.response.data.message)
    }

  }



  return (
    <>
      {showOTP ? (
        <OTP />
      ) : (
        <div className="bg-white w-full flex flex-col justify-between h-full">
          <div>
            <div
              onClick={handleBack}
              className="flex gap-2 cursor-pointer items-center active:scale-95"
            >
              <IoMdArrowBack />
              <h2 className="text-sm font-semibold">Back</h2>
            </div>

            <div>
              <h3 className="text-xl font-semibold py-3">
                Get your profile started
              </h3>

              <p className="text-md font-semibold text-gray-500 py-0.5">
                Add a username that's unique to you, this is how you'll appear to
                others.
              </p>

              <p className="text-sm font-bold text-gray-700 py-2.5">
                You can't change your username, so choose wisely.
              </p>

              <label
                htmlFor="UserName"
                className="font-semibold text-gray-600 py-1"
              >
                UserName
              </label>
              <div className="block relative py-1.5 w-full border-2 ps-1.5 rounded-md text-md font-semibold border-gray-300 focus:border-2 focus:border-gray-300 outline-0 placeholder:font-normal hover:border-black pr-1.5">
                <input
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  type="text"
                  name="UserName"
                  placeholder="Husnain_Maroof"
                  className="ps-1 outline-0 border-0"
                />
                <div className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500">
                  {loading && <PuffLoader size={20} color="#6a7282" />}
                </div>
              </div>




              {invalid ? (
                <p className="text-red-600 py-1.5 text-sm font-semibold">
                  Username must not contain special characters or be empty
                </p>
              ) : (
                <>
                  {exist == 'exists' ? <p className="text-red-600 py-1.5 text-sm font-semibold">
                    Username already taken
                  </p> : <p className="text-gray-600 py-1.5 text-sm font-semibold">
                    Build trust by using your full name or business name
                  </p>
                  }
                </>

              )}

            </div>
          </div>

          <div className="w-full items-baseline">
            <button
              onClick={handleSignUp}
              type="button"
              disabled={invalid || exist == 'exists'}
              className={`py-1.5 border-2 rounded-md border-gray-300 w-full font-semibold ${invalid || exist == 'exists' || loading
                ? "cursor-not-allowed text-gray-400 bg-gray-100"
                : "cursor-pointer bg-gray-800 text-white hover:bg-gray-800/40 hover:text-white"
                }`}
            >
              {loading ? <PuffLoader size={20} color="#6a7282" /> : 'Continue or Sign up'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ThirdContent;