import React from "react";
import "../static/css/input.css";

const Input = ({ handleChange, handleKeyDown, placeholder }) => {
  return (
    <div className="input-container">
      <input
        placeholder={placeholder}
        className="input-bar"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      ></input>
    </div>
  );
};

export default Input;
