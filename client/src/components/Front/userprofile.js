import React, { useEffect, useState } from "react";
import ProfileNav from "../utils/profileNav";
import Footer from "./footer";
import { KeyFill, ListCheck, Person, XLg } from "react-bootstrap-icons";
import SectionNav from "../utils/sectionnav";
import { useDispatch, useSelector } from "react-redux";
import { Signout } from "../../store/actions/adminActions";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import MobileTopNav from "../utils/mobilenav";
import { IconButton } from "@mui/material";
import { enableScroll } from "../utils/reuseable";
import { MdOutlineDashboardCustomize } from "react-icons/md";

const UserPanel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const myaccount = useSelector((data) => data.authuser);
  const [showmennu, setmenu] = useState(false);
  const showmenu = true;
  useEffect(()=>{enableScroll()},[])
  return (
    <div className="main-layout">
    <div className="desktop">
      <SectionNav/>
    </div>
    <div className="mobile">
    <MobileTopNav  showmenu={showmenu} setmenu={setmenu}/>
    </div>
      
    {showmennu ? (
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
          
          <div className="profile-nav">
          <div>
            <p style={{ backgroundColor: "white", color: "rgb(7, 1, 27) " }}>
              <Person /> <span>Profile</span>
            </p>
            <p onClick={() => navigate("/client/panel/records")}>
              <ListCheck />
              <span>Order Records</span>
            </p>
            <p onClick={() => navigate("/client/panel/specail_orders")}>
              <MdOutlineDashboardCustomize />
              <span> Special Order </span>
            </p>
            <p onClick={() => navigate("/client/panel/settings")}>
              <KeyFill />
              <span>Account Settings </span>
            </p>
          </div>
          <div className="signbtn">
            <span
              onClick={() => {
                dispatch(Signout());
                navigate("/");
              }}
            >
              Sign out
            </span>
          </div>
        </div>

        
          </div>
          <div
            className="menu_right"
            style={{ minHeight: `${window.innerHeight}px` }}
          >
            <div className="menu_right_span">
              <IconButton
                onClick={() => {
                  enableScroll();
                  setmenu(false);
            
                  
                }}
              >
                <XLg color="white" size={30} />{" "}
              </IconButton>
            </div>
          </div>
        </div>
      ) : null}

      <div
        className="profile-layout"
        style={{ minHeight: `${window.innerHeight}px` }}
      >
        <div className="profile-nav desktop">
          <div>
            <p style={{ backgroundColor: "white", color: "rgb(7, 1, 27) " }}>
              <Person /> <span>Profile</span>
            </p>
            <p onClick={() => navigate("/client/panel/records")}>
              <ListCheck />
              <span>Order Records</span>
            </p>
            <p onClick={() => navigate("/client/panel/specail_orders")}>
              <MdOutlineDashboardCustomize />
              <span> Special Order </span>
            </p>
            <p onClick={() => navigate("/client/panel/settings")}>
              <KeyFill />
              <span>Account Settings </span>
            </p>
          </div>
          <div className="signbtn">
            <span
              onClick={() => {
                dispatch(Signout());
                navigate("/");
              }}
            >
              Sign out
            </span>
          </div>
        </div>
        <div className="profile-detail">
          <p>
            {myaccount && myaccount.account ? myaccount.account.fullname : ""}
          </p>
          <p>
            Joined Since :
            {myaccount && myaccount.account 
              ? format(new Date(myaccount.account.createdAt), "eee dd MMM yyyy")
              : ""}
          </p>
          <p>
            Total Bookings{" "}
            {myaccount && myaccount.account && myaccount.account.bookings
              ? myaccount.account.bookings.length
              : ""}{" "}
          </p>
          <p></p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UserPanel;
