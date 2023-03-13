import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../redux/loginSlice";
import "../static/css/sidebar.css";
import Item from "./item";
import Login from "./login";
import ModalShield from "./modalShield";

const Sidebar = () => {
  const { loginOpen } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const loginRef = useRef(null);
  const refresh = () => {
    window.location.reload();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (loginRef.current && !loginRef.current.contains(event.target)) {
        dispatch(setLogin(false));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch]);

  const handleLoginClick = () => {
    dispatch(setLogin(!loginOpen));
  };

  return (
    <div className="sidebar">
      <div className="sidebar-container">
        <li className="sidebar-list">
          <Item heading={"Home"} onClick={refresh} />
          <Item heading={"Favourites"} />
        </li>
        <div className="sidebar-footer">
          <Item heading={"Login"} onClick={handleLoginClick} />
        </div>
      </div>
      {loginOpen && (
        <>
          <ModalShield />
          <div ref={loginRef}>
            <Login />
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
