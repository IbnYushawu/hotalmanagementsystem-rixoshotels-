import React, { useEffect, useState } from "react";
import { KeyFill, ListCheck, Person, X, XLg } from "react-bootstrap-icons";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import Footer from "../footer";
import SectionNav from "../../utils/sectionnav";
import { Signout } from "../../../store/actions/adminActions";
import BookingsRecord from "./mybookings";
import { IconButton } from "@mui/material";
import PrintDoc from "./printdoc";
import MobileTopNav from "../../utils/mobilenav";
import { enableScroll } from "../../utils/reuseable";
import SkeletonLoadingCards from "../../skeletonLoading/SkeletonLoadingCards";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import ContactMessage from "./messageAdmin";
import QuestMessage from "./messageAdmin";
import QuestRefund from "./questrefund";

const BookingsPanel = () => {
  const myAccount = useSelector((data) => data.authuser);
  const [orderData, setData] = useState({});
  const [showMsg, setMsg] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showmennu, setmenu] = useState(false);
  const [showcontact, setcontact] = useState(false);
  const [showRefund, setRefund] = useState(false);
  const [orderId, setorderid] = useState("");
  const [selectedEmail, setemail] = useState("");
  const [selectedroom,setroom]=useState("");
  const showmenu = true;
  useEffect(() => {
    enableScroll();
  }, []);
  useEffect(() => {
    if (myAccount && myAccount.data) {
      setemail(myAccount.data.email);
    }
  }, [myAccount]);

  return (
    <>
      {" "}
      {myAccount && myAccount.account ? (
        <div className="main-layout">
          <div className="desktop">
            <SectionNav />
          </div>
          <div className="mobile">
            <MobileTopNav showmenu={showmenu} setmenu={setmenu} />
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
                    <p
                      onClick={() => navigate("/client/panel/records")}
                      style={{
                        backgroundColor: "white",
                        color: "rgb(7, 1, 27) ",
                      }}
                    >
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
            className="profile-layout "
            style={{ minHeight: `${window.innerHeight}px` }}
          >
          {
            showRefund ?
            <div
                className="congrate-msg"
                style={{ minHeight: `${window.innerHeight}px` }}
              >
                <div className="congrate-box " style={{marginTop:"-100px"}}>
                  <div className="close-l">
                    <IconButton
                      onClick={() => {
                        setRefund(false);
                      }}
                    >
                      <X color="white" size={30} />
                    </IconButton>
                  </div>
                  <QuestRefund
                    email={selectedEmail}
                    orderId={orderId}
                    setcontactmsg={setRefund}
                  />
                </div>
              </div>
             : null
            }

            {showcontact ? (
              <div
                className="congrate-msg"
                style={{ minHeight: `${window.innerHeight}px` }}
              >
                <div className="congrate-box " style={{marginTop:"-50px"}}>
                  <div className="close-l">
                    <IconButton
                      onClick={() => {
                        setcontact(false);
                      }}
                    >
                      <X color="white" size={30} />
                    </IconButton>
                  </div>
                  <QuestMessage
                    email={selectedEmail}
                    room={selectedroom}
                    setcontactmsg={setcontact}
                  />
                </div>
              </div>
            ) : null}
            {showMsg ? (
              <div
                className="congrate-msg"
                style={{ minHeight: `${window.innerHeight}px` }}
              >
                <div className="congrate-box ">
                  <div className="close-l">
                    <IconButton
                      onClick={() => {
                        setMsg(false);
                      }}
                    >
                      <X color="white" size={30} />
                    </IconButton>
                  </div>
                  <h1
                    style={{
                      fontSize: "20px",
                      marginTop: "-20px",
                      marginLeft: "50px",
                    }}
                  >
                    Payment Successfull
                  </h1>
                  <PrintDoc order={orderData} />
                </div>
              </div>
            ) : null}

            <div className="profile-nav desktop">
              <div>
                <p onClick={() => navigate("/client/profile")}>
                  <Person /> <span>Profile</span>
                </p>
                <p
                  onClick={() => navigate("/client/panel/records")}
                  style={{ backgroundColor: "white", color: "rgb(7, 1, 27) " }}
                >
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
            <BookingsRecord setData={setData} setMsg={setMsg} setroom={setroom} setcontact={setcontact} setorderid={setorderid} setRefund={setRefund}/>
          </div>

          <Footer />
        </div>
      ) : (
        <SkeletonLoadingCards />
      )}
    </>
  );
};

export default BookingsPanel;
