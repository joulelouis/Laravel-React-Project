import { createContext, useState, useContext } from "react";

//! createContext parameter is the default value
//! default state
const StateContext = createContext({
    user: null,
    token: null,
    setUser: () => {},
    setToken: () => {}
});

//! the props 
export const ContextProvider = ({ children }) => {
    //!create an actual state
    const [user, setUser] = useState({
        name: 'Joule'
    });
    const [token, _setToken] = useState(123);

    //! the '_setToken' has an underscore since we will have separate function for it
    const setToken = (token) => {
        _setToken(token)
        //!session storage
        //!when the user authorized authenticates, we take the token and will be saving it in local storage
        if(token) {
            localStorage.setItem("ACCESS_TOKEN", token);
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
        }
    }

    return(
        <StateContext.Provider value={{
            user,
            token,
            setUser,
            setToken
        }}>
            {/* //!render  */}
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)