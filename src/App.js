import React, { useContext } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './context (Store)/auth-context';



function App() {
  const ctx =  useContext(AuthContext);

  // return (
    // Providing Context to wrap components. Now all parent and their children componnets have access to this context
    // <AuthContext.Provider 
    //   value= {{
    //     isLoggedIn: isLoggedIn, 
        //This value will be changed automatically by react upon changing login and that new object value will passed down to all listening components
      //   onLogout: logoutHandler
      // }}>  
      // No need to use isAuthenticated now as AuthContext can be applicable for all child components
  return (
    <React.Fragment>
      <MainHeader /> 
      <main>
        {!ctx.isLoggedIn && <Login />}
        {ctx.isLoggedIn && <Home />}
        {/* we are still passing loginHandler and logoutHandler to onLogin and onLogout directly becoz we are 
        using both of them in Login.js and Home.js respectively through props. We are not forwarding them */}
      </main>
    </React.Fragment>
  );
    // </AuthContext.Provider> 
    // Since the default value of isLoggedIn is false in the App.js; 
    // therefore, AuthContext.Provider may not be necessary. However, it is safer to use.
  // );
}

export default App;
