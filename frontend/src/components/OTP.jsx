import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../context/Context";
import { PuffLoader } from "react-spinners";

const Otp = () => {
  const { setRegPopUpPic } = useContext(AppContext);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const [validOTP, setValidOTP] = useState(false);
  const [succes, setSucces] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resend, setResend] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  useEffect(() => {
    setRegPopUpPic({
      intalsPic: false,
      UserNamePic: false,
      otpPic: true,
    });
  }, []);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, "");

    if (value.length > 1) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  useEffect(() => {
    const enteredOtp = otp.join("");

    if (enteredOtp.length >= 6) {
      setValidOTP(true);
    } else {
      setValidOTP(false);
    }
  }, [otp]);

const handleResend = () => {
  setOtp(["", "", "", "", "", ""]);
  setResend(true);
  setResendTimer(30); 

  const timerInterval = setInterval(() => {
    setResendTimer((prev) => {
      if (prev <= 1) {
        clearInterval(timerInterval);
        setResend(false);
        return 30;
      }
      return prev - 1;
    });
  }, 1000);
};

  const handelSubmit = () => {};

  return (
    <>
      <div className="bg-white w-auto flex flex-col justify-between h-full rounded-l-lg p-4 ">
        <div className="">
          <div>
            <h3 className="text-xl font-semibold py-3">Confirm your email</h3>

            <p className="text-md font-semibold text-gray-500 py-0.5">
              Enter the verification code we emailed to:
            </p>

            <p className="text-md font-bold text-gray-700 py-1.5">
              email@gmail.com.
            </p>
          </div>
          <div className="flex items-center justify-center gap-x-1 mt-10">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                inputMode="numeric"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputRefs.current[index] = el)}
                className={`w-10 md:w-12 h-10 md:h-12 text-2xl text-center border  rounded focus:outline-none focus:ring-2 focus:ring-gray-800 ${
                  succes ? "border-red-500" : "border-gray-300"
                } `}
              />
            ))}
          </div>
          {succes && (
            <p className="text-red-500 py-2 font-semibold my-1.5">
              You've entered the wrong code. Try again.
            </p>
          )}

          <button
            onClick={handleResend}
            type="button"
            disabled={resend}
            className={`underline font-semibold my-1.5 text-md ${
              resend
                ? "text-gray-400 cursor-not-allowed "
                : "text-gray-800 cursor-pointer"
            }`}
          >
            {resend && <span className="px-1 ">{resendTimer}s</span>}
            Resend Code
          </button>
        </div>

        <div className="w-full  flex items-baseline justify-between">
          <p className="underline font-bold   md:text-lg text-gray-700 cursor-pointer">
            Remind me later
          </p>

          <button
            type="button"
            disabled={!validOTP}
            onClick={handelSubmit}
            className={`border-[1px] w-20 flex items-center justify-center py-1.5 font-bold   rounded-lg text-lg ${
              !validOTP
                ? "cursor-not-allowed bg-gray-400  border-gray-400 text-gray-100 "
                : "border-gray-800 bg-gray-800 cursor-pointer text-white "
            }`}
          >
            {loading ? <PuffLoader size={20} color="#ffffff" /> : " Submit"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Otp;
