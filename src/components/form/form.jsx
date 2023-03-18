import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFormLoading } from "../../redux/loadingSlice";
import { setUserInfo } from "../../redux/userSlice";
import Input from "./components/input/input";
import Submit from "./components/submit/submit";
import "./form.css";

const Form = ({ apiService, heading }) => {
  const dispatch = useDispatch();
  const { formLoading } = useSelector((state) => state.loading);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
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
          <Input
            handleChange={handleUsername}
            handleKeyDown={handleKeyDown}
            svgType="Login"
            placeholder={"username"}
            autoFocus={true}
          />
          <Input
            handleChange={handlePassword}
            handleKeyDown={handleKeyDown}
            svgType="Login"
            placeholder={"password"}
          />
          <h2 className="form-prompt">
            {error && "invalid credentials / account already exists"}
          </h2>
          <Submit
            formLoading={formLoading}
            handleSubmit={handleSubmit}
            heading={heading}
          />
        </div>
      </div>
    </>
  );
};

export default Form;
