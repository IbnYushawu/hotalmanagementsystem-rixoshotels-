import React, { useState, useEffect } from "react";
import { Select, MenuItem, IconButton } from "@mui/material";
import {
  Activity,
  Calendar,
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
import { AllOrders, GetAllRooms } from "../../store/actions/datacollection";
import { FaCalendarAlt } from "react-icons/fa";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import { MdDelete, MdEmail, MdNumbers, MdSecurity } from "react-icons/md";
import { UnBlockuser, getAllUsers } from "../../store/actions/adminActions";
import { enableScroll } from "../utils/reuseable";
import MessageCustomer from "./messagecustomer";
import { CircleSpinner } from "react-spinners-kit";
const CustomerPage = (props) => {
  const dispatch = useDispatch();

  const customers = useSelector((data) => data.clients);
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const [openDate, setOpenDate] = useState(false);
  const [activatebtn, setactivebtn] = useState(false);
  const navigate = useNavigate();
  const notifications = useSelector((value) => value.notification);
  useEffect(() => {
    if (notifications && notifications.notice) {
      setactivebtn(false);
    }
  }, [notifications]);
  
  return (
    <div className="panel_detail">
      <p className="header-p">Customers Panel</p>
      <p className="row-styles">
        <Filter /> <span>Filter</span>{" "}
      </p>
      <div className="row-btw">
        <div className="row-styles">
          <div className="row-styles">
            <input
              className="input-box"
              style={{ width: "150px" }}
              type="text"
              name="client_name"
              placeholder="client name"
              min="1"
            />

            <span className="searchbtn">search</span>
            <span className="searchbtn">reset</span>
          </div>
        </div>
      </div>

      <div className="row-styles" style={{ marginTop: "40px" }}>
        <div className="row-styles-hn" style={{ marginRight: "10px" }}>
          {" "}
          <span className="b-content">No </span>
        </div>
        <div className="row-styles-hn" style={{ marginRight: "10px" }}>
          {" "}
          <MdSecurity size={20} color="chocolate" />{" "}
          <span className="b-header">status</span>
        </div>
        <div className="row-styles-h" style={{ marginRight: "10px" }}>
          {" "}
          <Person size={20} color="chocolate" />{" "}
          <span className="b-header">client name </span>
        </div>
        <div className="row-styles-h" style={{ marginRight: "10px" }}>
          {" "}
          <MdEmail size={20} color="chocolate" />{" "}
          <span className="b-header"> Email </span>
        </div>
        <div className="row-styles-h" style={{ marginRight: "10px" }}>
          {" "}
          <Calendar size={20} color="chocolate" />{" "}
          <span className="b-header">Joined since </span>
        </div>
        <div className="row-styles-h" style={{ marginRight: "10px" }}>
          {" "}
          <List size={20} color="chocolate" />{" "}
          <span className="b-header"> Number of Order</span>
        </div>

        <div className="row-styles-h" style={{ marginRight: "10px" }}>
          {" "}
          <Activity size={20} color="chocolate" />{" "}
          <span className="b-header">Actions</span>
        </div>
      </div>

      <div className="line"></div>

      {customers && customers.data
        ? customers.data.map((item, index) => {
            return (
              <div
                key={index}
                className="row-styles"
                style={{ marginTop: "5px" }}
              >
                <div className="row-styles-hn" style={{ marginRight: "10px" }}>
                  {" "}
                  <span className="b-content">{index + 1} </span>
                </div>
                <div className="row-styles-hn" style={{ marginRight: "10px" }}>
                  {" "}
                  <span
                    className="b-content"
                    style={{ color: "green", fontWeight: "bold" }}
                  >
                    {item.active ? "Active" : "Blocked"}{" "}
                  </span>
                </div>
                <div className="row-styles-h" style={{ marginRight: "10px" }}>
                  {" "}
                  <span className="b-content">{item.fullname} </span>
                </div>
                <div className="row-styles-h" style={{ marginRight: "10px" }}>
                  {" "}
                  <span className="b-content">{item.email} </span>
                </div>
                <div className="row-styles-h" style={{ marginRight: "10px" }}>
                  {" "}
                  <span className="b-content">
                    {format(new Date(item.createdAt), "EE dd yyyy")}{" "}
                  </span>
                </div>
                <div className="row-styles-h" style={{ marginRight: "10px" }}>
                  {" "}
                  <span className="b-content">{item.bookings.length}</span>
                </div>

                <div className="row-styles-h" style={{ marginRight: "10px" }}>
                  {" "}
                  {item.active ? (
                    <button
                      className="btw_btn"
                      type="button"
                      onClick={() => {
                        props.setbprompt(true);
                        props.setuserid(item._id);
                      }}
                    >
                      Block
                    </button>
                  ) : (
                    <>
                      {activatebtn ? (
                        <div className="btw_btn">
                          <CircleSpinner size={13} color="white" />
                        </div>
                      ) : (
                        <button
                          className="btw_btn"
                          type="button"
                          onClick={() => {
                            setactivebtn(true);
                            dispatch(UnBlockuser(item._id));
                            dispatch(getAllUsers());
                          }}
                        >
                          Activate
                        </button>
                      )}
                    </>
                  )}
                  <button
                    className="btw_btn"
                    type="button"
                    onClick={() => {
                      props.setemail(item.email);
                      props.setSmg(true);
                    }}
                  >
                    Message
                  </button>
                  <span
                    onClick={() => {
                      props.setaction(true);
                      props.setbprompt(true);
                      props.setuserid(item._id);
                    }}
                    className="deletebtn"
                  >
                    <MdDelete />
                  </span>
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default CustomerPage;
