import React, { useEffect, useState, useRef } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/homePage/homePage";
import logo from "./static/images/wtv2.png";
import Marquee from "react-fast-marquee";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./components/sidebar/sidebar";
import Form from "./components/form/form";
import ModalShield from "./components/modalShield/modalShield";
import { setCreateUser, setLogin } from "./redux/formSlice";
import { createUser, login } from "./utils/apiService";
import "./static/css/App.css";

function App() {
  const [currentHeadline, setCurrentHeadline] = useState("");
  const { headlines } = useSelector((state) => state.headlines);
  const { loginOpen, createUserOpen } = useSelector((state) => state.form);
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const formRef = useRef(null);

  useEffect(() => {
    console.log({ userInfo });
  }, [userInfo]);

  const apiServiceLogin = async (userinput) => {
    try {
      const response = await login(userinput.username, userinput.password);
      if (response) {
        dispatch(setLogin(false));
      }
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const apiServiceCreateUser = async (userInput) => {
    try {
      const response = await createUser(userInput);
      if (response) {
        dispatch(setCreateUser(false));
      }
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (headlines.length > 0) {
      setCurrentHeadline(headlines[0].title);
    }
  }, [headlines]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        dispatch(setLogin(false));
        dispatch(setCreateUser(false));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch]);

  return (
    <>
      <div className="banner">
        <img className="banner-logo" src={logo} alt="logo" />
        <Marquee
          className="banner-marquee"
          speed={25}
          gradient={false}
          pauseOnHover={true}
        >
          <h1 className="banner-marquee-headline">{currentHeadline}</h1>
        </Marquee>
      </div>
      <div className="main-content">
        {loginOpen && (
          <>
            <ModalShield />
            <div ref={formRef}>
              <Form apiService={apiServiceLogin} heading={"Login"} />
            </div>
          </>
        )}
        {createUserOpen && (
          <>
            <ModalShield />
            <div ref={formRef}>
              <Form
                apiService={apiServiceCreateUser}
                heading={"Create Account"}
              />
            </div>
          </>
        )}
        <Sidebar />
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
