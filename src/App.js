import React, { useState, useEffect } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './context (Store)/auth-context';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
    if(storedUserLoggedInInformation === '1') {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password, college) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem('isLoggedIn', '1') //Second argument is to check whether the user is logged in or not. 1 is for logged in and 0 is for not logged in
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  return (
    // Providing Context to wrap components. Now all parent and their children componnets have access to this context
    <AuthContext.Provider 
      value= {{
        isLoggedIn: isLoggedIn, 
        //This value will be changed automatically by react upon changing login and that new object value will passed down to all listening components
        onLogout: logoutHandler
      }}
    >  
      {/* No need to use isAuthenticated now as AuthContext can be applicable for all child components */}
      <MainHeader /> 
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
        {/* we are still passing loginHandler and logoutHandler to onLogin and onLogout directly becoz we are 
        using both of them in Login.js and Home.js respectively through props. We are not forwarding them */}
      </main>
    </AuthContext.Provider> 
    // Since the default value of isLoggedIn is false in the App.js; 
    // therefore, AuthContext.Provider may not be necessary. However, it is safer to use.
  );
}

export default App;
