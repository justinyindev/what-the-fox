import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCreateUser, setLogin } from "../redux/formSlice";
import "../static/css/sidebar.css";
import Item from "./item";

const Sidebar = () => {
  const { loginOpen, createUserOpen } = useSelector((state) => state.form);
  const dispatch = useDispatch();
  const refresh = () => {
    window.location.reload();
  };

  const handleLoginClick = () => {
    dispatch(setLogin(!loginOpen));
  };

  const handleCreateUserClick = () => {
    dispatch(setCreateUser(!createUserOpen));
  };

  return (
    <div className="sidebar">
      <div className="sidebar-container">
        <li className="sidebar-list">
          <Item heading={"Home"} onClick={refresh} />
          <Item heading={"Favourites"} />
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
