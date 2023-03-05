import React from "react";
import "./static/css/App.css";
import HomePage from "./components/homePage";
import Calendar from "./components/calendar";
import logo from "./static/images/wtv2.png";

function App() {
  return (
    <div>
      <img className="banner-logo" src={logo} alt="logo" />
      <div className="navbar"></div>
      <div className="calendar">
        <Calendar />
      </div>
      <HomePage />
    </div>
  );
}

export default App;
