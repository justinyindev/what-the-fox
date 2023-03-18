import React from "react";
import { useSelector } from "react-redux";
import { svg } from "../../static/svg";
import "./item.css";

const Item = ({ heading, onClick }) => {
  const { loading } = useSelector((state) => state.loading);
  return (
    <div>
      <button className="item" onClick={onClick} disabled={loading}>
        <span className="item-svg">{svg[heading]}</span>
        <span className="item-heading">{heading}</span>
      </button>
    </div>
  );
};

export default Item;
