import React, { useEffect, useState } from "react";
import "./../static/css/newsCard.css";
import { setHeadlines } from "../redux/headlinesSlice";
import { setIsLoading } from "../redux/loadingSlice";
import { useDispatch, useSelector } from "react-redux";
import { getHeadlines, getSummary } from "../utils/apiService";
import Typewriter from "typewriter-effect";

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
        const response = await getHeadlines();

        dispatch(setHeadlines(response));
        dispatch(setIsLoading(false));
      } catch (error) {
        console.error(error);
      }
    };
    fetchHeadlines();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchSummary = async (item) => {
    try {
      setLoadingSummary((prevLoading) => ({
        ...prevLoading,
        [item.url]: true,
      }));

      const response = await getSummary(item);
      const summary = response.summary;

      setSummaries((prevSummaries) => ({
        ...prevSummaries,
        [item.url]: summary,
      }));
      setLoadingSummary((prevLoading) => ({
        ...prevLoading,
        [item.url]: false,
      }));
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
    <div className="newscard-container">
      {loading ? (
        <div className="newscard-loading-welcome-container">
          <Typewriter
            options={{
              strings: ["Loading News"],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      ) : (
        headlines &&
        headlines.map((item) => {
          const loading = summaryLoading[item.url];
          const summary = summaries[item.url];

          const splitString = item.title.split(" ");
          const firstThree = splitString.slice(0, 3).join(" ");
          const restOfWords = splitString.slice(3).join(" ");

          return (
            <div key={item._id} className="newscard-main-card-container">
              <div className="newscard-heading-container">
                <a href={item.url}>
                  <h2 className="newscard-heading">
                    <span className="newscard-heading-highlighted">
                      {firstThree}
                    </span>{" "}
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
                <div className="newscard-tldr-container">
                  <button
                    className="newscard-tldr-button"
                    onClick={() => {
                      handleSummarize(item);
                    }}
                    disabled={loading}
                  >
                    TL;DR
                  </button>
                  {loading ? (
                    <Typewriter
                      options={{
                        strings: ["Scraping article", "summarizing..."],
                        autoStart: true,
                        loop: true,
                      }}
                    />
                  ) : (
                    summary && (
                      <p className="newscard-tldr-text fade-in">{summary}</p>
                    )
                  )}
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default NewsCard;
