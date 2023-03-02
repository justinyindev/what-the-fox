import React, { useEffect, useState } from "react";
import axios from "axios";
import "./newsCard.css";
import { setHeadlines } from "../redux/headlinesSlice";
import { setIsLoading } from "../redux/loadingSlice";
import { useDispatch, useSelector } from "react-redux";

const NewsCard = () => {
  const { headlines } = useSelector((state) => state.headlines);
  const { loading } = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  const [summaries, setSummaries] = useState({});
  const [summaryLoading, setLoadingSummary] = useState({});

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

  const getSummary = async (url) => {
    try {
      setLoadingSummary((prevLoading) => ({ ...prevLoading, [url]: true }));
      const response = await axios.get("/api/summarize", {
        params: { url: url },
      });
      const summary = response.data.summary;
      setSummaries((prevSummaries) => ({ ...prevSummaries, [url]: summary }));
      setLoadingSummary((prevLoading) => ({ ...prevLoading, [url]: false }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleSummarize = async (url) => {
    // If we have not visited this article
    if (!summaries[url]) {
      await getSummary(url);
    } else {
      console.log("Already viisted!");
    }
  };

  return (
    <div>
      {loading ? (
        <div className="newscard-loading-container">
          <span className="newscard-loading-welcome">Hello...</span>
        </div>
      ) : (
        headlines &&
        headlines.map((item) => {
          const loading = summaryLoading[item.url];
          const summary = summaries[item.url];
          return (
            <div key={item._id}>
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
              </div>
              <div>
                <button
                  onClick={() => {
                    handleSummarize(item.url);
                  }}
                  disabled={loading}
                >
                  TL;DR
                </button>
                {summary && <p>{summary}</p>}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default NewsCard;
