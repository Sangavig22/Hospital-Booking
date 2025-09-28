import {createContext, useState} from 'react'

export const AppContent=createContext();

export const AppContentProvider=(props)=>{

    const  backendUrl = import.meta.env.VITE_BACKEND_URL
      const [isLoginMode, setIsLoginMode] = useState(false)
      const [token, setToken] = useState(false);
     

    const value={
        backendUrl,
        isLoginMode,
        setIsLoginMode,
        token,
        setToken
    }

    return (
        <AppContent.Provider value={value}>
            {props.children}
        </AppContent.Provider>
    )
}