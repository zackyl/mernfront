import React, { useReducer, useEffect } from "react";
import { validate } from "../../util/validators";
import "./Input.css";

const inputReducer = (state, action) => {
  // console.log('validator inside reducer', action.validators, action)
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

function Input({
  initialValue,
  initialValid,
  validators,
  id,
  onInput,
  element,
  type,
  placeholder,
  rows,
  label,
  errorText,
}) {
  // console.log('input props', rows)
  // console.log('validators inside', props.validators)

  const [inputState, dispatch] = useReducer(inputReducer, {
    value: initialValue || "",
    isValid: initialValid || false,
    isTouched: false,
  });
  // pass validators here ,doesn't really matter in reducer
  const changeHandler = (event) => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: validators,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: "TOUCH",
    });
  };

  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, inputState.value, inputState.isValid);
  }, [id, onInput, value, isValid, inputState.value, inputState.isValid]);

  const inputele =
    element === "input" ? (
      <input
        id={id}
        type={type}
        value={inputState.value}
        onBlur={touchHandler}
        placeholder={placeholder}
        onChange={changeHandler}
      />
    ) : (
      // can also use ||
      <textarea
        id={id}
        rows={rows ?? 3}
        onBlur={touchHandler}
        value={inputState.value}
        onChange={changeHandler}
      />
    );

  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && "form-control--invalid"
      }`}
    >
      <label htmlFor={id}>{label}</label>
      {inputele}
      {!inputState.isValid && inputState.isTouched ? <p>{errorText}</p> : null}
    </div>
  );
}

export default Input;
