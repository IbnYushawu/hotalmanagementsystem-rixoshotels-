import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import AdminOverview from "./adminoverview";
import { useNavigate } from "react-router-dom";
import EmployeePage from "./emplyees";
import { IconButton } from "@mui/material";
import { enableScroll } from "../utils/reuseable";
import BlockCustomer from "./blockuser";
import { Person, X } from "react-bootstrap-icons";
import MessageCustomer from "./messagecustomer";
import { Signout } from "../../store/actions/adminActions";
import { RiCustomerService2Line, RiAdminFill } from "react-icons/ri";
const EmployeeDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMsg, setMsg] = useState(false);

  const [showbloc, setbprompt] = useState(false);
  const [selectedEmail, setemail] = useState("");
  const [customerid, setuserid] = useState("");
  const [adminid, setadminid] = useState("");
  const [deleteaction,setaction]=useState(null)
  const bemploy = true;
  const admindetails = useSelector((data) => data.admin);
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
            <div className="congrate-box" style={{width:"35%",minHeight:"300px"}}>
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
                adminid={adminid}
                deleteaction={deleteaction}
               
              />
            </div>
          </div>
        ) : null}
        <div className="profile-nav-admin">
        {admindetails && admindetails.account && admindetails.account.role === "admin" ? (
            <div className="nav-column">
              <p
                onClick={() => navigate("/admin/panel/overview")}
              
              >
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
              <p onClick={() => navigate("/admin/panel/meetings")}  >
                <span>Conference Room Bookings</span>
              </p>
              <p onClick={() => navigate("/admin/panel/employee/management")}  style={{ backgroundColor: " white", color: "rgb(7, 1, 27) " }}>
                <span>Employee Management</span>
              </p>
              <p onClick={() => navigate("/admin/panel/customers")}>
                <span>Manage Customers</span>
              </p>
              <div className="admin_indentity">
              <span>
                {admindetails && admindetails.account && admindetails.account.role === "admin" ? (
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
              <p onClick={() => navigate("/admin/panel/meetings")} style={{ backgroundColor: " white", color: "rgb(7, 1, 27) " }}>
                <span>Conference Room Bookings</span>
              </p>
       
       
              <div className="admin_indentity">
              <span>
                {admindetails && admindetails.account && admindetails.account.role === "admin" ? (
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
        <EmployeePage
        
          setbprompt={setbprompt}
          setemail={setemail}
          setMsg={setMsg}
          setuserid={setuserid}
          setadminid={setadminid}
          setaction={setaction}
        />
      </div>
    </div>
  );
};

export default EmployeeDashboard;
