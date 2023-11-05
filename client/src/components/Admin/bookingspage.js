import React, { useState, useEffect } from "react";
import { Select, MenuItem, IconButton } from "@mui/material";
import {
  Activity,
  CarFrontFill,
  Filter,
  List,
  Person,
  PersonLock,
  UniversalAccess,
  UniversalAccessCircle,
  X,
} from "react-bootstrap-icons";
import RoomBox from "./roombox";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  AllOrders,
  CheckInClient,
  FilterOrders,
  GetAllRooms,
} from "../../store/actions/datacollection";
import { FaCalendarAlt } from "react-icons/fa";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import { MdNumbers } from "react-icons/md";
import { ReturnOrderByType, checkDueDate } from "../utils/reuseable";
import { CircleSpinner } from "react-spinners-kit";
const BookingsPage = () => {
  const dispatch = useDispatch();
  const [SelectedOrderRevenue, setRevenue] = useState(0);
  let totalRevenue = 0;
  let currentDate = new Date(Date.now());
  const tomorrowD = new Date(currentDate);
  tomorrowD.setDate(currentDate.getDate() + 1);
  const [dates, setDates] = useState([
    {
      startDate: new Date("2023-1-1"),
      endDate: tomorrowD,
      key: "selection",
    },
  ]);

  const [openDate, setOpenDate] = useState(false);
  const navigate = useNavigate();
  const [roomtype, setroomtype] = useState("Any Room type");
  const [room_no, setroom_no] = useState(null);
  const [clientname, setclientname] = useState(null);
  const [orderID, setorderId] = useState(null);
  const [loadingbtn, setLoadingbtn] = useState(false);
  const [selectedOrderId, setid] = useState("");
  const OpenCalender = () => {
    setOpenDate(true);
  };
  const CloseCalender = () => {
    if (openDate) {
      setOpenDate(false);
    }
  };
  useEffect(() => {
    dispatch(AllOrders());
  }, [dispatch]);
  const all_orders = useSelector((data) => data.orders);
  const [OrderData, setOrderData] = useState([]);
  const notifications = useSelector((value) => value.notification);

  useEffect(() => {
    if (notifications && notifications.notice) {
      setLoadingbtn(false);
      dispatch(AllOrders());
    }
  });

  return (
    <div className="panel_detail">
      <p className="header-p">Bookings</p>
      <p className="row-styles">
        <Filter /> <span>Filter</span>{" "}
      </p>
      <div className="row-btw">
        <div className="row-styles">
          <FaCalendarAlt color="chocolate" />
          <span
            style={{ marginLeft: "10px" }}
            onClick={OpenCalender}
            className=""
          >
            {`${format(dates[0].startDate, "eee dd MMM yyyy")} to ${format(
              dates[0].endDate,
              "eee dd MMM yyyy"
            )}`}
          </span>
        </div>
        <div id="calender-id">
          {openDate && (
            <div className="fixed-date">
              {" "}
              <span className="closebtnn" style={{ marginLeft: "40px" }}>
                <IconButton onClick={CloseCalender}>
                  <X color="white" size={20} />
                </IconButton>
              </span>
              <DateRange
                editableDateInputs
                onChange={(item) => setDates([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={dates}
                className="header_search_calender"
                minDate={new Date("2023-1-1")}
              />
            </div>
          )}
        </div>
        <div className="row-styles">
      
          <div className="row-styles">
            <input
              className="input-box"
              type="number"
              name="room_number"
              placeholder="room number"
              onChange={(data) => {
                setroom_no(data.target.value);
              }}
              min="1"
            />
            <input
              className="input-box"
              style={{ width: "150px" }}
              type="text"
              name="client_name"
              placeholder="client name"
              onChange={(data) => {
                setclientname(data.target.value);
              }}
            />
            <input
              className="input-box"
              style={{ width: "150px" }}
              type="text"
              name="order_id"
              placeholder="Order ID"
              min="1"
              onChange={(data) => {
                setorderId(data.target.value);
              }}
            />
            <span
              className="searchbtn"
              onClick={() => {
                dispatch(FilterOrders(roomtype, room_no, clientname, orderID,dates[0].startDate,dates[0].endDate));
              }}
            >
              search
            </span>
            <span 
            onClick={()=> {
              dispatch(AllOrders())}}
            className="searchbtn">reset</span>
          </div>
        </div>
      </div>

      <div className="row-styles" style={{ marginTop: "40px" }}>
        <div className="row-styles-hn" style={{ marginRight: "10px" }}>
          {" "}
          <span className="b-content">No </span>
        </div>
        <div className="row-styles-h" style={{ marginRight: "10px" }}>
          {" "}
          <Person size={20} color="chocolate" />{" "}
          <span className="b-header">client name </span>
        </div>
        <div className="row-styles-h" style={{ marginRight: "10px" }}>
          {" "}
          <MdNumbers size={20} color="chocolate" />{" "}
          <span className="b-header">Room number </span>
        </div>
        <div className="row-styles-h" style={{ marginRight: "10px" }}>
          {" "}
          <PersonLock size={20} color="chocolate" />{" "}
          <span className="b-header">Order Id</span>
        </div>

        <div className="row-styles-h" style={{ marginRight: "10px" }}>
          {" "}
          <UniversalAccess size={20} color="chocolate" />{" "}
          <span className="b-header">Check In Date</span>
        </div>
        <div className="row-styles-h" style={{ marginRight: "10px" }}>
          {" "}
          <UniversalAccessCircle size={20} color="chocolate" />{" "}
          <span className="b-header">Due Date</span>
        </div>
        <div className="row-styles-h" style={{ marginRight: "10px" }}>
          {" "}
          <span style={{ color: "chocolate" }}> GH₵</span>
          <span className="b-header">Price</span>
        </div>
        <div className="row-styles-h" style={{ marginRight: "10px" }}>
          {" "}
          <Activity color="chocolate" size={20} />
          <span className="b-header">ACTION</span>
        </div>
      </div>

      <div className="line"></div>

      {all_orders && all_orders.data && all_orders.data.order
        ? all_orders.data.order.map((item, index) => {
            return (
              <div
                key={index}
                className="row-styles"
                style={{ marginTop: "5px" }}
                onClick={() => {
                  setid(item._id);
                }}
              >
                <div className="row-styles-hn" style={{ marginRight: "10px" }}>
                  {" "}
                  <span className="b-content">{index + 1} </span>
                </div>
                <div className="row-styles-h" style={{ marginRight: "10px" }}>
                  {" "}
                  <span className="b-content">{item.customername} </span>
                </div>
                <div className="row-styles-h" style={{ marginRight: "10px" }}>
                  {" "}
                  <span className="b-content">{item.room_number} </span>
                </div>
                <div className="row-styles-h" style={{ marginRight: "10px" }}>
                  {" "}
                  <span className="b-content">{item.orderId}</span>
                </div>

                <div className="row-styles-h" style={{ marginRight: "10px" }}>
                  {" "}
                  <span className="b-content">
                    {format(new Date(item.from), "eee dd MMM yyyy")}
                  </span>
                </div>
                <div className="row-styles-h" style={{ marginRight: "10px" }}>
                  {" "}
                  <span className="b-content">
                    {format(new Date(item.to), "eee dd MMM yyyy")}
                  </span>
                </div>
                <div className="row-styles-h" style={{ marginRight: "10px" }}>
                  {" "}
                  <span className="b-content">{item.price}</span>
                </div>
                <div className="row-styles-h" style={{ marginRight: "10px" }}>
                  {" "}
                  {checkDueDate(item.from) ? (
                    <>
                      {item.status === "Checked In" ? (
                        <>
                          {loadingbtn && selectedOrderId === item._id ? (
                            <span
                              className="searchbtn"
                              onClick={() => {
                                dispatch(
                                  CheckInClient(item._id, {
                                    status: "Checked Out",
                                  })
                                );
                              }}
                            >
                              <CircleSpinner color="white" size={15} />
                            </span>
                          ) : (
                            <>
                              {checkDueDate(item.to) ? (
                                <span
                                  style={{ backgroundColor: "green" }}
                                  className="searchbtn"
                                  onClick={() => {
                                    setLoadingbtn(true);
                                    dispatch(
                                      CheckInClient(item._id, {
                                        status: "Checked Out",
                                      })
                                    );
                                  }}
                                >
                                  Check Out
                                </span>
                              ) : (
                                <span
                                  style={{
                                    backgroundColor: "red",
                                  }}
                                  className="searchbtn"
                                  onClick={() => {
                                    setLoadingbtn(true);
                                    dispatch(
                                      CheckInClient(item._id, {
                                        status: "Checked In",
                                      })
                                    );
                                  }}
                                >
                                  Check Out
                                </span>
                              )}
                            </>
                          )}
                        </>
                      ) : (
                        <>
                          {item.status === "Checked Out" ? (
                            <span
                              className="searchbtn"
                              style={{
                                backgroundColor: "rgb(184, 184, 184)",
                                color: "black",
                              }}
                            >
                              Checked Out
                            </span>
                          ) : (
                            <>
                              {loadingbtn && selectedOrderId === item._id ? (
                                <span
                                  className="searchbtn"
                                  onClick={() => {
                                    dispatch(
                                      CheckInClient(item._id, {
                                        status: "Checked In",
                                      })
                                    );
                                  }}
                                >
                                  <CircleSpinner color="white" size={15} />
                                </span>
                              ) : (
                                <span
                                  className="searchbtn"
                                  onClick={() => {
                                    setLoadingbtn(true);
                                    dispatch(
                                      CheckInClient(item._id, {
                                        status: "Checked In",
                                      })
                                    );
                                  }}
                                >
                                  Check In
                                </span>
                              )}
                            </>
                          )}
                        </>
                      )}
                    </>
                  ) : (
                    <span className="searchbtn">Pending</span>
                  )}
                </div>
              </div>
            );
          })
        : null}
      <div className="row-styles" style={{ marginTop: "40px" }}>
        <div className="row-styles-hn" style={{ marginRight: "10px" }}>
          {" "}
        </div>
        <div className="row-styles-h" style={{ marginRight: "10px" }}>
          {" "}
          <span
            className="b-content"
            style={{ color: "chocolate", fontWeight: "bold" }}
          >
            Total Revenue{" "}
          </span>
        </div>
        <div className="row-styles-h" style={{ marginRight: "10px" }}>
          {" "}
        </div>
        <div className="row-styles-h" style={{ marginRight: "10px" }}>
          {" "}
        </div>

        <div className="row-styles-h" style={{ marginRight: "10px" }}>
          {" "}
        </div>
        <div className="row-styles-h" style={{ marginRight: "10px" }}>
          {" "}
        </div>
        <div className="row-styles-h" style={{ marginRight: "10px" }}>
          {" "}
          <span className="b-header">
            {" "}
            {all_orders && all_orders.data && all_orders.data.TotalRevenue
              ? all_orders.data.TotalRevenue
              : ""}
          </span>
        </div>
        <div className="row-styles-h" style={{ marginRight: "10px" }}>
          {" "}
        </div>
      </div>
    </div>
  );
};

export default BookingsPage;
