import React, { useEffect, useState } from "react";
import { setHeadlines, appendHeadlines } from "../redux/headlinesSlice";
import { setIsLoading } from "../redux/loadingSlice";
import { useDispatch, useSelector } from "react-redux";
import { getHeadlines } from "../utils/apiService";
import LoadingPage from "./loadingPage";
import NewsCard from "./newsCard";
import "./../static/css/homePage.css";

const PAGE_LIMIT = 5;

const HomePage = () => {
  const { headlines } = useSelector((state) => state.headlines);
  const { loading } = useSelector((state) => state.loading);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [scrollPos, setScrollPos] = useState(0);
  const dispatch = useDispatch();

  const fetchHeadlines = async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await getHeadlines(null, null, page, PAGE_LIMIT);
      setTotalPages(response.pageInfo.totalPages);

      if (page === 1) {
        dispatch(setHeadlines(response.headlines));
      } else {
        dispatch(appendHeadlines(response.headlines));
      }

      setScrollPos(window.scrollY);
      dispatch(setIsLoading(false));
    } catch (error) {
      console.error(error);
    }
  };

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    // If within 2px of the bottom of the page
    if (scrollTop + clientHeight >= scrollHeight) {
      console.log(totalPages)
      if (page + 1 <= totalPages) {
        setPage(page + 1);
      }
    }
  };

  useEffect(() => {
    fetchHeadlines();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, totalPages]);

  useEffect(() => {
    window.scrollTo(0, scrollPos);
  }, [scrollPos]);

  return (
    <div className="homepage-container">
      {headlines &&
        headlines.map((item) => {
          return <NewsCard item={item} key={item._id} />;
        })}
      {loading ? <LoadingPage /> : null}
    </div>
  );
};

export default HomePage;
