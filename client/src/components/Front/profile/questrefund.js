import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { MdEmail } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import { CircleSpinner } from "react-spinners-kit";

import { PromptToastify } from "../../utils/reuseable";
import { QuestRefunds } from "../../../store/actions/adminActions";


const QuestRefund = (props) => {
  const [message, setmessage] = useState("");
  const dispatch = useDispatch();

  const notifications = useSelector((value) => value.notification);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    if (notifications && notifications.notice) {
      setloading(false);

      props.setcontactmsg(false);
    }
  });
  return (
    <div style={{ width: "95%" }}>
      <p style={{ color: "black" }}>
        Please briefly state the reasons for asking for Refund of this Order
      </p>
      <div className="row-styles" style={{ marginBottom: "20px" }}>
        <MdEmail /> <span style={{ color: "black" }}>Email</span>{" "}
        <span style={{ color: "chocolate", fontSize: "16px" }}>
          rixoshotelscommunity@gmail.com
        </span>{" "}
      </div>
      <TextField
        rows={10}
        multiline
        className="messagebox"
        style={{ backgroundColor: "white", marginBottom: "30px" }}
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
                PromptToastify("Please enter a message");
              } else {
                dispatch(
                    QuestRefunds({
                    message: message,
                    email: props.email,
                    orderId: props.orderId,
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

export default QuestRefund;
