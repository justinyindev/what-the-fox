import React, { useEffect } from "react";
import { setHeadlines } from "../redux/headlinesSlice";
import { setIsLoading } from "../redux/loadingSlice";
import { useDispatch, useSelector } from "react-redux";
import { getHeadlines } from "../utils/apiService";
import LoadingPage from "./loadingPage";
import NewsCard from "./newsCard";
import "./../static/css/homePage.css";

const HomePage = () => {
  const { headlines } = useSelector((state) => state.headlines);
  const { loading } = useSelector((state) => state.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchHeadlines = async () => {
      try {
        dispatch(setIsLoading(true));
        const startDate = new Date().setHours(0, 0, 0, 0);
        const endDate = new Date().setHours(23, 59, 59, 999);
        const response = await getHeadlines(startDate, endDate);

        dispatch(setHeadlines(response));
        dispatch(setIsLoading(false));
      } catch (error) {
        console.error(error);
      }
    };
    fetchHeadlines();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="homepage-container">
      {loading ? (
        <LoadingPage />
      ) : (
        headlines &&
        headlines.map((item) => {
          return <NewsCard item={item} key={item._id} />;
        })
      )}
    </div>
  );
};

export default HomePage;
