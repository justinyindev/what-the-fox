import React from "react";
import "../static/css/sidebar.css";

const Item = ({ heading, onClick }) => {
  return <span className="sidebar-item" onClick={onClick}>{heading}</span>;
};

export default Item;
