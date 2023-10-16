import React, { useState, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return {value: action.val, isValid:action.val.includes('@')}
  }
  if (action.type === 'INPUT_BLUR') {
    return {value: state.value, isValid: state.value.includes('@')}
  }

  return {value: '', isValid: false}
}

const passwordReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return {value: action.val, isValid:action.val.trim().length > 6}
  }
  if (action.type === 'INPUT_BLUR') {
    return {value: state.value, isValid: state.value.trim().length > 6}
  }

  return {value: '', isValid: false}
}

const collegeReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return {value: action.val, isValid:action.val.trim().length > 0}
  }
  if (action.type === 'INPUT_BLUR') {
    return {value: state.value, isValid: state.value.trim().length > 0}
  }

  return {value: '', isValid: false}
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  // const [collegeIsValid, setCollegeIsValid] = useState();
  // const [enteredCollege, setEnteredCollege] = useState('');
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '',
    isValid: null,
  });

  const [collegeState, dispatchCollege] = useReducer(collegeReducer, {
    value: '',
    isValid: null,
  });

  // useEffect(() => {
  //   const identifier = setTimeout(() => {  // Debouncing
  //     console.log('Checking form validity')
  //     setFormIsValid(
  //       enteredEmail.includes('@') && enteredPassword.trim().length > 6 && enteredCollege.trim().length > 0
  //     );
        
  //   }, 500);


  //   return () => {
  //     console.log('cleanup')
  //     clearTimeout(identifier); // Cleanup function- clears the timer set before this/set above
  //   }; 
  // }, [enteredEmail, enteredPassword, enteredCollege]);

  const emailChangeHandler = (event) => {
    dispatchEmail({type: 'USER_INPUT', val: event.target.value}); // This will trigger emailReducer function
    setFormIsValid(
      event.target.value.includes ('@') && passwordState.isValid && collegeState.isValid
    );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type: 'USER_INPUT', val: event.target.value}); // This will trigger passwordReducer function
    setFormIsValid(
      emailState.isValid && event.target.value.trim().length > 6 && collegeState.isValid
    );
  };

  const collegeChangeHandler = (event) => {
    dispatchCollege({type: 'USER_INPUT', val: event.target.value}); // This will trigger collegeReducer function
    setFormIsValid(
      emailState.isValid && passwordState.isValid && event.target.value.trim().length > 0
    );
  };

  const validateEmailHandler = () => {
    dispatchEmail({type: 'INPUT_BLUR'});
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type: 'INPUT_BLUR'});
  };

  const validateCollegeHandler = () => {
    dispatchCollege({type: 'INPUT_BLUR'});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value, collegeState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            collegeState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="college">College Name</label>
          <input
            type="text"
            id="college"
            value={collegeState.value}
            onChange={collegeChangeHandler}
            onBlur={validateCollegeHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
