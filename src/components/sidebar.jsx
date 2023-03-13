import React, { useState } from "react";
import "../static/css/sidebar.css";
import Item from "./item";
import Login from "./login";

const Sidebar = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const refresh = () => {
    window.location.reload();
  };

  const handleLoginClick = () => {
    setLoginOpen(true);
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
      {loginOpen && <Login />}
    </div>
  );
};

export default Sidebar;
