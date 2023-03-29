import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCreateUser, setLogin } from "../../redux/formSlice";
import { useNavigate } from "react-router-dom";
import "./sidebar.css";
import Item from "../item/item";
import { setUserBookmarks } from "../../redux/userSlice";
import { setHeadlines } from "../../redux/headlinesSlice";

const Sidebar = () => {
  const { loginOpen, createUserOpen } = useSelector((state) => state.form);
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleHomepage = () => {
    dispatch(setUserBookmarks([]));
    navigate("/");
  };

  const handleBookmarkClick = () => {
    if (!userInfo.token) {
      dispatch(setLogin(true));
      return;
    }
    dispatch(setUserBookmarks(userInfo.bookmarks));
  };

  const handleLoginClick = () => {
    if (!userInfo.token) dispatch(setLogin(!loginOpen));
  };

  const handleCreateUserClick = () => {
    dispatch(setCreateUser(!createUserOpen));
  };

  return (
    <div className="sidebar">
      <div className="sidebar-container">
        <li className="sidebar-list">
          <Item heading={"Home"} onClick={handleHomepage} />
          <Item heading={"Bookmarks"} onClick={handleBookmarkClick} />
        </li>
        <li className="sidebar-list footer">
          <Item heading={"Login"} onClick={handleLoginClick} />
          <Item heading={"Create Account"} onClick={handleCreateUserClick} />
        </li>
      </div>
    </div>
  );
};

export default Sidebar;
