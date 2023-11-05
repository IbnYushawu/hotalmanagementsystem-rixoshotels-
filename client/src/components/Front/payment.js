import React, { useEffect, useState, useRef } from "react";
import Room from "./Room";
import Footer from "./footer";
import { IconButton, MenuItem, Select } from "@mui/material";
import Cards from "react-credit-cards-2";
import {
  BoundingBoxCircles,
  CreditCard2BackFill,
  Cup,
  Person,
  Printer,
  X,
} from "react-bootstrap-icons";
import { DateRange } from "react-date-range";
import SectionNav from "../utils/sectionnav";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import {
  FaBed,
  FaCalendarAlt,
  FaCaretLeft,
  FaCaretRight,
  FaUserFriends,
} from "react-icons/fa";
import { format } from "date-fns";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CircleSpinner } from "react-spinners-kit";
import { disableScroll, enableScroll, stayDays } from "../utils/reuseable";
import CardPay from "../utils/cardpayment";
import { useDispatch, useSelector } from "react-redux";
import { BookRoom, GetRoom } from "../../store/actions/datacollection";
import PrintProof from "./printproof";
import MobileTopNav from "../utils/mobilenav";
import LoaderView from "../utils/loaderView";

const PaymentSection = () => {
  const Checkuser = useSelector((item) => item.authuser);
  const [btbloading, setbtnloading] = useState(false);
  const [showMsg, setMsg] = useState(false);
  const { id, start, end } = useParams();

  const navigate = useNavigate();
  const [value, setValue] = useState();
  const [option, setoption] = useState(1);
  const dispatch = useDispatch();
  const roombox = useSelector((item) => item.room);
  useEffect(() => {
    dispatch(GetRoom(id));
  }, [dispatch]);
  useEffect(() => {
    if (btbloading) {
      setTimeout(() => {
        setbtnloading(false);
        setMsg(true);
        disableScroll();
      }, 3000);
    }
  }, [btbloading]);
  const MakePayment = () => {
    dispatch(
      BookRoom(
        id,
        Checkuser && Checkuser.account ? Checkuser.account._id : "",
        {
          customername:Checkuser && Checkuser.account ? Checkuser.account.fullname :"",
          paymentoption: option===1 ? "Mtn Mobile Money (momo)" : "Card Payment",
          from: start,
          to: end,
          room_number:
            roombox && roombox.data && roombox.data.room_numer
              ? roombox.data.room_numer
              : "",
          price:
            roombox && roombox.data && roombox.data.price
              ? parseInt(roombox.data.price) * parseInt(stayDays(start, end))
              : 0,
        }
      )
    );
  };
  const showmenu=false;
  return (
    <>
      {roombox && roombox.data ? (
        <div className="main-layout">
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
                      enableScroll();
                    }}
                  >
                    <X color="white" size={30} />
                  </IconButton>
                </div>

               
                <PrintProof/>
              </div>
            </div>
          ) : null}

          <div style={{ minHeight: `${window.innerHeight}px` }}>
            <MobileTopNav showmenu={showmenu}/>
            <div className="payment-layout">
              <div className="payment-c">
                <div className="room-details">
                  <img
                    src={
                      roombox.data && roombox.data.image
                        ? roombox.data.image
                        : ""
                    }
                    alt=""
                    className="card-room-img"
                  />
                  <h3 className="room-d-h">
                    {roombox.data && roombox.data.room_type
                      ? roombox.data.room_type
                      : ""}
                  </h3>
                  <span>
                    {" "}
                    GHC{" "}
                    {roombox.data && roombox.data.price
                      ? roombox.data.price
                      : ""}{" "}
                    / per Night
                  </span>
                  <p>
                    <span>Type </span>
                    {roombox.data && roombox.data.alias
                      ? roombox.data.alias
                      : ""}
                  </p>

                  <div className="row-styles">
                    <Person color="yellow" size={25} />
                    <span>
                      {roombox.data && roombox.data.capacity
                        ? roombox.data.capacity
                        : ""}{" "}
                      Person
                    </span>
                    <BoundingBoxCircles color="yellow" size={25} />
                    <span>
                      {roombox.data && roombox.data.aircondition
                        ? "AIR CONDITION"
                        : "No aircondition"}
                    </span>
                  </div>

                  <h3 className="extra-service">Extra</h3>
                  <div className="row-styles">
                    <Cup color="yellow" size={15} />
                    <span>
                      {roombox.data && roombox.data.meals
                        ? roombox.data.meals
                        : ""}
                    </span>
                    <FaBed />
                    <span>
                      {" "}
                      {roombox.data && roombox.data.mattress
                        ? roombox.data.mattress
                        : ""}
                    </span>
                  </div>

                  <h3 className="extra-service">Stay Duration</h3>
                  <p>
                    {roombox.data && roombox.data.mattress
                      ? stayDays(start, end) + " Night stay"
                      : ""}
                  </p>

                  <p>
                    Total Account : GH₵
                    <span>
                      {roombox.data && roombox.data.price
                        ? parseInt(roombox.data.price) *
                          parseInt(stayDays(start, end))
                        : ""}
                    </span>
                  </p>
                </div>

                <div className="room-pay-options">
                  <div className="pay-arrow">
                    <FaCaretRight size={50} color="white" />
                  </div>

                  <div className="pay-center">
                    <p>PAYMENT OPTION</p>
                    <div className="payment-o">
                      <div
                        className={
                          option === 1
                            ? "payment-box-m box-m-s"
                            : "payment-box-m"
                        }
                        onClick={() => {
                          setoption(1);
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
                          option === 2 ? "payment-box box-m-s" : "payment-box"
                        }
                        onClick={() => {
                          setoption(2);
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

                    {option === 1 ? (
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
                              <span
                                style={{ color: "red", marginRight: "10px" }}
                              >
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
                                        setbtnloading(true);
                                        MakePayment();
                                      }}
                                      className="instruction-btn-valid"
                                    >
                                      <span>comfirm Payment</span>
                                    </div>
                                  ) : (
                                    <div className="blank-btn">
                                      <span>comfirm Payment</span>
                                    </div>
                                  )}
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <CardPay
                        setbtnloading={setbtnloading}
                        setMsg={setMsg}
                        room={id}
                        from={start}
                        to={end}
                        customer={Checkuser && Checkuser.account ? Checkuser.account.fullname :""

                        }
                        roomnumber={
                          roombox.data && roombox.data.room_numer
                            ? roombox.data.room_numer
                            : ""
                        }
                        price={
                          roombox.data && roombox.data.price
                            ? parseInt(roombox.data.price) *
                              parseInt(stayDays(start, end))
                            : 0
                        }
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      ) : (
        <LoaderView/>
      )}
    </>
  );
};

export default PaymentSection;
