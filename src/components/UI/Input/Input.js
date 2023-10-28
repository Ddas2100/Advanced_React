import React, { useRef, useImperativeHandle } from 'react';
// useImperativeHandle allows us to use component or functionality 
// from inside this component imperatively. Which means not through regular state
// management, not by controlling the component through state in the parent component,
// but instead by directly calling or manipulating something in the component programmatically
import classes from './Input.module.css';

// create a reusable Input component which could replace the current input elements which take email and password.
// The new component should take all the data as props.

// To export Input function in a special way
// forwardRef method is used to pass the component fuction 
// It returns a react component (Input) that is being bound to ref
const Input = React.forwardRef((props, ref)=> {
  const inputRef = useRef();

  //Activate is a manually generated function. 
  // Focus method is available in Input DOM object to which we get access through this inputRef
  const activate = () => {
    inputRef.current.focus(); 
  };

  // Two arguments- 1. ref 2. a function that will return an object
  useImperativeHandle(ref, () => {
    return {
      focus: activate
    };
  });

    return (
      <div
        className={`${classes.control} ${
          props.isValid === false ? classes.invalid : ''
        }`}
      >
      <label htmlFor={props.id}>{props.label}</label>
      <input
        ref={inputRef}
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur} 
      />
      </div>
    );  
});

export default Input;