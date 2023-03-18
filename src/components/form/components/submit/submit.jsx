import React from "react";
import Typewriter from "typewriter-effect";
import "./submit.css"

const Submit = ({ formLoading, handleSubmit, heading}) => {
  return (
    <div className="submit-container">
      <button className="submit" onClick={handleSubmit}>
        {formLoading ? (
          <Typewriter
            options={{
              strings: ["..."],
              autoStart: true,
              loop: true,
            }}
          />
        ) : (
          heading
        )}
      </button>
    </div>
  );
};

export default Submit;
