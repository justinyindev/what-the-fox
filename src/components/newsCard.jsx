import React, { useState } from "react";
import { useSelector } from "react-redux";
import { bookmark } from "../utils/apiService";
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
  const { userInfo } = useSelector((state) => state.user);

  const handleBookmark = async () => {
    if (!userInfo) {
      return;
    }

    const response = await bookmark(item.title, userInfo);
    console.log(response);
  };

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
      <div className="newscard-footer">
        <button className="newscard-bookmark" onClick={handleBookmark}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M19 20H17.1717L12.7072 15.5354C12.3166 15.1449 11.6835 15.1449 11.2929 15.5354L6.82843 20L5 20V7C5 5.34315 6.34315 4 8 4H16C17.6569 4 19 5.34314 19 7V20ZM17 7C17 6.44772 16.5523 6 16 6H8C7.44772 6 7 6.44772 7 7V17L9.87873 14.1212C11.0503 12.9497 12.9498 12.9497 14.1214 14.1212L17 16.9999V7Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default NewsCard;
