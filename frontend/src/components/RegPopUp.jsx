import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/Context";
import FirstContent from "./FirstContent";
import SecondContent from "./SecondContent";

const RegPopUp = () => {
  const { clicked, RegPopUpPic, setRegPopUpPic } = useContext(AppContext);

  useEffect(() => {
    if (setRegPopUpPic) {
      setRegPopUpPic({
        intalsPic: true,
        UserNamePic: false,
        otpPic: false,
      });
    }
  }, []);

  const getImageSrc = () => {
    if (RegPopUpPic.intalsPic)
      return "https://fiverr-res.cloudinary.com/npm-assets/layout-service/standard.0638957.png";
    if (RegPopUpPic.UserNamePic)
      return "https://fiverr-res.cloudinary.com/npm-assets/layout-service/with_bubbles.d0fcc17.png";
    if (RegPopUpPic.otpPic)
      return "https://fiverr-res.cloudinary.com/npm-assets/layout-service/with_activation.0dc070c.png";
    return null;
  };

  return (
    <div className="min-h-screen w-full fixed top-0 left-0 bg-black/50 flex justify-center items-center z-50">
      <div className="w-[95%] flex flex-col lg:flex-row justify-center items-center rounded-lg mx-auto sm:w-[80%] md:w-[65%] xl:w-[50%]">
        <div className="flex overflow-hidden rounded-lg h-full w-full bg-white ">
          <img
            width="50%"
            className="hidden lg:block"
            src={getImageSrc()}
            alt="Registration step illustration"
          />

          <form className="min-h-[50vh] flex flex-col justify-between p-5 w-full">
            <div className="flex flex-col mt-5 h-full">
              {clicked ? <SecondContent /> : <FirstContent />}
            </div>

            {!RegPopUpPic.otpPic && (
              <p className="text-sm text-gray-500 mt-4">
                By joining, you agree to the{" "}
                <span className="font-semibold text-green-600 underline">
                  Fiverr Terms of Services
                </span>{" "}
                and to occasionally receive emails from us. Please read our{" "}
                <span className="font-semibold text-green-600 underline">
                  Privacy
                </span>{" "}
                and{" "}
                <span className="font-semibold text-green-600 underline">
                  Policy
                </span>{" "}
                to learn how we use your personal data.
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegPopUp;
