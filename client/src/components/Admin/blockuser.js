import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { MdEmail } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  AllAdminAccount,
  BlockEmployees,
  Blockuser,
  TerminateUserAccount,TerminateAdminAccount,
  getAllUsers,
  sendMsg,
} from "../../store/actions/adminActions";
import { showToastify } from "../utils/reuseable";
import { CircleSpinner } from "react-spinners-kit";

const BlockCustomer = (props) => {
  const [message, setmessage] = useState("");
  const dispatch = useDispatch();

  const notifications = useSelector((value) => value.notification);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    if (notifications && notifications.notice) {
      setloading(false);
      props.setbprompt(false);
      dispatch(AllAdminAccount(props.adminid));
    }
  },[notifications]);
  return (
    <div style={{ width: "90%" }}>
      <div className="row-styles" style={{ marginBottom: "20px" }}>
        {props.deleteaction ? (
          <span style={{ color: "chocolate", fontSize: "16px" }}>
            Are you sure you want to DELECT this account ?
          </span>
        ) : (
          <span style={{ color: "chocolate", fontSize: "16px" }}>
            Are you sure you want to BLOCK user ?
          </span>
        )}
      </div>

      {loading ? (
        <>
          <div className="instruction-btn-valid">
            <CircleSpinner size={20} color="blue" />
          </div>
        </>
      ) : (
        <>
          {props.deleteaction ? (
            <span
              onClick={() => {
                setloading(true);
                if (props.bemploy) {
                  dispatch(
                    TerminateAdminAccount(props.customerid, props.adminid)
                  );
                } else {
                  dispatch(TerminateUserAccount(props.customerid));
                }
              }}
              className="searchbtn"
              style={{ width: "70px" }}
            >
              YES
            </span>
          ) : (
            <span
              onClick={() => {
                setloading(true);
                if (props.bemploy) {
                  dispatch(BlockEmployees(props.customerid, props.adminid));
                } else {
                  dispatch(Blockuser(props.customerid));
                }
              }}
              className="searchbtn"
              style={{ width: "70px" }}
            >
              YES
            </span>
          )}
        </>
      )}
    </div>
  );
};

export default BlockCustomer;
