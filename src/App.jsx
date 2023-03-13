import React, { useEffect, useState } from "react";
import "./static/css/App.css";
import HomePage from "./components/homePage";
import logo from "./static/images/wtv2.png";
import Marquee from "react-fast-marquee";
import { useSelector } from "react-redux";

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
      <img className="banner-logo" src={logo} alt="logo" />
      <div className="banner">
        <Marquee
          className="banner-marquee"
          speed={25}
          gradient={false}
          pauseOnHover={true}
        >
          <h1 className="banner-marquee-headline">{currentHeadline}</h1>
        </Marquee>
      </div>
      <HomePage />
    </div>
  );
}

export default App;
