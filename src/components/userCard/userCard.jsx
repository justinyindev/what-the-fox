import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { svg } from "../../static/svg";
import { setLogin } from "../../redux/formSlice";
import "./userCard.css";

const UserCard = () => {
  const { userInfo } = useSelector((state) => state.user);
  const { loginOpen } = useSelector((state) => state.form);
  const { loading } = useSelector((state) => state.loading);
  const dispatch = useDispatch();

  const handleProfile = () => {
    if (!userInfo.token) dispatch(setLogin(!loginOpen));
    else {
      //TODO
    }
  };

  return (
    <div className="user-card-container">
      <div className="user-card-profile">
        <span className="user-card-icon">{svg["Login"]}</span>
        <button
          className="user-card-username-container"
          onClick={handleProfile}
          disabled={loading}
        >
          <h2 className="user-card-username">
            {userInfo.username ? userInfo.username : "Login"}
          </h2>
        </button>
      </div>
    </div>
  );
};

export default UserCard;
