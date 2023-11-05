import { IconButton } from "@mui/material";
import React from "react";
import { XLg } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { enableScroll } from "../utils/reuseable";

const MenuNav = (props) => {
  const navigate = useNavigate();
  return (
    <div
      className="mainmenu"
      style={{
        minHeight: `${window.innerHeight + 100}px`,
        width: `${window.innerWidth}px`,
      }}
    >
      <div
        className="menu_left"
        style={{ minHeight: `${window.innerHeight}px` }}
      >
        <div className="profile_cont">
        <div className="nav-actions">
          <span
            onClick={() => {
              window.scroll({
                top: document.body.scrollHeight,
                behavior: "smooth", // You can use 'smooth' for smooth scrolling or 'auto' for instant scrolling
              });
            }}
          >
            About Us
          </span>
          <span
            onClick={() => {
              document
                .getElementById("roomsCat")
                .scrollIntoView({ behavior: "smooth" });
            }}
          >
            All Rooms
          </span>
          <span>Contact</span>
          <span 
          onClick={()=>{
            navigate("/rixos/location")
          }}>Location</span>
        </div>
        </div>
        <img
              onClick={() => {
                navigate("/");
              }}
              alt="company"
              src="https://res.cloudinary.com/dewkx66gl/image/upload/v1695980190/pngwing.com_2_n6furk.png"
              className="companyname-img "
            />{" "}
      </div>
      <div
        className="menu_right"
        style={{ minHeight: `${window.innerHeight}px` }}
      >
        <div className="menu_right_span">
          <IconButton
            onClick={() => {
              props.setmenu(false);
              enableScroll()
            }}
          >
            <XLg color="white" size={18} />{" "}
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default MenuNav;
