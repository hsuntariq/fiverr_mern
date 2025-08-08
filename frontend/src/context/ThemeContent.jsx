import { createContext, useState } from "react";

export const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
    const [dark, setData] = useState(false)
    return <ThemeContext.Provider value={{
        dark, setData
    }}>
        {children}
    </ThemeContext.Provider>
}