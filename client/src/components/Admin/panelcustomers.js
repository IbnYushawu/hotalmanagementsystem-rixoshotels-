import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomerPage from "./customersdetail";
import MessageCustomer from "./messagecustomer";
import { X } from "react-bootstrap-icons";
import { enableScroll } from "../utils/reuseable";
import { IconButton } from "@mui/material";
import BlockCustomer from "./blockuser";
import { RiAdminFill, RiCustomerService2Line } from "react-icons/ri";
import { Signout } from "../../store/actions/adminActions";

const PanelCustomer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMsg, setMsg] = useState(false);

  const [showbloc, setbprompt] = useState(false);
  const [selectedEmail, setemail] = useState("");
  const [customerid, setuserid] = useState("");
  const bemploy = false;
  const admindetails = useSelector((data) => data.admin);
  const [deleteaction, setaction] = useState(null);
  return (
    <div className="main-layout">
      <div
        className="profile-layout"
        style={{ minHeight: `${window.innerHeight}px` }}
      >
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

              <MessageCustomer selectedEmail={selectedEmail} setSmg={setMsg} />
            </div>
          </div>
        ) : null}

        {showbloc ? (
          <div
            className="congrate-msg"
            style={{ minHeight: `${window.innerHeight}px` }}
          >
            <div className="congrate-box ">
              <div className="close-l">
                <IconButton
                  onClick={() => {
                    setbprompt(false);
                    enableScroll();
                  }}
                >
                  <X color="white" size={30} />
                </IconButton>
              </div>

              <BlockCustomer
                customerid={customerid}
                setbprompt={setbprompt}
                bemploy={bemploy}
                deleteaction={deleteaction}
              />
            </div>
          </div>
        ) : null}
        <div className="profile-nav-admin">
          {admindetails &&
          admindetails.account &&
          admindetails.account.role === "admin" ? (
            <div className="nav-column">
              <p onClick={() => navigate("/admin/panel/overview")}>
                <span>Overview</span>
              </p>
              <p onClick={() => navigate("/admin/panel/rooms")}>
                <span>List Rooms</span>
              </p>

              <p onClick={() => navigate("/admin/panel/room_type")}>
                <span>Manage rooms types</span>
              </p>
              <p onClick={() => navigate("/admin/panel/bookings")}>
                <span>Bookings</span>
              </p>
              <p onClick={() => navigate("/admin/panel/meetings")}>
                <span>Conference Room Bookings</span>
              </p>
              <p onClick={() => navigate("/admin/panel/employee/management")}>
                <span>Employee Management</span>
              </p>
              <p
                onClick={() => navigate("/admin/panel/customers")}
                style={{ backgroundColor: " white", color: "rgb(7, 1, 27) " }}
              >
                <span>Manage Customers</span>
              </p>
              <div className="admin_indentity">
                <span>
                  {admindetails &&
                  admindetails.account &&
                  admindetails.account.role === "admin" ? (
                    <RiAdminFill color="rgb(7, 1, 27)" size={35} />
                  ) : (
                    <RiCustomerService2Line color="rgb(7, 1, 27)" size={35} />
                  )}
                </span>
                <span>
                  {admindetails && admindetails.account
                    ? admindetails.account.role.toUpperCase()
                    : "null "}
                </span>
              </div>
            </div>
          ) : (
            <div className="nav-column">
              <p onClick={() => navigate("/admin/panel/bookings")}>
                <span>Bookings</span>
              </p>
              <p onClick={() => navigate("/admin/panel/meetings")}>
                <span>Conference Room Bookings</span>
              </p>

              <div className="admin_indentity">
                <span>
                  {admindetails &&
                  admindetails.account &&
                  admindetails.account.role === "admin" ? (
                    <RiAdminFill color="rgb(7, 1, 27)" size={35} />
                  ) : (
                    <RiCustomerService2Line color="rgb(7, 1, 27)" size={35} />
                  )}
                </span>
                <span>
                  {admindetails && admindetails.account
                    ? admindetails.account.role.toUpperCase()
                    : "null "}
                </span>
              </div>
            </div>
          )}

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
        <CustomerPage
          setemail={setemail}
          setSmg={setMsg}
          setbprompt={setbprompt}
          setuserid={setuserid}
          bemploy={bemploy}
          setaction={setaction}
        />
      </div>
    </div>
  );
};

export default PanelCustomer;
