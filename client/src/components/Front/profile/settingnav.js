import React, { useEffect, useState } from "react";


import { KeyFill, ListCheck, Person, XLg } from "react-bootstrap-icons";

import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import SettiingForm from "./settings";
import Footer from "../footer";
import SectionNav from "../../utils/sectionnav";
import { Signout } from "../../../store/actions/adminActions";
import { IconButton } from "@mui/material";
import { enableScroll } from "../../utils/reuseable";
import MobileTopNav from "../../utils/mobilenav";
import { MdOutlineDashboardCustomize } from "react-icons/md";

const SettingsPanel = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
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
            <p onClick={() => navigate("/client/profile")}>
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
            <p
              onClick={() => navigate("/client/panel/settings")}
              style={{ backgroundColor: "white", color: "rgb(7, 1, 27) " }}
            >
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
            <p onClick={() => navigate("/client/profile")}>
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
            <p
              onClick={() => navigate("/client/panel/settings")}
              style={{ backgroundColor: "white", color: "rgb(7, 1, 27) " }}
            >
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
        <SettiingForm />
      </div>

      <Footer />
    </div>
  );
};

export default SettingsPanel;
