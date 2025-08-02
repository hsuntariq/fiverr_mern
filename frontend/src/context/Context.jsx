import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [clicked, setClicked] = useState(false);

  const [password, setPassword] = useState("");
  const [showPassScreen, setShowPassScreen] = useState(false);
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [RegPopUpPic, setRegPopUpPic] = useState({
    intalsPic: false,
    UserNamePic: false,
    otpPic: false,
  });

  const handleNextModal = () => {
    setClicked(true);
  };
  const handleBackModal = () => {
    setClicked(false);
  };

  const [ruleStates, setRulesStates] = useState({
    length: false,
    upper: false,
    lower: false,
    number: false,
  });

  return (
    <AppContext.Provider
      value={{
        clicked,
        setClicked,
        handleNextModal,
        handleBackModal,
        password,
        setEmail,
        email,
        setPassword,
        setRulesStates,
        ruleStates,
        userName,
        setUserName,
        RegPopUpPic,
        setRegPopUpPic,
        showPassScreen,
        setShowPassScreen
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
