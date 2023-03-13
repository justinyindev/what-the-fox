import React, { useEffect, useState } from "react";
import "./static/css/App.css";
import HomePage from "./components/homePage";
import logo from "./static/images/wtv2.png";
import Marquee from "react-fast-marquee";
import { useSelector } from "react-redux";
import Sidebar from "./components/sidebar";

function App() {
  const [currentHeadline, setCurrentHeadline] = useState("");
  const { headlines } = useSelector((state) => state.headlines);

  useEffect(() => {
    if (headlines.length > 0) {
      setCurrentHeadline(headlines[0].title);
    }
  }, [headlines]);

  return (
    <div>
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
        <Sidebar />
        <HomePage />
      </div>
    </div>
  );
}

export default App;
