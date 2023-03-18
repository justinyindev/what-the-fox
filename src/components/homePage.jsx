import React, { useEffect, useState } from "react";
import { setHeadlines, appendHeadlines } from "../redux/headlinesSlice";
import { setIsLoading } from "../redux/loadingSlice";
import { useDispatch, useSelector } from "react-redux";
import { getHeadlines } from "../utils/apiService";
import LoadingPage from "./loadingPage";
import NewsCard from "./newsCard";
import "./../static/css/homePage.css";
import UserCard from "./userCard";

const PAGE_LIMIT = 12;

const HomePage = () => {
  const { headlines } = useSelector((state) => state.headlines);
  const { loading } = useSelector((state) => state.loading);
  const { userBookmarks } = useSelector((state) => state.user);
  const { loginOpen, createUserOpen } = useSelector((state) => state.form);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [scrollPos, setScrollPos] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchHeadlines = async () => {
      try {
        dispatch(setIsLoading(true));
        const response = await getHeadlines(
          null,
          null,
          userBookmarks,
          page,
          PAGE_LIMIT
        );
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
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight - 5) {
        if (page + 1 <= totalPages) {
          setPage(page + 1);
        }
      }
    };
    fetchHeadlines();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page, totalPages, userBookmarks, dispatch]);

  useEffect(() => {
    window.scrollTo(0, scrollPos);
  }, [scrollPos]);

  return (
    <div
      className="homepage-container"
      style={{
        zIndex: loginOpen || createUserOpen ? -1 : 100,
      }}
    >
      <h1 className="hompage-heading">{userBookmarks.length > 0 ? "Bookmarks" : "Home"}</h1>
      <UserCard />
      {loading && page === 1 && <LoadingPage />}
      {headlines &&
        headlines.map((item) => {
          return <NewsCard item={item} key={item._id} />;
        })}
      {loading && page > 1 && <LoadingPage />}
    </div>
  );
};

export default HomePage;
