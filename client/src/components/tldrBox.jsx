import React, { useState } from "react";
import { getSummary } from "../utils/apiService";
import Typewriter from "typewriter-effect";
import "./../static/css/tldrBox.css";

const TldrBox = ({ item }) => {
  const [summary, setSummary] = useState("");
  const [summaryLoading, setLoadingSummary] = useState(false);

  const fetchSummary = async (item) => {
    try {
      setLoadingSummary(true);

      const response = await getSummary(item.title, item.url);
      const summary = response.summary;

      setSummary(summary);
      setLoadingSummary(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSummarize = async (item) => {
    if (item.url) {
      await fetchSummary(item);
    } else {
      console.log("Invalid URL");
    }
  };

  return (
    <div className="tldr-container">
      <button
        className="tldr-button"
        onClick={() => {
          handleSummarize(item);
        }}
        disabled={summaryLoading}
      >
        TL;DR
      </button>
      {summaryLoading ? (
        <Typewriter
          options={{
            strings: ["Scraping article", "summarizing..."],
            autoStart: true,
            loop: true,
          }}
        />
      ) : (
        summary && <p className="tldr-text fade-in">{summary}</p>
      )}
    </div>
  );
};

export default TldrBox;
