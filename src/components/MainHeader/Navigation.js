import React from 'react';

import classes from './Navigation.module.css';
import AuthContext from '../../context (Store)/auth-context';

const Navigation = (props) => {
  return (
    <AuthContext.Consumer>
      {(ctx) => {
        return (
          <nav className={classes.nav}>
            <ul>
              {/* ctx=context, becoz we have isLoggedIn prop in our context in auth-context.js.
              At first, this will show error/ page crash becoz the default value of authentication will only work
              when it will be consumed below without AuthContext.Provider But still we have to use that hook in some different way */}
              {ctx.isLoggedIn && (    
                <li>
                  <a href="/">Users</a>
                </li>
              )}
              {ctx.isLoggedIn && (
                <li>
                  <a href="/">Admin</a>
                </li>
              )}
              {ctx.isLoggedIn && (
                <li>
                  <button onClick={props.onLogout}>Logout</button>
                </li>
              )}
            </ul>
          </nav>
        );
      }}
    </AuthContext.Consumer>
  );
};

export default Navigation;
