import React, { useEffect, useState, useReducer } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HomePageSkeleton from "../skeletonLoading/HomePageSkeleton";
import SearchBox from "./searchbar";
import TopNav from "../utils/pagenav";

import Rooms from "./Rooms/index";
import Attention from "./attention";
import WhatWeDo from "./whatwedo";
import Testimones from "./testimonies";
import Footer from "./footer.js";
import MobileSearchBox from "./mobilesearc";
import MobileTopNav from "../utils/mobilenav";
import MenuNav from "./menunav";
import { showCoursesm } from "../utils/reuseable";

const Home = () => {
  const [showmennu, setmenu] = useState(false);
  const showmenu=true
  useEffect(() => {
    AOS.init();
  }, []);
  useEffect(()=>{
    window.addEventListener("scroll",showCoursesm())
   
  });
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  const Checkuser = useSelector((item) => item.authuser);

  const navigate = useNavigate();
  return (
    <div className="mainLayoutb">
      <div className="desktop">
        <div
          className="front_home"
          style={{
            backgroundImage:
              "url(https://res.cloudinary.com/dewkx66gl/image/upload/v1695897589/view_wy0gvb.jpg)",
            minHeight: `${window.innerHeight - 200}px`,
          }}
        >
          <div
            className="imagecover"
            style={{ minHeight: `${window.innerHeight - 200}px` }}
          >
            {" "}
            <TopNav />
            <div className="front_form">
              {" "}
              <SearchBox />
            </div>
          </div>
        </div>
      </div>

      {showmennu ? (
        <div className="mobile">
          <MenuNav setmenu={setmenu} />
        </div>
      ) : null}

      <div className="mobile">
        <div
          className="front_home"
          style={{
            backgroundImage:
              "url(https://res.cloudinary.com/dewkx66gl/image/upload/v1695897589/view_wy0gvb.jpg)",
            minHeight: `${window.innerHeight}px`,
          }}
        >
          <div
            className="imagecover"
            style={{ minHeight: `${window.innerHeight}px` }}
          >
            {" "}
            <MobileTopNav setmenu={setmenu} showmenu={showmenu}/>
            <div className="mobileboxs">
              <MobileSearchBox />
            </div>
          </div>
        </div>
      </div>

      <Rooms />
      <Attention />
      <WhatWeDo />
      <Testimones />

      <Footer />
    </div>
  );
};

export default Home;
