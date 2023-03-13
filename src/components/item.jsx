import React from "react";
import { useSelector } from "react-redux";
import "../static/css/sidebar.css";

const Item = ({ heading, onClick }) => {
  const { loading } = useSelector((state) => state.loading);
  return (
    <button className="sidebar-item" onClick={onClick} disabled={loading}>
      {heading}
    </button>
  );
};

export default Item;
