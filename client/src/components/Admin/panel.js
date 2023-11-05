import React from "react";

import { useDispatch, useSelector } from "react-redux";

import AdminOverview from "./adminoverview";
import { useNavigate } from "react-router-dom";
import { RiAdminFill, RiCustomerService2Line } from "react-icons/ri";
import { Signout } from "../../store/actions/adminActions";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const admindetails = useSelector((data) => data.admin);
  return (
    <div className="main-layout">
      <div
        className="profile-layout"
        style={{ minHeight: `${window.innerHeight}px` }}
      >
        <div className="profile-nav-admin">
        {admindetails && admindetails.account && admindetails.account.role === "admin" ? (
            <div className="nav-column">
              <p style={{ backgroundColor: " white", color: "rgb(7, 1, 27) " }}
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
              <p onClick={() => navigate("/admin/panel/meetings")}   >
                <span>Conference Room Bookings</span>
              </p>
              <p onClick={() => navigate("/admin/panel/employee/management")}>
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
              <p onClick={() => navigate("/admin/panel/meetings")}>
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
        <AdminOverview />
      </div>
    </div>
  );
};

export default AdminDashboard;
