import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bookmark } from "../../../../utils/apiService";
import { svg } from "../../../../static/svg";
import { appendUserBookmarks } from "../../../../redux/userSlice";
import "./newsCard.css";
import TldrBox from "../tldr/tldrBox";
import { setLogin } from "../../../../redux/formSlice";

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
  const dispatch = useDispatch();

  const handleBookmark = async () => {
    if (!userInfo.token) {
      dispatch(setLogin(true));
      return;
    }
    const response = await bookmark(item.title, userInfo);
    dispatch(appendUserBookmarks(response.bookmarks));
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
          {svg["Bookmarks"]}
        </button>
      </div>
    </div>
  );
};

export default NewsCard;
