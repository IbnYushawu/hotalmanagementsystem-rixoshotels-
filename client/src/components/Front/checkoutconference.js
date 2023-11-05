import React, { useEffect, useState } from "react";

import Footer from "./footer";
import PhoneInput from "react-phone-number-input";
import { Select, MenuItem } from "@mui/material";
import { format } from "date-fns";

import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  BsSpeakerFill,
  BsFillProjectorFill,
  BsClipboard,
} from "react-icons/bs";
import { MdTouchApp } from "react-icons/md";

import { useDispatch, useSelector } from "react-redux";
import { BookConference } from "../../store/actions/datacollection";

import { PromptToastify, defaultDueTime, differenceBetween,showToastify } from "../utils/reuseable";
import MobileTopNav from "../utils/mobilenav";

import { CircleSpinner } from "react-spinners-kit";

import { CreditCard2BackFill } from "react-bootstrap-icons";
import CardPayConference from "../utils/conference_cardp";
const ConferenceCheckout = () => {
  const [persons, setpersons] = useState(5);
  const { startTime, endDTime, startD } = useParams();
  const start_t = decodeURIComponent(startTime);
  const end_t = decodeURIComponent(endDTime);
  const start_d = decodeURIComponent(startD);
 
  const dispatch = useDispatch();
  const notifications = useSelector((value) => value.notification);
  let currentDate = new Date(Date.now());
  const tomorrowD = new Date(currentDate);
  tomorrowD.setDate(currentDate.getDate() + 1);

  const [duetim, set_duetim] = useState(defaultDueTime());
  const navigate = useNavigate();
  const [loading, setbtnloading] = useState(false);
  const [bookbtm, setbookbtm] = useState(false);
  const [options, setoptions] = useState([]);
  const [optionP, setoptionP] = useState(1);
  const [value, setValue] = useState();
  const [btbloading, setbtnl] = useState(false);
  const [showMsg, setMsg] = useState(false);
  const Checkuser = useSelector((item) => item.authuser);
  const Unselect = (Array, element, setopt) => {
    let temArray = [...Array];
    const newArray = temArray.filter((item) => item !== element);
    setopt([...newArray]);
  };

  const selectCheck = (Array, element) => {
    let selected = false;
    let temArray = [...Array];
    if (temArray.includes(element)) {
      selected = true;
    }

    return selected;
  };

  useEffect(() => {
    if (notifications && notifications.notice) {
      setbtnloading(false);

      if (notifications.success) {
        setbookbtm(true);
        setTimeout(()=>{
          navigate("/client/conference/booking")
        },500)
      
      }
      if (notifications.success === false) {
      }
      window.scrollTo(0, 0);
    }
    if(differenceBetween(start_t, end_t,100,options.length) <0){
      navigate("/client/conference/booking")
      PromptToastify("Invalid Time range .Conference room space is only available from 1:00 am to 11:00 pm")
    }
  });

useEffect(()=>{
if(notifications && notifications.notice){
  setbtnl(false)
}
},[notifications])
  const MakePaymentRequest = () => {
    dispatch(
      BookConference(
        Checkuser && Checkuser.account ? Checkuser.account._id : "",
        {
          paymentoption: optionP === 1 ? "Mtn Mobile Money (momo)" : "Card Payment",
          customername:
            Checkuser && Checkuser.account ? Checkuser.account.fullname : "",
          date: start_d,
          equipement: options,
          members: persons,
          from: start_t,
          to: end_t,
          price: differenceBetween(start_t, end_t,100,options.length),
        }
      )
    );
  };



  return (
    <>
      <div className="main-layout">
        <div className="layout">
          <MobileTopNav />
        </div>

        <div
          className="conference-ch"
          style={{
            minHeight: `${window.innerHeight - 80}px`,
            backgroundImage:
              'url("https://res.cloudinary.com/dewkx66gl/image/upload/v1697378724/conference_fselnv.jpg")',
          }}
        >
          <div
            className="conference-b"
            style={{
              minHeight: `${window.innerHeight}px`,
            }}
          ></div>
        </div>
        <div
          className="conference-bh"
          style={{
            minHeight: `${window.innerHeight}px`,
          }}
        >
          <div className="conference-box">
            <div className="order-detail">
              <h1>Order Details</h1>
              <div className="row-styles">
                <div className="row-styles" style={{ marginRight: "20px" }}>
                  <p>Date {" : "}</p>
                  <p> {start_d}</p>
                </div>
                <div className="row-styles" style={{ marginRight: "20px" }}>
                  <p>From {" : "}</p>
                  <p> {start_t}</p>
                </div>
                <div className="row-styles" style={{ marginRight: "20px" }}>
                  <p>To {" : "}</p>
                  <p> {end_t}</p>
                </div>
              </div>
              <div className="column-text-style">
                <p>
                  <span style={{ color: "red", marginRight: "10px" }}>*</span>{" "}
                  Please select the number of people attending the meeting
                </p>
                <Select
                  className="textbox"
                  style={{
                    fontSize: "14px",
                    fontFamily: "Roboto condensed",
                    fontWeight: "bold",
                    width: "200px",
                    color: "white",
                    backgroundColor:"chocolate"
                  }}
                  name="persons"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={persons}
                  onChange={(data) => {
                    setpersons(data.target.value);
                  }}
                >
                  {" "}
                  <MenuItem
                    value={5}
                    style={{
                      fontSize: "14px",
                      fontFamily: "Roboto condensed",
                      fontWeight: "bold",
                    }}
                  >
                    Maximun of 5 people
                  </MenuItem>
                  <MenuItem
                    value={7}
                    style={{
                      fontSize: "14px",
                      fontFamily: "Roboto condensed",
                      fontWeight: "bold",
                    }}
                  >
                    maximun of 7 people
                  </MenuItem>
                  <MenuItem
                    value={10}
                    style={{
                      fontSize: "14px",
                      fontFamily: "Roboto condensed",
                      fontWeight: "bold",
                    }}
                  >
                    {" "}
                    maximun of 10 people
                  </MenuItem>
                  <MenuItem
                    value={20}
                    style={{
                      fontSize: "14px",
                      fontFamily: "Roboto condensed",
                      fontWeight: "bold",
                    }}
                  >
                    {" "}
                    maximun of 20 people
                  </MenuItem>
                  <MenuItem
                    value={30}
                    style={{
                      fontSize: "14px",
                      fontFamily: "Roboto condensed",
                      fontWeight: "bold",
                    }}
                  >
                    {" "}
                    maximun of 30 people
                  </MenuItem>
                </Select>
              </div>

              <p style={{ marginTop: "20px" }}>
                <span style={{ color: "red", marginRight: "10px" }}>*</span>{" "}
                Additional Options
              </p>

              <div className="align-grid-c">
                {selectCheck(options, "Projector") ? (
                  <div
                    className="option-box-s"
                    onClick={() => {
                      Unselect(options, "Projector", setoptions);
                    }}
                  >
                    <BsFillProjectorFill size={30} color="white" />
                    <p>Projector and large screen TV</p>
                  </div>
                ) : (
                  <div
                    className="option-box"
                    onClick={() => {
                      setoptions([...options, "Projector"]);
                    }}
                  >
                    <BsFillProjectorFill size={30} />
                    <p>Projector and large screen TV</p>
                  </div>
                )}

                <>
                  {selectCheck(options, "Speakers") ? (
                    <div
                      className="option-box-s"
                      onClick={() => {
                        Unselect(options, "Speakers", setoptions);
                      }}
                    >
                      <BsSpeakerFill size={30} color="white" />
                      <p>Speakers/ sound system</p>
                    </div>
                  ) : (
                    <div
                      className="option-box"
                      onClick={() => {
                        setoptions([...options, "Speakers"]);
                      }}
                    >
                      <BsSpeakerFill size={30} />
                      <p>Speakers/ sound system</p>
                    </div>
                  )}
                </>

                <>
                  {selectCheck(options, "touchscreens") ? (
                    <div
                      className="option-box-s"
                      onClick={() => {
                        Unselect(options, "touchscreens", setoptions);
                      }}
                    >
                      <MdTouchApp size={30} color="white" />
                      <p>Interactive touchscreens</p>
                    </div>
                  ) : (
                    <div
                      className="option-box"
                      onClick={() => {
                        setoptions([...options, "touchscreens"]);
                      }}
                    >
                      <MdTouchApp size={30} />
                      <p>Interactive touchscreens</p>
                    </div>
                  )}
                </>

                <>
                  {selectCheck(options, "Whiteboard") ? (
                    <div
                      className="option-box-s"
                      onClick={() => {
                        Unselect(options, "Whiteboard", setoptions);
                      }}
                    >
                      <BsClipboard size={30} color="white" />
                      <p>Whiteboard with markers</p>
                    </div>
                  ) : (
                    <div
                      className="option-box"
                      onClick={() => {
                        setoptions([...options, "Whiteboard"]);
                      }}
                    >
                      <BsClipboard size={30} />
                      <p>Whiteboard with markers</p>
                    </div>
                  )}
                </>
              </div>
              <div className="row-styles" style={{ marginTop: "50px" }}>
                <p
                  style={{
                    color: "chocolate",
                    fontFamily: "Roboto condensed",
                    fontSize: "18px",
                  }}
                >
                  Total cost <span> GHC { differenceBetween(start_t, end_t,100,options.length)} </span>{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          className="pay-layout"
          style={{ minHeight: `${window.innerHeight}px` }}
        >
          <div className="conference-box">
            <div className="conference-pay-options ">
              <div className="c-pay-center">
                <p>PAYMENT OPTION</p>
                <div className="payment-o">
                  <div
                    className={
                      optionP === 1 ? "payment-box-m box-m-s" : "payment-box-m"
                    }
                    onClick={() => {
                      setoptionP(1);
                    }}
                  >
                    <div className="card-text">
                      <p>Mobile Money</p>
                    </div>
                    <div className="card-img">
                      <p>Instant</p>
                      <img
                        alt=""
                        src="https://res.cloudinary.com/dewkx66gl/image/upload/v1696249567/pngwing.com_3_wg44ba.png"
                      />
                    </div>
                  </div>
                  <div
                    className={
                      optionP === 2 ? "payment-box box-m-s" : "payment-box"
                    }
                    onClick={() => {
                      setoptionP(2);
                    }}
                  >
                    <div className="card-text">
                      <p>Credit or Debit card</p>
                    </div>
                    <div className="card-img">
                      <p></p>
                      <CreditCard2BackFill size={50} />
                    </div>
                  </div>
                </div>

                {optionP === 1 ? (
                  <div className="pay-detail">
                    <p>DETAILS</p>

                    <div className="pay-contact">
                      <p>
                        Select Option - <span>Mobile money</span>
                      </p>

                      <div className="select-o-d">
                        <PhoneInput
                          className="momo-line"
                          defaultCountry="GH"
                          placeholder="Enter phone number"
                          value={value}
                          onChange={setValue}
                        />
                      </div>

                      <div className="instruction-layout">
                        <h3>
                          <span style={{ color: "red", marginRight: "10px" }}>
                            *
                          </span>
                          Instructions ( follow after confirming payment )
                        </h3>
                        <p>
                          <span
                            style={{ color: "yellow", marginRight: "10px" }}
                          >
                            1
                          </span>{" "}
                          Dail *170#
                        </p>
                        <p>
                          <span
                            style={{ color: "yellow", marginRight: "10px" }}
                          >
                            2
                          </span>{" "}
                          Select option 6
                        </p>
                        <p>
                          <span
                            style={{ color: "yellow", marginRight: "10px" }}
                          >
                            3
                          </span>{" "}
                          Select option 3
                        </p>
                        <p>
                          <span
                            style={{ color: "yellow", marginRight: "10px" }}
                          >
                            4
                          </span>{" "}
                          Enter Pin
                        </p>
                        <p>
                          <span
                            style={{ color: "yellow", marginRight: "10px" }}
                          >
                            5
                          </span>{" "}
                          Select payment and comfirm
                        </p>

                        <div className="instruction-btn">
                          {btbloading ? (
                            <div className="instruction-btn-valid">
                              <CircleSpinner size={20} color="blue" />
                            </div>
                          ) : (
                            <>
                              {value !== undefined &&
                              value.toString().length === 13 ? (
                                <div
                                  onClick={() => {
                                    setbtnl(true);
                                    MakePaymentRequest()
                                  }}
                                  className="instruction-btn-valid"
                                >
                                  <span>confirm Payment</span>
                                </div>
                              ) : (
                                <div className="blank-btn">
                                  <span>confirm Payment</span>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <CardPayConference
                    setbtnloading={setbtnl}
                    setMsg={setMsg}
                    room={"id"}
                    from={"start"}
                    to={"end"}
                    customer={
                      Checkuser && Checkuser.account
                        ? Checkuser.account.fullname
                        : ""
                    }
                    roomnumber={""}
                    price={0}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="layout">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default ConferenceCheckout;
