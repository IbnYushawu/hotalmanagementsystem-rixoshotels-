import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { MdEmail } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { sendMsg } from "../../store/actions/adminActions";
import { showToastify } from "../utils/reuseable";
import { CircleSpinner } from "react-spinners-kit";

const MessageCustomer = (props) => {
  const [message, setmessage] = useState("");
  const dispatch = useDispatch();

  const notifications = useSelector((value) => value.notification);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    if (notifications && notifications.notice) {
      setloading(false);

      props.setSmg(false);
    }
  });
  return (
    <div style={{ width: "90%" }}>
      <div className="row-styles" style={{ marginBottom: "20px" }}>
        <MdEmail /> <span style={{ color: "black" }}>Email</span>{" "}
        <span style={{ color: "chocolate", fontSize: "16px" }}>
          {props.selectedEmail}
        </span>{" "}
      </div>
      <TextField
        rows={10}
        multiline
        className="messagebox"
        style={{ backgroundColor: "white",marginBottom:"30px" }}
        onChange={(data) => setmessage(data.target.value)}
      />

      {loading ? (
        <>
          <div className="instruction-btn-valid">
            <CircleSpinner size={20} color="blue" />
          </div>
        </>
      ) : (
        <>
          <input
            name="Send message"
            type="submit"
            onClick={() => {
                setloading(true);
              if (message === "") {
                showToastify("SUCCESS", "Please enter a message");
              } else {
                dispatch(
                  sendMsg({
                    message: message,
                    email: props.selectedEmail,
                  })
                );
              }
            }}
            className="submitinput"
          />
        </>
      )}
    </div>
  );
};

export default MessageCustomer;
