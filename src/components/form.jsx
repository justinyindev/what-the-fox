import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFormLoading } from "../redux/loadingSlice";
import Typewriter from "typewriter-effect";
import "../static/css/form.css";
import { setUserInfo } from "../redux/userSlice";

const Form = ({ apiService, heading }) => {
  const dispatch = useDispatch();
  const { formLoading } = useSelector((state) => state.loading);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [userinput, setUserinput] = useState({});

  const handleSubmit = () => {
    if (!username || !password) {
      setError(true);
      return;
    }
    if (!formLoading) {
      setUserinput({
        username: username,
        password: password,
      });
    }
  };

  const handleUsername = (event) => {
    setUsername(event.target.value);
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
    if (!userinput.username || !userinput.password) {
      return;
    }

    const fetchData = async () => {
      dispatch(setFormLoading(true));
      const response = await apiService(userinput);
      if (response) {
        if (response.token) {
          dispatch(setUserInfo(response));
        }
        setSuccess(true);
      } else {
        setError(true);
      }
      dispatch(setFormLoading(false));
    };

    fetchData();
  }, [userinput, apiService, dispatch]);

  return (
    <>
      <div className="form-container">
        <h1 className="form-heading">{heading}</h1>
        <div className="form-userinput-container">
          <input
            placeholder="username"
            className="form-userinput"
            onChange={handleUsername}
            onKeyDown={handleKeyDown}
          ></input>
          <input
            placeholder="password"
            className="form-userinput"
            type="password"
            onChange={handlePassword}
            onKeyDown={handleKeyDown}
          ></input>
          <h2 className="form-prompt">
            {error
              ? "invalid credentials / account already exists"
              : success
              ? "success"
              : ""}
          </h2>
          <button className="form-submit" onClick={handleSubmit}>
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
      </div>
    </>
  );
};

export default Form;
