import { IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Search, Person, List } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CheckProfile } from "./responsehover";
import { CheckTopAds, disableScroll } from "./reuseable";

const MobileTopNav = (props) => {
  const navigate = useNavigate();
  const [searchvalue, setSearchValue] = useState("");
  const Checkuser = useSelector((item) => item.authuser);
  useEffect(() => {
    // CheckProfile(props.setprofile);
  });
  useEffect(() => {
    CheckTopAds(props.topads);
  });

  const handlesearchbox = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="navbar">
      <img
        onClick={() => {
          navigate("/");
        }}
        alt=""
        src="https://res.cloudinary.com/dewkx66gl/image/upload/v1695980190/pngwing.com_2_n6furk.png"
        className="companyname-img "
      />{" "}
      <div className="navcontainerlog">
        {Checkuser && Checkuser.auth ? (
          <>
            <div
              
                 >
              {" "}
              <IconButton
               onClick={() => navigate("/client/profile")}
        >
                <Person size={22} />{" "}
              </IconButton>{" "}
              {props.showmenu ? 
                <IconButton
                onClick={() => {
                  disableScroll();
                  props.setmenu(true);
                }}
              >
                <List/>
              </IconButton>
              :null
              }
             
            </div>
          </>
        ) : (
          <>
            <div className="userlog">
              <div className="signup">
                {" "}
                <span onClick={() => navigate("/user/Signup")}>Join Now</span>
              </div>
            </div>
            {
              props.showmenu ?
              <IconButton
              onClick={() => {
                disableScroll();
                props.setmenu(true);
              }}
            >
              <List />
            </IconButton>
            :null
            }
          
          </>
        )}
      </div>
    </div>
  );
};

export default MobileTopNav;
