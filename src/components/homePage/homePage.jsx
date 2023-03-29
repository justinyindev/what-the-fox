import React, { useCallback, useEffect, useState } from "react";
import { appendHeadlines, setHeadlines } from "../../redux/headlinesSlice";
import { setIsLoading } from "../../redux/loadingSlice";
import { useDispatch, useSelector } from "react-redux";
import { getHeadlines } from "../../utils/apiService";
import LoadingPage from "../loadingPage/loadingPage";
import NewsCard from "./components/newsCard/newsCard";
import "./homePage.css";
import UserCard from "../userCard/userCard";

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

  const fetchHeadlines = useCallback(async () => {
    try {
      if (userBookmarks.length > 0) {
        dispatch(setHeadlines([]));
        setPage(1);
      }
      console.log(page);
      dispatch(setIsLoading(true));
      const response = await getHeadlines(
        null,
        null,
        userBookmarks,
        userBookmarks.length > 0 ? 1 : page,
        PAGE_LIMIT
      );

      page === 1
        ? dispatch(setHeadlines(response.headlines))
        : dispatch(appendHeadlines(response.headlines));

      setTotalPages(response.pageInfo.totalPages);
      setScrollPos(window.scrollY);
      dispatch(setIsLoading(false));
    } catch (error) {
      console.error(error);
    }
  }, [dispatch, page, userBookmarks]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight - 5) {
        if (page + 1 <= totalPages) {
          setPage(page + 1);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page, totalPages]);

  useEffect(() => {
    fetchHeadlines();
  }, [fetchHeadlines]);

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
      <h1 className="hompage-heading">
        {userBookmarks.length > 0 ? "Bookmarks" : "Home"}
      </h1>
      <UserCard />
      {headlines
        ? headlines.map((item) => {
            return <NewsCard item={item} key={item._id} />;
          })
        : null}
      {loading && <LoadingPage />}
    </div>
  );
};

export default HomePage;
