import React from "react";
import "./static/css/App.css";
import NewsCard from "./components/newsCard";
import Calendar from "./components/calendar";
import logo from "./static/images/wtv2.png";

function App() {
  
  return (
    <div className="homepage">
      <img className="homepage-banner-logo" src={logo} alt="logo" />
      <div className="homepage-banner"></div>
      <NewsCard />
      <div className="homepage-calendar-container">
        <Calendar />
      </div>
    </div>
  );
}

export default App;
