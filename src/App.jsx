import React, { useEffect, useState } from "react";
import "./static/css/App.css";
import HomePage from "./components/homePage";
import Calendar from "./components/calendar";
import logo from "./static/images/wtv2.png";
import Marquee from "react-fast-marquee";
import { getHeadlines } from "./utils/apiService";

function App() {
  const [currentHeadline, setCurrentHeadline] = useState("");

  useEffect(() => {
    const fetchHeadlines = async () => {
      try {
        const response = await getHeadlines();
        const headline = response[0].title;
        setCurrentHeadline(headline);
      } catch (error) {
        console.error(error);
      }
    };
    fetchHeadlines();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <img className="banner-logo" src={logo} alt="logo" />
      <div className="banner">
        <Marquee
          className="banner-marquee"
          speed={75}
          gradient={false}
          pauseOnHover={true}
        >
          <h1 className="banner-marquee-headline">{currentHeadline}</h1>
        </Marquee>
      </div>
      <div className="calendar">
        <Calendar />
      </div>
      <HomePage />
    </div>
  );
}

export default App;
