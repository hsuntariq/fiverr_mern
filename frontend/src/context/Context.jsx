import { createContext, useState } from "react";


export const AppContext = createContext()


export const AppProvider = ({ children }) => {
    const [clicked, setClicked] = useState(false)
    const [ruleStates, setRulesStates] = useState({
        length: false,
        upper: false,
        lower: false,
        number: false,
    });
    const [getEmail, setGetEmail] = useState("");
    const [getPassword, setGetPassword] = useState("");
    const [username, setUserName] = useState("");
    const handleNextModal = () => {
        setClicked(true)
    }
    const handleBackModal = () => {
        setClicked(false)
    }
    return <AppContext.Provider value={{
        clicked, setClicked, handleNextModal, handleBackModal, ruleStates, setRulesStates, getEmail, setGetEmail, getPassword, setGetPassword
    }}>
        {children}
    </AppContext.Provider>
}