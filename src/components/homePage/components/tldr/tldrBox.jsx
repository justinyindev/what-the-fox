import React, { useState } from "react";
import Typewriter from "typewriter-effect";
import "./tldrBox.css";

const TldrBox = ({ item }) => {
  const [showTldr, setShowTldr] = useState(false);

  return (
    <div className="tldr-container">
      <button
        className="tldr-button"
        onClick={() => {
          setShowTldr(!showTldr);
        }}
      >
        TL;DR
      </button>
      <div className="tldr-text-container">
        {!showTldr ? (
          <Typewriter
            className="tldr-type-writer"
            onInit={(typewriter) => {
              typewriter
                .pauseFor(1500)
                .typeString("Click the tldr")
                .pauseFor(300)
                .deleteChars(4)
                .typeString("<strong>TL;DR</strong>")
                .typeString(
                  ' button to get a <span style="color: #fff200;">short summary</span> of the article'
                )
                .pauseFor(1000)
                .start();
            }}
          />
        ) : (
          item.summary && <p className="tldr-text">{item.summary}</p>
        )}
      </div>
    </div>
  );
};

export default TldrBox;
