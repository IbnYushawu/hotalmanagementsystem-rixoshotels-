import React, { useEffect, useState } from "react";
import Room from "./Room";
import Footer from "./footer";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { format } from "date-fns";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import TopNav from "../utils/pagenav";
import { useDispatch, useSelector } from "react-redux";
import {
  Clear_SearchBox,
  GetsearchResult,
  conferencAvailability,
} from "../../store/actions/datacollection";
import BookRoomBox from "./Room/bookroom";
import {
  DueTime,
  defaultDueTime,
  enableScroll,
  showToastify,
  stayDays,
} from "../utils/reuseable";
import MobileTopNav from "../utils/mobilenav";

import { ArrowBarRight } from "react-bootstrap-icons";
import { CircleSpinner } from "react-spinners-kit";
const ConferenceBook = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((value) => value.notification);
  let currentDate = new Date(Date.now());
  const tomorrowD = new Date(currentDate);
  tomorrowD.setDate(currentDate.getDate() + 1);
  const [start_c, set_start] = useState(new Date(Date.now()));
  const [start_date, set_dates] = useState(new Date(Date.now()));
  const [duetim, set_duetim] = useState(defaultDueTime());
  const navigate = useNavigate();
  const [showmenu, setmenu] = useState(false);
  const [loading, setbtnloading] = useState(false);
  const [bookbtm, setbookbtm] = useState(false);

  const checkRequest = () => {
    setbtnloading(true);

    dispatch(
      conferencAvailability({
        date: format(start_date, "eee dd MMM yyyy"),
        from: format(start_c, "HH:mm"),
      })
    );
  };

  useEffect(() => {
    if (notifications && notifications.notice) {
      setbtnloading(false);

      if (notifications.success) {
        setTimeout(() => {
          setbookbtm(true);
        }, 100);
      }
      if (notifications.success === false) {
      }
      window.scrollTo(0, 0);
    }
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="main-layout">
        <MobileTopNav />
        <div
          className="conference-c"
          style={{
            minHeight: `${window.innerHeight - 80}px`,
            backgroundImage:
              'url("https://res.cloudinary.com/dewkx66gl/image/upload/v1697378724/conference_fselnv.jpg")',
          }}
        >
          <div
            className="conference-b"
            style={{
              minHeight: `${window.innerHeight - 80}px`,
            }}
          >
            <div className="column-styles" style={{ padding: "0px" }}>
              <h1 className="header-h1">
                Meeting space in Rixos Hotels{" "}
                <span
                  style={{
                    color: "chocolate",
                    fontSize: "40px",
                    fontWeight: "bold",
                  }}
                >
                  .
                </span>
              </h1>
            </div>
            <h1 className="intro_header">
              Our meeting rooms in Geneva provide the perfect backdrop to
              brainstorm with colleagues, impress clients, or hold productive
              training sessions. Our meeting spaces can be booked by the hour or
              day, and our on-site support team can provide support at every
              turn. Select a suitable time and experience greatness
            </h1>

            <div className="desktop">
              {" "}
              <div className="row-styles" style={{ marginTop: "50px" }}>
                <div className="c-date">
                  <p>Date</p>
                  <div className="datepic">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        minDate={dayjs(new Date())}
                        defaultValue={dayjs(start_date.toString())}
                        onChange={(data) => {
                          set_dates(new Date(data.toString()));
                          setbookbtm(false);
                        }}
                      />
                    </LocalizationProvider>
                  </div>
                </div>
                <div className="c-date">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <p>Duration</p>
                    <div className="row-styles">
                      <div className="datepic">
                        <MobileTimePicker
                          defaultValue={dayjs(start_c.toString())}
                          onChange={(data) => {
                            set_start(new Date(data.toString()));
                            set_duetim(DueTime(new Date(data.toString())));
                            setbookbtm(false);
                          }}
                        />
                      </div>
                      <ArrowBarRight color="white" size={20} />
                      <div className="datepic">
                        <MobileTimePicker
                          defaultValue={dayjs(duetim.toString())}
                          value={dayjs(duetim.toString())}
                          onChange={(data) => {
                            set_duetim(new Date(data.toString()));
                            setbookbtm(false);
                          }}
                        />
                      </div>
                    </div>
                  </LocalizationProvider>
                </div>

                {bookbtm ? (
                  <div
                    className="row-styles"
                    style={{ marginTop: "30px", marginLeft: "30px" }}
                  >
                    <div
                      className="c-btw-b"
                      onClick={() => {
                        navigate(
                          `/client/conference/checkout/${format(
                            start_c,
                            "HH:mm"
                          )}/${format(duetim, "HH:mm")}/${format(
                            start_date,
                            "eee dd MMM yyyy"
                          )}`
                        );
                      }}
                    >
                      <span>Book Now</span>
                    </div>
                  </div>
                ) : (
                  <div
                    className="row-styles"
                    style={{ marginTop: "30px", marginLeft: "30px" }}
                  >
                    {loading ? (
                      <div className="c-btw">
                        <CircleSpinner color="chocolate" size={19} />
                      </div>
                    ) : (
                      <div
                        className="c-btw"
                        onClick={() => {
                          checkRequest();
                        }}
                      >
                        <span>Check Availability</span>
                      </div>
                    )}
                  </div>
                )}
              </div>{" "}
            </div>
            <div className="mobile">
              
                <div className="column-styles" style={{ marginTop: "50px" }}>
                  <div className="c-date"  style={{width:"100%"}}>
                  <p
                style={{
                  color: "white",
                  fontFamily: "Roboto condensed",
                  fontSize: "14px",
                  paddingLeft:"-20px"
                
                }}
              >
                Price <span> GHC 100 per hour</span>{" "}
              </p>
                    <p>Date</p>
                    <div className="datepic" style={{width:"100%"}}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                        style={{width:"150px"}}

                          minDate={dayjs(new Date())}
                          defaultValue={dayjs(start_date.toString())}
                          onChange={(data) => {
                            set_dates(new Date(data.toString()));
                            setbookbtm(false);
                          }}
                        />
                      </LocalizationProvider>
                    </div>
                  </div>
                  <div className="c-date"  style={{width:"100%"}}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <p>Duration</p>
                      <div className="row-styles">
                        <div className="datepic"  style={{width:"100%"}}>
                          <MobileTimePicker
                               style={{width:"150px"}}
                            defaultValue={dayjs(start_c.toString())}
                            onChange={(data) => {
                              set_start(new Date(data.toString()));
                              set_duetim(DueTime(new Date(data.toString())));
                              setbookbtm(false);
                            }}
                          />
                        </div>
                        <ArrowBarRight color="white" size={20} />
                        <div className="datepic"  style={{width:"100%"}}>
                          <MobileTimePicker
                           style={{width:"150px"}}
                            defaultValue={dayjs(duetim.toString())}
                            value={dayjs(duetim.toString())}
                            onChange={(data) => {
                              set_duetim(new Date(data.toString()));
                              setbookbtm(false);
                            }}
                          />
                        </div>
                      </div>
                    </LocalizationProvider>
                  </div>

                  {bookbtm ? (
                    <div
                      className="row-styles"
                      style={{ marginTop: "30px", marginLeft: "30px" }}
                    >
                      <div
                        className="c-btw-b"   style={{width:"150px"}}
                        onClick={() => {
                          navigate(
                            `/client/conference/checkout/${format(
                              start_c,
                              "HH:mm"
                            )}/${format(duetim, "HH:mm")}/${format(
                              start_date,
                              "eee dd MMM yyyy"
                            )}`
                          );
                        }}
                      >
                        <span>Book Now</span>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="row-styles" 
                      style={{ marginTop: "30px", marginLeft: "30px",width:"150px" }}
                    >
                      {loading ? (
                        <div className="c-btw"   style={{width:"150px"}}>
                          <CircleSpinner color="chocolate" size={19} />
                        </div>
                      ) : (
                        <div
                          className="c-btw"
                          onClick={() => {
                            checkRequest();
                          }}
                        >
                          <span>Check Availability</span>
                        </div>
                      )}
                    </div>
                  )}
             
              </div>
            </div>

         
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ConferenceBook;
