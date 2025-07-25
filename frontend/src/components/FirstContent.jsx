import React, { useContext } from "react";
import { FaApple, FaFacebookF } from "react-icons/fa";
import { AppContext } from "../context/Context";
import { MdOutlineEmail } from "react-icons/md";

const FirstContent = () => {
  const { handleNextModal } = useContext(AppContext);
  return (
    <>
      <div className="flex flex-col justify-center">
        <h2 className="text-xl font-semibold">Create a new account</h2>
        <p className="text-gray-600">Already have an account? Sign in</p>
        <button
          type="button"
          className="border mt-5 border-gray-200 hover:bg-gray-100 cursor-pointer  rounded-md"
        >
          <div className="flex p-2 items-center">
            <img
              src="https://cdn.iconscout.com/icon/free/png-256/free-google-logo-icon-download-in-svg-png-gif-file-formats--brands-pack-logos-icons-189824.png"
              className="w-[20px] object-cover h-[20px]"
              alt=""
            />
            <p className="text-black text-sm font-semibold text-center w-full">
              Continue with Google
            </p>
          </div>
        </button>
        <button
          type="button"
          className="border mb-5 mt-3 border-gray-200 hover:bg-gray-100 cursor-pointer active:scale-95 rounded-md"
        >
          <div onClick={handleNextModal} className="flex p-2 items-center ">
            <MdOutlineEmail />
            <p className="text-black text-sm font-semibold text-center w-full">
              Continue with Email
            </p>
          </div>
        </button>

        <div className="flex gap-2 items-center">
          <hr className="w-full border-0 h-[1px] bg-gray-200" />
          <p className="text-[10px] text-gray-400">OR</p>
          <hr className="w-full border-0 h-[1px] bg-gray-200" />
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className="border mb-5 mt-3 w-full border-gray-200 hover:bg-gray-100 cursor-pointer  rounded-md"
          >
            <div className="flex p-2 items-center">
              <FaApple />
              <p className="text-black text-sm font-semibold text-center w-full">
                Apple
              </p>
            </div>
          </button>
          <button
            type="button"
            className="border mb-5 mt-3 w-full border-gray-200 hover:bg-gray-100 cursor-pointer  rounded-md"
          >
            <div className="flex p-2 items-center">
              <FaFacebookF className="text-blue-500" />
              <p className="text-black text-sm font-semibold text-center w-full">
                Facebook
              </p>
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default FirstContent;
