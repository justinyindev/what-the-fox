import React, { useState } from "react";
import { getSummary } from "../utils/apiService";
import Typewriter from "typewriter-effect";
import "./../static/css/tldrBox.css";

const TldrBox = ({ item }) => {
  const [summary, setSummary] = useState("");
  const [showTldr, setShowTldr] = useState(false);
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
          setShowTldr(true);
        }}
        disabled={summaryLoading}
      >
        TL;DR
      </button>
      {!showTldr ? (
        <div className="tldr-text-container">
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .pauseFor(2500)
                .typeString("A simple yet powerful native javascript")
                .pauseFor(300)
                .deleteChars(10)
                .typeString(
                  "<strong>JS</strong> plugin for a cool typewriter effect and "
                )
                .typeString(
                  '<strong>only <span style="color: #27ae60;">5kb</span> Gzipped!</strong>'
                )
                .pauseFor(1000)
                .start();
            }}
          />
        </div>
      ) : summaryLoading ? (
        <div className="tldr-text-container">
          <Typewriter
            options={{
              strings: ["Scraping article", "summarizing..."],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      ) : (
        summary && <p className="tldr-text">{summary}</p>
      )}
    </div>
  );
};

export default TldrBox;
