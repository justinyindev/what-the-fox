import React from "react";
import Typewriter from "typewriter-effect";
import "./loadingPage.css";

const LoadingPage = () => {
  return (
    <div className="loading-welcome-container">
      <Typewriter
        options={{
          strings: ["....."],
          autoStart: true,
          loop: true,
        }}
      />
    </div>
  );
};

export default LoadingPage;
