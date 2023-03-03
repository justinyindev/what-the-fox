import React, { useState } from "react";
import { getSummary } from "../utils/apiService";
import Typewriter from "typewriter-effect";
import "./../static/css/tldrBox.css";

const TldrBox = ({ item }) => {
  const [summaries, setSummaries] = useState("");
  const [summaryLoading, setLoadingSummary] = useState(false);

  const fetchSummary = async (item) => {
    try {
      setLoadingSummary(true);
      const response = await getSummary(item);
      const summary = response.summary;

      setSummaries(summary);
      setLoadingSummary(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSummarize = async (item) => {
    // If we have not visited this article
    if (!summaries[item.url]) {
      await fetchSummary(item);
    } else {
      console.log("Already viisted!");
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
        summaries && <p className="tldr-text fade-in">{summaries}</p>
      )}
    </div>
  );
};

export default TldrBox;
