import React from "react";
import "./static/css/App.css";
import NewsCard from "./components/newsCard";
import Calendar from "./components/calendar";

function App() {
  return (
    <div className="homepage">
      <NewsCard />
      <Calendar />
    </div>
  );
}

export default App;
