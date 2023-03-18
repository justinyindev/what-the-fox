import React from "react";
import { useSelector } from "react-redux";
import { svg } from "../static/svg";
import "../static/css/sidebar.css";

const Item = ({ heading, onClick }) => {
  const { loading } = useSelector((state) => state.loading);
  return (
    <div>
      <button className="sidebar-item" onClick={onClick} disabled={loading}>
        <span className="sidebar-item-svg">{svg[heading]}</span>
        <span className="sidebar-item-heading">{heading}</span>
      </button>
    </div>
  );
};

export default Item;
