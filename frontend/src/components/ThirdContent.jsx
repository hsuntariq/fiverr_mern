import React, { useContext } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { AppContext } from "../context/Context";

const ThirdContent = ({ secondModalclicked }) => {
  const { username, setUserName } = useContext(AppContext)
  return (
    <>
      <form>
        <div
          onClick={() => secondModalclicked(false)}
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

          <p className="text-sm text-nowrap font-bold text-gray-700 py-2.5">
            You can't change your username, so choose wisely.
          </p>

          <label
            htmlFor="UserName"
            className="font-semibold text-gray-600 py-1"
          >
            UserName
          </label>
          <div className="relative w-full border-[2px] py-2.5 rounded-lg border-gray-300  hover:border-black">
            <input
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              type="text"
              name="UserName"
              placeholder="Husnain_Maroof"
              className="ps-1 outline-0 border-0"
            />
          </div>

          <p className="text-gray-600 text-sm font-semibold text-nowrap ">
            {" "}
            Build trust by using your full name or business name
          </p>
        </div>

        <div className="w-full items-baseline mt-10">
          <button

            type="button"
            className="border active:scale-95 bg-gray-300 font-semibold text-xl text-black border-gray-200 hover:bg-black/40 cursor-pointer  rounded-md w-full py-2"
          >
            Create My Account
          </button>
        </div>
      </form>
    </>
  );
};

export default ThirdContent;
