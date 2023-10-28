import React, { useState, useReducer, useContext, useRef } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../context (Store)/auth-context';
import Input from '../UI/Input/Input';

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
  const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [collegeIsValid, setCollegeIsValid] = useState();
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

  const authCtx = useContext(AuthContext);

  const emailInputRef= useRef();
  const passwordInputRef= useRef();
  const collegeInputRef= useRef();

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
    if(formIsValid) {
      authCtx.onLogin(emailState.value, passwordState.value, collegeState.value);
    } else if (!emailIsValid) {
      emailInputRef.current.focus();
    } else if (!passwordIsValid) {
      passwordInputRef.current.focus();
    } else {
      collegeInputRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
      {/* create a reusable Input component which could replace the current input elements which take email and password.
      The new component should take all the data as props. */}
        <Input
          ref={emailInputRef}
          id= "email"
          label= "E-Mail"
          type= "email"
          isValid= {emailIsValid}
          value= {emailState.value}
          onChange= {emailChangeHandler}
          onBlur= {validateEmailHandler}
        />
        <Input
          ref={passwordInputRef}
          id= "password"
          label= "Password"
          type= "password"
          isValid= {passwordIsValid}
          value= {passwordState.value}
          onChange= {passwordChangeHandler}
          onBlur= {validatePasswordHandler}
        />
        {/* <div
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
        </div> */}

        <Input
          ref={collegeInputRef}
          id= "college"
          label= "College Name"
          type= "text"
          isValid= {collegeIsValid}
          value= {collegeState.value}
          onChange= {collegeChangeHandler}
          onBlur= {validateCollegeHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
