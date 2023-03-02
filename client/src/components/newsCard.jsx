import React, { useEffect } from "react";
import axios from "axios";
import "./newsCard.css";
import { setHeadlines } from "../redux/headlinesSlice";
import { setIsLoading } from "../redux/loadingSlice";
import { useDispatch, useSelector } from "react-redux";

const NewsCard = () => {
  const { headlines } = useSelector((state) => state.headlines);
  const { loading } = useSelector((state) => state.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchHeadlines = async () => {
      try {
        dispatch(setIsLoading(true));
        const response = await axios.get("/api/headline");
        console.log(response.data);

        dispatch(setHeadlines(response.data));
        dispatch(setIsLoading(false));
      } catch (error) {
        console.error(error);
      }
    };
    fetchHeadlines();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {loading ? (
        <div className="newscard-loading-container">
          <span className="newscard-loading-welcome">Hello...</span>
        </div>
      ) : (
        headlines &&
        headlines.map((item) => {
          return (
            <div key={item}>
              <div className="newscard-heading-container">
                <a href={item.url}>
                  <h2 className="newscard-heading">{item.title}</h2>
                </a>
              </div>
              <div className="newscard-image-text-container">
                {/* <img
                  className="newscard-image"
                  src={`data:image/jpeg;base64,${item.image}`}
                  alt={item.title}
                /> */}
                <p className="newscard-text">{item.summary}</p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default NewsCard;
