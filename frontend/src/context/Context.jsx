import { createContext, useState } from "react";


export const AppContext = createContext()


export const AppProvider = ({ children }) => {
    const [clicked, setClicked] = useState(false)

    const handleNextModal = () => {
        setClicked(true)
    }
    const handleBackModal = () => {
        setClicked(false)
    }
    return <AppContext.Provider value={{
        clicked, setClicked, handleNextModal, handleBackModal
    }}>
        {children}
    </AppContext.Provider>
}