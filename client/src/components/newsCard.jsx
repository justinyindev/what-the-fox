import React from "react";
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

  return (
    <div className="newscard-main-card-container">
      <div className="newscard-heading-container">
        <a href={item.url}>
          <h2 className="newscard-heading">
            <span className="newscard-heading-highlighted">{firstThree}</span>{" "}
            {restOfWords}
          </h2>
        </a>
      </div>
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
    </div>
  );
};

export default NewsCard;
