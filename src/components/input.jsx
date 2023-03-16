import React from "react";
import "../static/css/input.css";

const Input = ({ handleChange, handleKeyDown, placeholder, autoFocus=false }) => {
  return (
    <div className="input-container">
      <input
        autoFocus={autoFocus}
        placeholder={placeholder}
        className="input-bar"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      ></input>
    </div>
  );
};

export default Input;
