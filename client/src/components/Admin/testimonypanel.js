import React from "react";

import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

const PanelTestimony = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="main-layout">
      <div
        className="profile-layout"
        style={{ minHeight: `${window.innerHeight}px` }}
      >
        <div className="profile-nav-admin">
          <div className="nav-column">
            <p onClick={() => navigate("/client/profile")}>
              <span>Overview</span>
            </p>
            <p
              onClick={() => navigate("/client/panel/records")}
              style={{ backgroundColor: "white", color: "rgb(7, 1, 27) " }}
            >
              <span>List Rooms</span>
            </p>
            
            <p
              onClick={() => navigate("/admin/panel/room_type")}
             
            >
                <span>Manage rooms types</span>
            </p>
            <p onClick={() => navigate("/client/panel/records")}>
              <span>Bookings</span>
            </p>
            <p onClick={() => navigate("/client/panel/records")}>
              <span>Manage Testimony</span>
            </p>
            <p onClick={() => navigate("/client/panel/records")}>
              <span>Manage Customers</span>
            </p>
            <p onClick={() => navigate("/client/panel/settings")}>
              <span>Account Settings </span>
            </p>
          </div>

          <div className="signbtn">
            <span
              onClick={() => {
                navigate("/");
              }}
            >
              Sign out
            </span>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default PanelTestimony;
