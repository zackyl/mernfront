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

function Input(props) {
  // console.log('input props', props)
  // console.log('validators inside', props.validators)

  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || "",
    isValid: props.initialValid || false,
    isTouched: false,
  });
  // pass validators here ,doesn't really matter in reducer
  const changeHandler = (event) => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: props.validators,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: "TOUCH",
    });
  };
  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    props.onInput(props.id, inputState.value, inputState.isValid);
  }, [id, onInput, value, isValid]);

  const inputele =
    props.element === "input" ? (
      <input
        id={props.id}
        type={props.type}
        value={inputState.value}
        onBlur={touchHandler}
        placeholder={props.placeholder}
        onChange={changeHandler}
      />
    ) : (
      // can also use ||
      <textarea
        id={props.id}
        rows={props.rows ?? 3}
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
      <label htmlFor={props.id}>{props.label}</label>
      {inputele}
      {!inputState.isValid && inputState.isTouched ? (
        <p>{props.errorText}</p>
      ) : null}
    </div>
  );
}

export default Input;
