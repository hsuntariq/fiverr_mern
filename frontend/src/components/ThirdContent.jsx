import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/Context";
import { IoMdArrowBack, IoMdCheckmark } from "react-icons/io";
import { PuffLoader } from "react-spinners";
import toast from "react-hot-toast";
import axios from "axios";
import Otp from "./Otp";

const ThirdContent = ({ handleBack }) => {
  const {
    userName,
    setUserName,
    RegPopUpPic,
    setRegPopUpPic,
    email,
    password,
  } = useContext(AppContext);
  const [isUserNameRulesValid, setIsUserNameRulesValid] = useState(false);
  const [existedUserName, setExstedUserName] = useState(false);
  const [loading, setLoading] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [userNameRules, setUserNameRules] = useState({
    tooShort: false,
    invalidStart: false,
    SpecialChar: false,
  });

  useEffect(() => {
    setRegPopUpPic({
      intalsPic: false,
      UserNamePic: true,
      otpPic: false,
    });
  }, []);
  useEffect(() => {
    const rules = {
      tooShort: userName.length < 6,
      invalidStart: /^[^a-zA-Z]/.test(userName),
      SpecialChar: /[^a-zA-Z0-9_]/.test(userName),
    };

    setUserNameRules(rules);

    const isValid = Object.values(rules).every((val) => !val);
    setIsUserNameRulesValid(isValid && !existedUserName);
    console.log(`is userName Valid ${isUserNameRulesValid}`);
  }, [userName, existedUserName]);

  useEffect(() => {
    let loadingAnimation;

    if (userName) {
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
  }, [userName]);

  let CheckUserName = async () => {
    if (userName) {
      try {
        setLoading(true);
        let response = await axios.post(
          "http://localhost:5174/api/users/verify-UserName",
          { userName }
        );

        let isTaken = response.data === "UserName Already Existed";

        setExstedUserName(isTaken);

        setLoading(false);
      } catch (error) {
        toast.error(error);

        setExstedUserName();
      }
    }
  };

  useEffect(() => {
    let debounce = setTimeout(() => {
      CheckUserName();
    }, 700);

    return () => {
      clearTimeout(debounce);
    };
  }, [userName]);

  useEffect(() => {
    if (userName === "") {
      setLoading(false);
    }
  }, [userName]);

  const handelSignUp = async () => {
    setClicked(true);

    try {
      let response = await axios.post(
        "http://localhost:5174/api/users/register-user",
        { email, password, userName }
      );

      console.log(response.data);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      {clicked ? (
        <Otp />
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
                Add a username that's unique to you, this is how you'll appear
                to others.
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
              <div className="block py-1.5 w-full border-2 ps-1.5 rounded-md text-md font-semibold border-gray-300 focus:border-2 focus:border-gray-300 outline-0 placeholder:font-normal hover:border-black pr-1.5 relative">
                <input
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  type="text"
                  name="UserName"
                  placeholder="Husnain_Maroof"
                  className="ps-1 outline-0 border-0 w-[85%]"
                />
                <div className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500">
                  {loading ? (
                    <PuffLoader size={20} color="#6a7282" />
                  ) : (
                    isUserNameRulesValid && (
                      <span
                        className={`border-2 rounded-full p-0.5 flex items-center justify-center    text-green-500 border-green-500`}
                      >
                        <IoMdCheckmark size={15} />
                      </span>
                    )
                  )}
                </div>
              </div>

              {userName === "" || isUserNameRulesValid ? (
                <p className="text-gray-600 py-1.5 text-sm font-semibold">
                  Build trust by using your full name or business name
                </p>
              ) : (
                <p className="text-red-600 py-1.5 text-sm font-semibold">
                  {userNameRules.tooShort ? (
                    <span>
                      That’s too short. A great username must include at least 6
                      characters.
                    </span>
                  ) : userNameRules.invalidStart ? (
                    <span>
                      Your username must begin with a letter and can include
                      numbers and underscores.
                    </span>
                  ) : userNameRules.SpecialChar ? (
                    <span>
                      Your username must not contain special characters except
                      underscores.
                    </span>
                  ) : existedUserName ? (
                    <span>
                      UserName Already Existed Chose Different User Name!
                    </span>
                  ) : null}
                </p>
              )}
            </div>
          </div>

          <div className="w-full items-baseline">
            <button
              onClick={handelSignUp}
              type="button"
              disabled={!isUserNameRulesValid}
              className={`py-1.5 border-2 rounded-md border-gray-300 w-full font-semibold relative ${
                !isUserNameRulesValid
                  ? "cursor-not-allowed text-gray-400 bg-gray-100"
                  : "cursor-pointer bg-gray-800 text-white hover:bg-gray-800/88 hover:text-white"
              }`}
            >
              {loading ? (
                <div
                  className={`flex items-center py-0.5  justify-center w-full `}
                >
                  {loading && <PuffLoader size={20} color="#6a7282" />}
                </div>
              ) : (
                "  Sign up"
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ThirdContent;
