import React, { useContext, useState } from "react";
import { AppContext } from "../context/Context";
import { IoMdArrowBack } from "react-icons/io";

const ThirdContent = ({ handleBack }) => {
  const { userName, setUserName } = useContext(AppContext);
  const [isUserNameRulesValid, setIsUserNameRulesValid] = useState(false);
  return (
    <>
      <div className="bg-white w-full  flex flex-col justify-between h-full">
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

            <p className="text-sm  font-bold text-gray-700 py-2.5">
              You can't change your username, so choose wisely.
            </p>

            <label
              htmlFor="UserName"
              className="font-semibold text-gray-600 py-1"
            >
              UserName
            </label>
            <div className="block py-1.5 w-full border-2 ps-1.5 rounded-md text-md font-semibold border-gray-300 focus:border-2 focus:border-gray-300 outline-0  placeholder:font-normal hover:border-black pr-1.5">
              <input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                type="text"
                name="UserName"
                placeholder="Husnain_Maroof"
                className="ps-1 outline-0 border-0"
              />
            </div>

            <p className="text-gray-600 py-1.5 text-sm font-semibold ">
              Build trust by using your full name or business name
            </p>
          </div>
        </div>

        <div className="w-full items-baseline ">
          <button
            type="button"
            disabled={!isUserNameRulesValid ? "true" : "false"}
            className={`py-1.5 border-2 rounded-md border-gray-300 w-full font-semibold  ${
              !isUserNameRulesValid
                ? "cursor-not-allowed text-gray-400 bg-gray-100"
                : "cursor-pointer bg-gray-800 text-white  hover:bg-gray-800/40 hover:text-white"
            }  `}
          >
            Continue or Sign up
          </button>
        </div>
      </div>
    </>
  );
};

export default ThirdContent;
