import React, { useState, useEffect } from "react";
import "../static/css/login.css";

const Login = () => {
  const [signup, setSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [userinput, setUserinput] = useState({});

  const handleSubmit = () => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (emailRegex.test(email)) {
      setError(false);
      setUserinput({
        email: email,
        password: password,
      });
    } else {
      setError(true);
    }
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  useEffect(() => {
    if (!userinput.email || !userinput.password) {
      return;
    }
    if (signup) {
      console.log("user is signing up");
    } else {
      console.log("user is loggin in");
    }
  }, [userinput, signup]);

  return (
    <div className="login-container">
      <div className="login-heading-container">
        <span
          className={`login-heading ${!signup ? "active" : ""}`}
          onClick={() => setSignup(false)}
        >
          Login
        </span>
        <span
          className={`login-heading ${signup ? "active" : ""}`}
          onClick={() => setSignup(true)}
        >
          Signup
        </span>
      </div>
      <div className="login-userinput-container">
        <input
          placeholder="email address"
          className="login-userinput"
          onChange={handleEmail}
          onKeyDown={handleKeyDown}
        ></input>
        <input
          placeholder="password"
          className="login-userinput"
          type="password"
          onChange={handlePassword}
          onKeyDown={handleKeyDown}
        ></input>
        <h2 className="login-invalid">{error && "invalid credentials"}</h2>
        <span className="login-submit" onClick={handleSubmit}>
          {signup ? "Signup" : "Login"}
        </span>
      </div>
    </div>
  );
};

export default Login;
