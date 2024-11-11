import { useContext, useState } from "react";
import { createContext } from "react";

const stateContext = createContext({
    users: null,
    token: null,
    setUser: () => {},
    setToken: () => {},
    deleteToken: () => {}
});

export const ContextProvider = ({children}) => {
    const [user, setUser] = useState({});
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN')); //localStorage.getItem('ACCESS_TOKEN')

    const setToken = (token) => {
        _setToken(token);
        (token) ? localStorage.setItem('ACCESS_TOKEN', token) : localStorage.removeItem('ACCESS_TOKEN');
    }

    const deleteToken = () => {
        _setToken('');
        localStorage.setItem('ACCESS_TOKEN', '');
    }

    return (
     <stateContext.Provider 
        value={{
            user,
            token,
            setUser,
            setToken,
            deleteToken,
        }}
     >
        {children}
     </stateContext.Provider>  
    )
}

export const useStateContext = () => useContext(stateContext);