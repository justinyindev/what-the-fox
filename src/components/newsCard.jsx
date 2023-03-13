import React, { useState } from "react";
import "./../static/css/newsCard.css";
import TldrBox from "./tldrBox";

const separateHeading = (heading) => {
  const splitString = heading.split(" ");
  const firstThree = splitString.slice(0, 3).join(" ");
  const restOfWords = splitString.slice(3).join(" ");

  return {
    firstThree: firstThree,
    restOfWords: restOfWords,
  };
};

const NewsCard = ({ item }) => {
  const { firstThree, restOfWords } = separateHeading(item.title);
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="newscard-main-card-container">
      <span className="newscard-open-close" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? (
          <i className="newscard-minus"></i>
        ) : (
          <i className="newscard-plus"></i>
        )}
      </span>
      <div className="newscard-heading-container">
        <a href={item.url}>
          <h2 className="newscard-heading">
            <span className="newscard-heading-highlighted">{firstThree}</span>{" "}
            {restOfWords}
          </h2>
        </a>
      </div>
      {isOpen ? (
        <div className="newscard-image-text-container">
          <div className="newscard-image-container">
            <img
              className="newscard-image fade-in"
              src={`data:image/jpeg;base64,${item.image}`}
              alt={item.title}
            />
          </div>
          <TldrBox item={item} />
        </div>
      ) : null}
    </div>
  );
};

export default NewsCard;
