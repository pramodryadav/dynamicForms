import React, { useEffect,createContext, useState, useMemo } from 'react';
import { getSubdirectory } from '../utilities/GetSubdirectory';

const ThemeContext = createContext({
    mode: "light",
    setMode: () => { }
});

const ThemeContextProvider = ({ children }) => {
    const subdirectory = getSubdirectory();
    const [mode, setMode] = useState(() => {
        return localStorage.getItem(`${subdirectory}-themeMode`) || "light"
    });

    useEffect(() => {
        localStorage.setItem(`${subdirectory}-themeMode`, mode)

    }, [mode,subdirectory]);

    const value = useMemo(() => {
        return { mode, setMode }
    }, [mode])
    return (
        <ThemeContext.Provider value={value}>
            {
                children
            }
        </ThemeContext.Provider>
    )
}

export { ThemeContext, ThemeContextProvider }