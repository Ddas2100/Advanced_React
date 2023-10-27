import React, { useState, useEffect } from 'react';

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {}, //This is a dummy function just to get onLogout suggestion during typing for better understanding
  onLogin: (email, password, college) => {}
});

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
        if(storedUserLoggedInInformation === '1') {
          setIsLoggedIn(true);
        }
      }, []);

    const logoutHandler = () => {
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
    }

    const loginHandler = () => {
        localStorage.setItem('isLoggedIn', '1') //Second argument is to check whether the user is logged in or not. 1 is for logged in and 0 is for not logged in
        setIsLoggedIn(true);
    }

    return (
        <AuthContext.Provider 
            value={{
                isLoggedIn:isLoggedIn, 
                onLogout:logoutHandler, 
                onLogin:loginHandler
            }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;