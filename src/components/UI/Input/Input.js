import React from 'react';
import classes from './Input.module.css';

// create a reusable Input component which could replace the current input elements which take email and password.
// The new component should take all the data as props.

const Input = props => {
    return <div
    className={`${classes.control} ${
      props.isValid === false ? classes.invalid : ''
    }`}
  >
    <label htmlFor={props.id}>{props.label}</label>
    <input
      type={props.type}
      id={props.id}
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur} 
    />
  </div>
}

export default Input;